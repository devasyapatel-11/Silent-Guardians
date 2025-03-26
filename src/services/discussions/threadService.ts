
import { supabase } from '@/integrations/supabase/client';
import { DiscussionThread } from '@/types/discussions';
import { getAnonymousId } from './anonymousId';

export const threadService = {
  getThreadsByCircle: async (circleId: string): Promise<DiscussionThread[]> => {
    const { data, error } = await supabase
      .from('discussion_threads')
      .select('*')
      .eq('circle_id', circleId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data.map(thread => ({
      id: thread.id,
      circleId: thread.circle_id,
      title: thread.title,
      createdAt: thread.created_at,
      expiresAt: thread.expires_at,
      anonymousId: thread.anonymous_id,
      viewCount: thread.view_count
    }));
  },
  
  getThreadById: async (threadId: string): Promise<DiscussionThread> => {
    const { data, error } = await supabase
      .from('discussion_threads')
      .select('*')
      .eq('id', threadId)
      .single();
    
    if (error) throw error;
    
    // Increment view count
    await supabase
      .from('discussion_threads')
      .update({ view_count: data.view_count + 1 })
      .eq('id', threadId);
    
    return {
      id: data.id,
      circleId: data.circle_id,
      title: data.title,
      createdAt: data.created_at,
      expiresAt: data.expires_at,
      anonymousId: data.anonymous_id,
      viewCount: data.view_count + 1 // Include the incremented count
    };
  },
  
  createThread: async (
    circleId: string, 
    title: string, 
    expiresInDays: number = 30 // Default expiration of 30 days
  ): Promise<DiscussionThread> => {
    const anonymousId = getAnonymousId(circleId);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresInDays);
    
    const { data, error } = await supabase
      .from('discussion_threads')
      .insert([
        { 
          circle_id: circleId, 
          title, 
          anonymous_id: anonymousId,
          expires_at: expiresAt.toISOString() 
        }
      ])
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      circleId: data.circle_id,
      title: data.title,
      createdAt: data.created_at,
      expiresAt: data.expires_at,
      anonymousId: data.anonymous_id,
      viewCount: data.view_count
    };
  }
};
