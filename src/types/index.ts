// User roles
export type UserRole = 'donor' | 'receiver' | 'blood_bank' | 'admin';

// Blood types
export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

// User interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  bloodType?: BloodType;
  phone?: string;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  isAvailable?: boolean;
  lastDonationDate?: string;
  createdAt: string;
  updatedAt: string;
}

// Donor specific data
export interface DonorProfile extends User {
  role: 'donor';
  medicalHistory?: {
    hasDiseases?: boolean;
    diseases?: string[];
    medications?: string[];
    lastCheckup?: string;
  };
  donationHistory?: {
    date: string;
    location: string;
    bloodType: BloodType;
  }[];
  eligibilityStatus: 'eligible' | 'not_eligible' | 'pending';
  nextEligibleDate?: string;
}

// Receiver specific data
export interface ReceiverProfile extends User {
  role: 'receiver';
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  requiredBloodType: BloodType;
  requiredUnits: number;
  hospitalName?: string;
  patientName?: string;
  medicalCondition?: string;
}

// Blood Bank specific data
export interface BloodBankProfile extends User {
  role: 'blood_bank';
  bankName: string;
  licenseNumber: string;
  inventory: {
    bloodType: BloodType;
    units: number;
    expiryDate?: string;
  }[];
  operatingHours: {
    day: string;
    open: string;
    close: string;
  }[];
  contactPerson: string;
  website?: string;
}

// Blood type compatibility
export const BLOOD_TYPE_COMPATIBILITY: Record<BloodType, BloodType[]> = {
  'A+': ['A+', 'A-', 'O+', 'O-'],
  'A-': ['A-', 'O-'],
  'B+': ['B+', 'B-', 'O+', 'O-'],
  'B-': ['B-', 'O-'],
  'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  'AB-': ['A-', 'B-', 'AB-', 'O-'],
  'O+': ['O+', 'O-'],
  'O-': ['O-'],
};

// Search filters
export interface SearchFilters {
  bloodType?: BloodType;
  maxDistance?: number; // in kilometers
  availability?: boolean;
  role?: UserRole;
  urgency?: 'low' | 'medium' | 'high' | 'emergency';
}

// Emergency request
export interface EmergencyRequest {
  id: string;
  receiverId: string;
  bloodType: BloodType;
  units: number;
  urgency: 'high' | 'emergency';
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  status: 'pending' | 'matched' | 'fulfilled' | 'cancelled';
  createdAt: string;
  matchedDonors?: string[];
  matchedBanks?: string[];
}

// Message/Chat
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

// Notification
export interface Notification {
  id: string;
  userId: string;
  type: 'match' | 'request' | 'message' | 'emergency' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}



