
import { supabase } from '@/lib/supabase';
import { SupportCircle, EmergencyService } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// API services using Supabase
export const api = {
  // Support circles
  getSupportCircles: async (): Promise<SupportCircle[]> => {
    const { data, error } = await supabase
      .from('support_circles')
      .select('*');
    
    if (error) {
      console.error('Error fetching support circles:', error);
      throw error;
    }
    
    // Transform from snake_case to camelCase
    return data.map(circle => ({
      id: circle.id,
      name: circle.name,
      description: circle.description,
      memberCount: circle.member_count,
      type: circle.type,
      lastActive: circle.last_active
    }));
  },
  
  joinSupportCircle: async (circleId: string): Promise<{ success: boolean }> => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('You must be logged in to join a support circle');
    }
    
    const { error } = await supabase
      .from('circle_memberships')
      .insert([
        { user_id: user.id, circle_id: circleId }
      ]);
    
    if (error) {
      console.error('Error joining support circle:', error);
      throw error;
    }
    
    // Update member count
    const { error: updateError } = await supabase.rpc('increment_circle_members', {
      circle_id: circleId
    });
    
    if (updateError) {
      console.error('Error updating member count:', updateError);
    }
    
    return { success: true };
  },
  
  // Emergency services
  getEmergencyServices: async (): Promise<EmergencyService[]> => {
    const { data, error } = await supabase
      .from('emergency_services')
      .select('*');
    
    if (error) {
      console.error('Error fetching emergency services:', error);
      throw error;
    }
    
    // Transform from snake_case to camelCase
    return data.map(service => ({
      id: service.id,
      name: service.name,
      description: service.description,
      contactMethod: service.contact_method,
      available24Hours: service.available_24_hours,
      responseTime: service.response_time
    }));
  },
  
  requestEmergencySupport: async (serviceId: string, anonymousContactInfo?: string): Promise<{ 
    success: boolean; 
    referenceNumber?: string;
    estimatedResponseTime?: string;
  }> => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('You must be logged in to request emergency support');
    }
    
    const referenceNumber = `EM-${uuidv4().substring(0, 8).toUpperCase()}`;
    
    const { error } = await supabase
      .from('support_requests')
      .insert([
        { 
          user_id: user.id, 
          service_id: serviceId,
          anonymous_contact_info: anonymousContactInfo || null,
          status: 'pending',
          reference_number: referenceNumber
        }
      ]);
    
    if (error) {
      console.error('Error requesting emergency support:', error);
      throw error;
    }
    
    // Get estimated response time from the service
    const { data, error: serviceError } = await supabase
      .from('emergency_services')
      .select('response_time')
      .eq('id', serviceId)
      .single();
    
    if (serviceError) {
      console.error('Error fetching service details:', serviceError);
    }
    
    return { 
      success: true,
      referenceNumber,
      estimatedResponseTime: data?.response_time || '< 15 minutes'
    };
  }
};
