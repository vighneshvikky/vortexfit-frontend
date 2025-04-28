export interface Trainer {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string[];
  experience: number;
  certifications: string[];
  education: string[];
  bio: string;
  hourlyRate: number;
  availability: {
    days: string[];
    timeSlots: string[];
  };
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  profileImage?: string;
  rating?: number;
  totalReviews?: number;
  isVerified: boolean;
  isBlocked: boolean;
} 