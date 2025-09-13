import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Mail, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Heart,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye
} from "lucide-react";
import { Student } from "@/data/studentsData";
import { cn } from "@/lib/utils";

interface StudentCardProps {
  student: Student;
  onViewDetails: (studentId: string) => void;
}

export default function StudentCard({ student, onViewDetails }: StudentCardProps) {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      default: return 'text-secondary';
    }
  };

  const getRiskBadgeVariant = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'destructive' as const;
      case 'medium': return 'secondary' as const;
      default: return 'outline' as const;
    }
  };

  const getFeesStatusColor = (status: string) => {
    switch (status) {
      case 'overdue': return 'text-destructive';
      case 'pending': return 'text-warning';
      default: return 'text-secondary';
    }
  };

  const getFeesIcon = (status: string) => {
    switch (status) {
      case 'paid': return CheckCircle;
      case 'pending': return Clock;
      default: return AlertTriangle;
    }
  };

  const getMedicalStatusColor = (status: string) => {
    switch (status) {
      case 'urgent': return 'text-destructive';
      case 'attention': return 'text-warning';
      default: return 'text-secondary';
    }
  };

  const FeesIcon = getFeesIcon(student.feesStatus);

  return (
    <Card 
      className={cn(
        "transition-all duration-300 hover:shadow-elevated cursor-pointer",
        student.riskLevel === 'high' && "risk-high",
        student.riskLevel === 'medium' && "risk-medium",
        student.riskLevel === 'low' && "risk-low"
      )}
      onClick={() => onViewDetails(student.id)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={student.profileImage} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {student.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{student.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-3 w-3" />
                <span>Class {student.class} • Grade {student.grade}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Mail className="h-3 w-3" />
                <span>{student.email}</span>
              </div>
            </div>
          </div>
          <Badge 
            variant={getRiskBadgeVariant(student.riskLevel)}
            className={cn("capitalize", getRiskColor(student.riskLevel))}
          >
            {student.riskLevel} Risk
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Academic Performance */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Calendar className="h-3 w-3" />
              <span>Attendance</span>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={student.attendance} className="flex-1" />
              <span className="text-sm font-medium">{student.attendance}%</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <TrendingUp className="h-3 w-3" />
              <span>Avg. Marks</span>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={student.averageMarks} className="flex-1" />
              <span className="text-sm font-medium">{student.averageMarks}/100</span>
            </div>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-3 gap-3">
          {/* Fees Status */}
          <div className="flex items-center gap-2">
            <FeesIcon className={cn("h-4 w-4", getFeesStatusColor(student.feesStatus))} />
            <div>
              <p className="text-xs text-muted-foreground">Fees</p>
              <p className={cn("text-sm font-medium capitalize", getFeesStatusColor(student.feesStatus))}>
                {student.feesStatus}
              </p>
            </div>
          </div>

          {/* Medical Status */}
          <div className="flex items-center gap-2">
            <Heart className={cn("h-4 w-4", getMedicalStatusColor(student.medicalStatus))} />
            <div>
              <p className="text-xs text-muted-foreground">Health</p>
              <p className={cn("text-sm font-medium capitalize", getMedicalStatusColor(student.medicalStatus))}>
                {student.medicalStatus}
              </p>
            </div>
          </div>

          {/* Last Active */}
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Last Active</p>
              <p className="text-sm font-medium">
                {new Date(student.lastActive).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(student.id);
            }}
          >
            <Eye className="h-3 w-3 mr-1" />
            View Details
          </Button>
          {student.riskLevel === 'high' && (
            <Button
              variant="destructive"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                // Handle intervention action
              }}
            >
              <AlertTriangle className="h-3 w-3 mr-1" />
              Intervention
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}