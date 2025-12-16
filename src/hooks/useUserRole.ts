import { useAuth } from '@/contexts/AuthContext';

export const useUserRole = () => {
  const { role, isLoading } = useAuth();
  
  return {
    role,
    isLoading,
    isDonor: role === 'donor',
    isReceiver: role === 'receiver',
    isBloodBank: role === 'blood_bank',
    isAdmin: role === 'admin',
  };
};
