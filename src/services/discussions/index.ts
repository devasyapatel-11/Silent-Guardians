
import { getAnonymousId } from './anonymousId';
import { threadService } from './threadService';
import { messageService } from './messageService';
import { voteService } from './voteService';

// Re-export all the services with the same interface as before
export const discussionService = {
  // Thread operations
  getThreadsByCircle: threadService.getThreadsByCircle,
  getThreadById: threadService.getThreadById,
  createThread: threadService.createThread,
  
  // Message operations
  getMessagesByThread: messageService.getMessagesByThread,
  createMessage: messageService.createMessage,
  
  // Voting operations
  voteOnMessage: voteService.voteOnMessage
};

// Re-export the getAnonymousId function
export { getAnonymousId };
