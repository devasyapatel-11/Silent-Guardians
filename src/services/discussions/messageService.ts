
import { supabase } from '@/integrations/supabase/client';
import { ThreadMessage } from '@/types/discussions';
import { getAnonymousId } from './anonymousId';

export const messageService = {
  getMessagesByThread: async (threadId: string, userId?: string): Promise<ThreadMessage[]> => {
    const { data, error } = await supabase
      .from('thread_messages')
      .select('*')
      .eq('thread_id', threadId)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    
    // If we have a userId, get user's votes
    let userVotes: any[] = [];
    if (userId) {
      const { data: votesData, error: votesError } = await supabase
        .from('message_votes')
        .select('message_id, vote_type')
        .eq('user_id', userId);
      
      if (!votesError && votesData) {
        userVotes = votesData;
      }
    }
    
    return data.map(message => {
      // Find if the user has voted on this message
      const userVote = userVotes.find(vote => vote.message_id === message.id);
      
      return {
        id: message.id,
        threadId: message.thread_id,
        content: message.content,
        createdAt: message.created_at,
        anonymousId: message.anonymous_id,
        upvotes: message.upvotes,
        downvotes: message.downvotes,
        userVote: userVote ? userVote.vote_type : null
      };
    });
  },
  
  createMessage: async (threadId: string, content: string, circleId: string): Promise<ThreadMessage> => {
    const anonymousId = getAnonymousId(circleId);
    
    const { data, error } = await supabase
      .from('thread_messages')
      .insert([
        { thread_id: threadId, content, anonymous_id: anonymousId }
      ])
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      threadId: data.thread_id,
      content: data.content,
      createdAt: data.created_at,
      anonymousId: data.anonymous_id,
      upvotes: data.upvotes,
      downvotes: data.downvotes
    };
  }
};
