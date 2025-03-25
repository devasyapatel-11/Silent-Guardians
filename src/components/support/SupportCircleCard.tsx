import { Calendar, MessageSquare, Users, ArrowRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SupportCircleCardProps extends React.HTMLAttributes<HTMLDivElement> {
  circle: {
    id: string;
    name: string;
    description: string;
    type: string;
    member_count: number;
    last_active: string;
  };
}

export default function SupportCircleCard({
  circle,
  className,
  ...props
}: SupportCircleCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)} {...props}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{circle.name}</CardTitle>
          <div className="flex gap-1 text-sm">
            <Badge variant="secondary">{circle.type}</Badge>
          </div>
        </div>
        <CardDescription className="pt-1.5">
          {circle.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{circle.member_count} members</span>
          <span>•</span>
          <Calendar className="h-4 w-4" />
          <span>
            Active{" "}
            {formatDistanceToNow(new Date(circle.last_active), {
              addSuffix: true,
            })}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-5">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/discussions/${circle.id}`}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Discussions
          </Link>
        </Button>
        <Button size="sm" asChild>
          <Link to={`/chat/${circle.id}`}>
            Join Chat <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
