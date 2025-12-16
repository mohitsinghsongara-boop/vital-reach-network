-- Create enums for blood types, roles, and statuses
CREATE TYPE public.blood_type AS ENUM ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');
CREATE TYPE public.app_role AS ENUM ('donor', 'receiver', 'blood_bank', 'admin');
CREATE TYPE public.availability_status AS ENUM ('available', 'unavailable');
CREATE TYPE public.urgency_level AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE public.request_status AS ENUM ('pending', 'accepted', 'fulfilled', 'cancelled');
CREATE TYPE public.emergency_status AS ENUM ('active', 'fulfilled', 'cancelled');
CREATE TYPE public.notification_type AS ENUM ('emergency', 'request', 'message', 'match', 'system');

-- User roles table (security best practice - separate from profiles)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'donor',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Profiles table (common user data)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  country TEXT DEFAULT 'India',
  zip_code TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Donor profiles table
CREATE TABLE public.donor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  blood_type blood_type NOT NULL,
  availability availability_status DEFAULT 'available',
  last_donation_date DATE,
  total_donations INTEGER DEFAULT 0,
  weight DECIMAL(5, 2),
  age INTEGER,
  allergies TEXT[],
  medications TEXT[],
  medical_conditions TEXT[],
  next_eligible_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Blood bank profiles table
CREATE TABLE public.blood_bank_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  bank_name TEXT NOT NULL,
  license_number TEXT,
  contact_person TEXT,
  website TEXT,
  facilities TEXT[],
  opening_time TIME,
  closing_time TIME,
  is_24_hours BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Blood bank inventory table
CREATE TABLE public.blood_inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blood_bank_id UUID REFERENCES public.blood_bank_profiles(id) ON DELETE CASCADE NOT NULL,
  blood_type blood_type NOT NULL,
  units_available INTEGER DEFAULT 0,
  last_updated TIMESTAMPTZ DEFAULT now(),
  expiry_date DATE,
  UNIQUE (blood_bank_id, blood_type)
);

-- Emergency requests table
CREATE TABLE public.emergency_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  blood_type blood_type NOT NULL,
  units_needed INTEGER DEFAULT 1,
  urgency urgency_level DEFAULT 'high',
  status emergency_status DEFAULT 'active',
  contact_name TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  hospital_name TEXT,
  message TEXT,
  address TEXT,
  city TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  expires_at TIMESTAMPTZ DEFAULT (now() + interval '24 hours'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Emergency responses table
CREATE TABLE public.emergency_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  emergency_id UUID REFERENCES public.emergency_requests(id) ON DELETE CASCADE NOT NULL,
  donor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'interested' CHECK (status IN ('interested', 'confirmed', 'declined', 'completed')),
  responded_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (emergency_id, donor_id)
);

-- Blood requests table (non-emergency)
CREATE TABLE public.blood_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requested_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  blood_type blood_type NOT NULL,
  units_needed INTEGER DEFAULT 1,
  required_by DATE,
  purpose TEXT,
  hospital_name TEXT,
  patient_name TEXT,
  patient_age INTEGER,
  patient_condition TEXT,
  status request_status DEFAULT 'pending',
  accepted_by UUID REFERENCES auth.users(id),
  address TEXT,
  city TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Messages table
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  is_read BOOLEAN DEFAULT false,
  link TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Donation history table
CREATE TABLE public.donation_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  blood_bank_id UUID REFERENCES public.blood_bank_profiles(id),
  blood_type blood_type NOT NULL,
  units_donated INTEGER DEFAULT 1,
  donation_date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_profiles_location ON public.profiles(city, state);
CREATE INDEX idx_donor_profiles_blood_type ON public.donor_profiles(blood_type);
CREATE INDEX idx_donor_profiles_availability ON public.donor_profiles(availability);
CREATE INDEX idx_emergency_requests_status ON public.emergency_requests(status);
CREATE INDEX idx_emergency_requests_blood_type ON public.emergency_requests(blood_type);
CREATE INDEX idx_blood_requests_status ON public.blood_requests(status);
CREATE INDEX idx_messages_sender ON public.messages(sender_id);
CREATE INDEX idx_messages_receiver ON public.messages(receiver_id);
CREATE INDEX idx_notifications_user ON public.notifications(user_id, is_read);

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blood_bank_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blood_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blood_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donation_history ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Function to get user's role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.user_roles WHERE user_id = _user_id LIMIT 1
$$;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for donor_profiles
CREATE POLICY "Anyone can view donor profiles" ON public.donor_profiles
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Donors can update own profile" ON public.donor_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Donors can insert own profile" ON public.donor_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for blood_bank_profiles
CREATE POLICY "Anyone can view blood bank profiles" ON public.blood_bank_profiles
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Blood banks can update own profile" ON public.blood_bank_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Blood banks can insert own profile" ON public.blood_bank_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for blood_inventory
CREATE POLICY "Anyone can view inventory" ON public.blood_inventory
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Blood banks can manage own inventory" ON public.blood_inventory
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.blood_bank_profiles WHERE id = blood_bank_id AND user_id = auth.uid())
  );

-- RLS Policies for emergency_requests
CREATE POLICY "Authenticated users can view active emergencies" ON public.emergency_requests
  FOR SELECT TO authenticated USING (status = 'active' OR created_by = auth.uid());

CREATE POLICY "Users can create emergency requests" ON public.emergency_requests
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Creators can update own emergencies" ON public.emergency_requests
  FOR UPDATE USING (auth.uid() = created_by);

-- RLS Policies for emergency_responses
CREATE POLICY "Users can view responses to their emergencies or own responses" ON public.emergency_responses
  FOR SELECT TO authenticated USING (
    donor_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM public.emergency_requests WHERE id = emergency_id AND created_by = auth.uid())
  );

CREATE POLICY "Donors can respond to emergencies" ON public.emergency_responses
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = donor_id);

CREATE POLICY "Donors can update own responses" ON public.emergency_responses
  FOR UPDATE USING (auth.uid() = donor_id);

-- RLS Policies for blood_requests
CREATE POLICY "Authenticated users can view blood requests" ON public.blood_requests
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can create blood requests" ON public.blood_requests
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = requested_by);

CREATE POLICY "Creators can update own requests" ON public.blood_requests
  FOR UPDATE USING (auth.uid() = requested_by OR auth.uid() = accepted_by);

-- RLS Policies for messages
CREATE POLICY "Users can view own messages" ON public.messages
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages" ON public.messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Receivers can update message read status" ON public.messages
  FOR UPDATE USING (auth.uid() = receiver_id);

-- RLS Policies for notifications
CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own notifications" ON public.notifications
  FOR DELETE USING (auth.uid() = user_id);

-- System can insert notifications (via service role)
CREATE POLICY "System can insert notifications" ON public.notifications
  FOR INSERT WITH CHECK (true);

-- RLS Policies for donation_history
CREATE POLICY "Donors can view own history" ON public.donation_history
  FOR SELECT USING (auth.uid() = donor_id);

CREATE POLICY "Blood banks can view donations to them" ON public.donation_history
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.blood_bank_profiles WHERE id = blood_bank_id AND user_id = auth.uid())
  );

CREATE POLICY "Blood banks can insert donation records" ON public.donation_history
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.blood_bank_profiles WHERE id = blood_bank_id AND user_id = auth.uid())
  );

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_donor_profiles_updated_at BEFORE UPDATE ON public.donor_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blood_bank_profiles_updated_at BEFORE UPDATE ON public.blood_bank_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_emergency_requests_updated_at BEFORE UPDATE ON public.emergency_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blood_requests_updated_at BEFORE UPDATE ON public.blood_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create profile
  INSERT INTO public.profiles (user_id, email)
  VALUES (NEW.id, NEW.email);
  
  -- Create default role (donor)
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'donor');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.emergency_requests;