import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserRole, BloodType } from '@/types';

interface UserProfile {
  id: string;
  user_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  zip_code: string | null;
  latitude: number | null;
  longitude: number | null;
  is_verified: boolean;
  is_active: boolean;
}

interface DonorProfile {
  blood_type: BloodType;
  availability: 'available' | 'unavailable';
  last_donation_date: string | null;
  total_donations: number;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  donorProfile: DonorProfile | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error: Error | null }>;
  register: (data: RegisterData) => Promise<{ error: Error | null }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ error: Error | null }>;
  refreshProfile: () => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  bloodType?: BloodType;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [donorProfile, setDonorProfile] = useState<DonorProfile | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async (userId: string) => {
    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (profileData) {
        setProfile(profileData as UserProfile);
      }

      // Fetch role
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (roleData) {
        setRole(roleData.role as UserRole);
      }

      // If donor, fetch donor profile
      if (roleData?.role === 'donor') {
        const { data: donorData } = await supabase
          .from('donor_profiles')
          .select('blood_type, availability, last_donation_date, total_donations')
          .eq('user_id', userId)
          .single();

        if (donorData) {
          setDonorProfile(donorData as DonorProfile);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        // Defer Supabase calls with setTimeout
        if (session?.user) {
          setTimeout(() => {
            fetchUserData(session.user.id);
          }, 0);
        } else {
          setProfile(null);
          setDonorProfile(null);
          setRole(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserData(session.user.id);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error: error as Error | null };
  };

  const register = async (data: RegisterData) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
        },
      },
    });

    if (authError) {
      return { error: authError as Error };
    }

    if (authData.user) {
      // Update profile with additional info
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone || null,
        })
        .eq('user_id', authData.user.id);

      if (profileError) {
        console.error('Error updating profile:', profileError);
      }

      // Update role if not default donor
      if (data.role !== 'donor') {
        const { error: roleError } = await supabase
          .from('user_roles')
          .update({ role: data.role })
          .eq('user_id', authData.user.id);

        if (roleError) {
          console.error('Error updating role:', roleError);
        }
      }

      // Create donor profile if donor and blood type provided
      if (data.role === 'donor' && data.bloodType) {
        const { error: donorError } = await supabase
          .from('donor_profiles')
          .insert({
            user_id: authData.user.id,
            blood_type: data.bloodType,
            availability: 'available',
          });

        if (donorError) {
          console.error('Error creating donor profile:', donorError);
        }
      }
    }

    return { error: null };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    setDonorProfile(null);
    setRole(null);
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return { error: new Error('Not authenticated') };

    const { error } = await supabase
      .from('profiles')
      .update(data)
      .eq('user_id', user.id);

    if (!error) {
      await fetchUserData(user.id);
    }

    return { error: error as Error | null };
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchUserData(user.id);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        donorProfile,
        role,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
