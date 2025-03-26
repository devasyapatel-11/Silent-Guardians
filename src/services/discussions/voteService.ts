
import { supabase } from '@/integrations/supabase/client';
import { VoteAction } from '@/types/discussions';

export const voteService = {
  voteOnMessage: async (messageId: string, userId: string, action: VoteAction): Promise<void> => {
    // First check if user has already voted on this message
    const { data: existingVote, error: lookupError } = await supabase
      .from('message_votes')
      .select('id, vote_type')
      .eq('message_id', messageId)
      .eq('user_id', userId)
      .maybeSingle();
    
    if (lookupError) {
      console.error("Error checking existing vote:", lookupError);
      throw lookupError;
    }
    
    try {
      // Handle the vote based on the action and existing vote
      if (action === 'remove' && existingVote) {
        // Remove the vote
        const { error } = await supabase
          .from('message_votes')
          .delete()
          .eq('id', existingVote.id);
          
        if (error) throw error;
      } else if (existingVote) {
        // Update the vote if it exists and is different
        if (existingVote.vote_type !== action) {
          const { error } = await supabase
            .from('message_votes')
            .update({ vote_type: action })
            .eq('id', existingVote.id);
            
          if (error) throw error;
        }
      } else if (action !== 'remove') {
        // Insert a new vote
        const { error } = await supabase
          .from('message_votes')
          .insert([
            { message_id: messageId, user_id: userId, vote_type: action }
          ]);
          
        if (error) throw error;
      }
    } catch (error) {
      console.error("Vote operation failed:", error);
      throw error;
    }
  }
};
