import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Users, 
  BookOpen, 
  Calendar, 
  DollarSign, 
  Heart, 
  AlertTriangle,
  BarChart3,
  FileText,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  userType: 'school' | 'teacher' | 'parent';
}

export default function Sidebar({ activeSection, onSectionChange, userType }: SidebarProps) {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      badge: null,
    },
    {
      id: 'students',
      label: 'Students',
      icon: Users,
      badge: '124',
    },
    {
      id: 'classes',
      label: 'Classes',
      icon: BookOpen,
      badge: userType === 'school' ? '12' : '4',
    },
    {
      id: 'attendance',
      label: 'Attendance',
      icon: Calendar,
      badge: null,
    },
    {
      id: 'grades',
      label: 'Grades & Marks',
      icon: BarChart3,
      badge: null,
    },
    {
      id: 'fees',
      label: 'Fee Management',
      icon: DollarSign,
      badge: '7 pending',
      badgeVariant: 'secondary' as const,
    },
    {
      id: 'medical',
      label: 'Medical Records',
      icon: Heart,
      badge: null,
    },
    {
      id: 'risk-assessment',
      label: 'Risk Assessment',
      icon: AlertTriangle,
      badge: '3 high',
      badgeVariant: 'destructive' as const,
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileText,
      badge: null,
    },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border shadow-card h-full">
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-11",
                  isActive && "shadow-card"
                )}
                onClick={() => onSectionChange(item.id)}
              >
                <Icon className="h-5 w-5" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <Badge 
                    variant={item.badgeVariant || "secondary"} 
                    className="text-xs"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
        </nav>

        <div className="mt-8 pt-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-11"
            onClick={() => onSectionChange('settings')}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Button>
        </div>
      </div>
    </aside>
  );
}