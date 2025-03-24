
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { SupportCircle } from '@/types';

interface SupportCircleCardProps {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  type: 'domestic-violence' | 'workplace-harassment' | 'legal-guidance' | 'mental-health' | 'financial-independence';
  lastActive: string;
  onJoin: (id: string) => void;
  isJoining?: boolean;
}

const SupportCircleCard = ({
  id,
  name,
  description,
  memberCount,
  type,
  lastActive,
  onJoin,
  isJoining = false,
}: SupportCircleCardProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [joining, setJoining] = useState(false);
  const navigate = useNavigate();

  const handleJoin = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to join a support circle",
        variant: "destructive",
      });
      navigate("/auth/login");
      return;
    }
    
    setJoining(true);
    try {
      await onJoin(id);
      toast({
        title: "Success",
        description: "You've joined the support circle!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Failed to join support circle",
        variant: "destructive",
      });
    } finally {
      setJoining(false);
    }
  };

  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            if (user) {
              navigate(`/chat/${id}`);
            } else {
              toast({
                title: "Authentication required",
                description: "Please sign in to access the chat",
                variant: "destructive",
              });
              navigate("/auth/login");
            }
          }}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Chat Now
        </Button>
        
        <Button 
          size="sm" 
          onClick={handleJoin}
          disabled={joining || isJoining}
        >
          {(joining || isJoining) ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Users className="mr-2 h-4 w-4" />}
          Join Circle
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SupportCircleCard;
