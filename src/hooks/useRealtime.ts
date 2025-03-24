
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { RealtimeChannel, RealtimePostgresChangesPayload } from "@supabase/supabase-js";

type SubscriptionEvent = "INSERT" | "UPDATE" | "DELETE";

interface UseRealtimeOptions<T> {
  schema?: string;
  table: string;
  events?: SubscriptionEvent[];
  onInsert?: (payload: T) => void;
  onUpdate?: (payload: T) => void;
  onDelete?: (payload: T) => void;
}

export function useRealtime<T>({
  schema = "public",
  table,
  events = ["INSERT", "UPDATE", "DELETE"],
  onInsert,
  onUpdate,
  onDelete,
}: UseRealtimeOptions<T>) {
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    // Create and configure the channel
    const newChannel = supabase.channel(`table:${table}`);
    
    // Add subscription for each event type
    events.forEach((event) => {
      newChannel.on(
        "postgres_changes", // This is the event type for the .on() method
        { 
          event, // This is the PostgreSQL event type (INSERT, UPDATE, DELETE)
          schema,
          table,
        },
        (payload: RealtimePostgresChangesPayload<T>) => {
          console.log("Realtime payload received:", payload);
          if (event === "INSERT" && onInsert) {
            onInsert(payload.new as T);
          } else if (event === "UPDATE" && onUpdate) {
            onUpdate(payload.new as T);
          } else if (event === "DELETE" && onDelete) {
            onDelete(payload.old as T);
          }
        }
      );
    });

    // Subscribe to the channel
    newChannel.subscribe((status) => {
      console.log(`Realtime subscription status: ${status}`, newChannel);
    });
    
    setChannel(newChannel);

    // Cleanup on unmount
    return () => {
      console.log("Unsubscribing from realtime channel");
      newChannel.unsubscribe();
    };
  }, [schema, table, events, onInsert, onUpdate, onDelete]);

  return channel;
}
