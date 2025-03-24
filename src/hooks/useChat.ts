
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useRealtime } from "./useRealtime";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";

export interface ChatMessage {
  id: string;
  circle_id: string;
  user_id: string;
  content: string;
  created_at: string;
  username?: string;
  avatar_url?: string;
}

export function useChat(circleId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch messages on component mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!circleId) return;
        
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('circle_messages')
          .select(`
            *,
            profiles:user_id(username, avatar_url)
          `)
          .eq("circle_id", circleId)
          .order("created_at", { ascending: true });

        if (error) {
          throw error;
        }

        console.log("Fetched messages:", data);

        // Transform the data to include username and avatar
        const formattedMessages = data.map((message: any) => ({
          ...message,
          username: message.profiles?.username,
          avatar_url: message.profiles?.avatar_url,
        }));

        setMessages(formattedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast({
          title: "Error",
          description: "Failed to load messages",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (circleId) {
      fetchMessages();
    }
  }, [circleId, toast]);

  // Set up realtime subscription for new messages
  useRealtime<ChatMessage>({
    table: "circle_messages",
    events: ["INSERT"],
    onInsert: async (newMessage) => {
      console.log("New message received:", newMessage);
      
      // Fetch user profile for the new message
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", newMessage.user_id)
        .single();
        
      if (error) {
        console.error("Error fetching profile for new message:", error);
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          ...newMessage,
          username: profileData?.username || "Unknown",
          avatar_url: profileData?.avatar_url,
        },
      ]);
    },
  });

  // Function to send a new message
  const sendMessage = async (content: string) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to send messages",
        variant: "destructive",
      });
      return;
    }

    if (!content.trim()) {
      return;
    }

    try {
      const newMessage = {
        id: uuidv4(),
        circle_id: circleId,
        user_id: user.id,
        content,
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('circle_messages')
        .insert(newMessage);

      if (error) {
        throw error;
      }

    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
  };
}
