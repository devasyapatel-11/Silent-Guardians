
import React from 'react';
import { SupportCircle } from '@/types';
import { Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

interface SupportCircleCardProps {
  circle: SupportCircle;
  onJoin: (id: string) => void;
  isJoining?: boolean;
}

const SupportCircleCard: React.FC<SupportCircleCardProps> = ({
  circle,
  onJoin,
  isJoining = false
}) => {
  const getIconByType = () => {
    switch (circle.type) {
      case 'domestic-violence':
        return <span className="text-red-500">🏠</span>;
      case 'workplace-harassment':
        return <span className="text-blue-500">💼</span>;
      case 'legal-guidance':
        return <span className="text-purple-500">⚖️</span>;
      case 'mental-health':
        return <span className="text-green-500">🧠</span>;
      case 'financial-independence':
        return <span className="text-yellow-500">💰</span>;
      default:
        return <span className="text-gray-500">👥</span>;
    }
  };

  return (
    <div className="glass-card p-5 rounded-xl hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="text-2xl mb-1">{getIconByType()}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock size={12} className="mr-1" />
          <span>
            {formatDistanceToNow(new Date(circle.lastActive), { addSuffix: true })}
          </span>
        </div>
      </div>
      
      <h3 className="text-lg font-medium mb-2">{circle.name}</h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {circle.description}
      </p>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center text-xs text-muted-foreground">
          <Users size={14} className="mr-1" />
          <span>{circle.memberCount} members</span>
        </div>
        
        <Button 
          variant="outline"
          size="sm"
          className="rounded-full"
          onClick={() => onJoin(circle.id)}
          disabled={isJoining}
        >
          {isJoining ? "Joining..." : "Join Circle"}
        </Button>
      </div>
    </div>
  );
};

export default SupportCircleCard;
