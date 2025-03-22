
export interface SupportCircle {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  type: 'domestic-violence' | 'workplace-harassment' | 'legal-guidance' | 'mental-health' | 'financial-independence';
  lastActive: string;
}

export interface EmergencyService {
  id: string;
  name: string;
  description: string;
  contactMethod: 'call' | 'chat' | 'both';
  available24Hours: boolean;
  responseTime: string;
}
