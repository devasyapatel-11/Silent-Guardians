
import { v4 as uuidv4 } from 'uuid';

// Generate a persistent anonymous ID for the current user in this circle
export const getAnonymousId = (circleId: string): string => {
  // Get existing anonymous ID from localStorage or create a new one
  const storageKey = `anonymous-id-${circleId}`;
  let anonymousId = localStorage.getItem(storageKey);
  
  if (!anonymousId) {
    // Generate a random ID that doesn't reveal the user's identity
    anonymousId = `anon-${uuidv4().substring(0, 8)}`;
    localStorage.setItem(storageKey, anonymousId);
  }
  
  return anonymousId;
};
