
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export interface ChatMessageProps {
  id: string;
  content: string;
  sender: {
    id: string;
    name?: string;
    avatarUrl?: string;
  };
  timestamp: string;
  isCurrentUser: boolean;
}

const ChatMessage = ({
  content,
  sender,
  timestamp,
  isCurrentUser,
}: ChatMessageProps) => {
  const initials = sender.name 
    ? sender.name.split(' ').map(n => n[0]).join('').toUpperCase() 
    : 'U';
  
  const formattedTime = format(new Date(timestamp), 'h:mm a');

  return (
    <div className={cn(
      "flex w-full gap-3 mb-4",
      isCurrentUser ? "flex-row-reverse" : "flex-row"
    )}>
      <Avatar className="h-8 w-8">
        <AvatarImage src={sender.avatarUrl || ""} alt={sender.name || "User"} />
        <AvatarFallback className="bg-primary/10 text-primary">
          {initials}
        </AvatarFallback>
      </Avatar>
      
      <div className={cn(
        "flex flex-col max-w-[80%]",
        isCurrentUser ? "items-end" : "items-start"
      )}>
        <div className={cn(
          "rounded-lg px-4 py-2 text-sm",
          isCurrentUser 
            ? "bg-primary text-primary-foreground" 
            : "bg-muted"
        )}>
          {content}
        </div>
        <span className="text-xs text-muted-foreground mt-1">
          {formattedTime}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
