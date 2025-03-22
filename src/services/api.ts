
import { SupportCircle, EmergencyService } from '@/types';

// Mock data for support circles
const supportCircles: SupportCircle[] = [
  {
    id: '1',
    name: 'Healing Together',
    description: 'A safe space for domestic violence survivors to share experiences and healing journeys.',
    memberCount: 243,
    type: 'domestic-violence',
    lastActive: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 minutes ago
  },
  {
    id: '2',
    name: 'Workplace Allies',
    description: 'Discussion group for addressing and overcoming workplace harassment issues.',
    memberCount: 187,
    type: 'workplace-harassment',
    lastActive: new Date(Date.now() - 1000 * 60 * 120).toISOString() // 2 hours ago
  },
  {
    id: '3',
    name: 'Legal Support Network',
    description: 'Connect with volunteers offering guidance on legal matters and rights.',
    memberCount: 156,
    type: 'legal-guidance',
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString() // 3 hours ago
  },
  {
    id: '4',
    name: 'Mental Wellness Circle',
    description: 'Support group focused on emotional wellbeing and mental health resources.',
    memberCount: 312,
    type: 'mental-health',
    lastActive: new Date(Date.now() - 1000 * 60 * 15).toISOString() // 15 minutes ago
  },
  {
    id: '5',
    name: 'Financial Freedom Path',
    description: 'Group focused on achieving financial independence and security.',
    memberCount: 129,
    type: 'financial-independence',
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString() // 6 hours ago
  }
];

// Mock data for emergency services
const emergencyServices: EmergencyService[] = [
  {
    id: '1',
    name: 'Crisis Support Line',
    description: 'Immediate emotional support and crisis intervention via phone.',
    contactMethod: 'call',
    available24Hours: true,
    responseTime: 'Immediate'
  },
  {
    id: '2',
    name: 'SafeChat',
    description: 'Text-based crisis support with trained counselors.',
    contactMethod: 'chat',
    available24Hours: true,
    responseTime: '< 5 minutes'
  },
  {
    id: '3',
    name: 'Legal Emergency Hotline',
    description: 'Immediate legal guidance for urgent situations.',
    contactMethod: 'both',
    available24Hours: false,
    responseTime: '< 30 minutes'
  },
  {
    id: '4',
    name: 'Shelter Connect',
    description: 'Immediate assistance finding safe shelter in your area.',
    contactMethod: 'both',
    available24Hours: true,
    responseTime: '< 15 minutes'
  }
];

// Simulated API response delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API services
export const api = {
  // Support circles
  getSupportCircles: async (): Promise<SupportCircle[]> => {
    await delay(800); // Simulate network delay
    return [...supportCircles];
  },
  
  joinSupportCircle: async (circleId: string): Promise<{ success: boolean }> => {
    await delay(500);
    return { success: true };
  },
  
  // Emergency services
  getEmergencyServices: async (): Promise<EmergencyService[]> => {
    await delay(600);
    return [...emergencyServices];
  },
  
  requestEmergencySupport: async (serviceId: string, anonymousContactInfo?: string): Promise<{ 
    success: boolean; 
    referenceNumber?: string;
    estimatedResponseTime?: string;
  }> => {
    await delay(1000);
    return { 
      success: true,
      referenceNumber: `EM-${Math.floor(Math.random() * 10000)}`,
      estimatedResponseTime: '< 5 minutes'
    };
  }
};
