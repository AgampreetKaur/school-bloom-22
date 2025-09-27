import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import StudentDashboard from "./StudentDashboard";
import HelpCenter from "./HelpCenter";
import ParentDashboard from "./ParentDashboard";
import SchoolAdminDashboard from "./SchoolAdminDashboard";
import EnhancedTeacherDashboard from "./EnhancedTeacherDashboard";

interface DashboardProps {
  userType: 'school' | 'teacher' | 'parent';
  onLogout: () => void;
}

export default function Dashboard({ userType, onLogout }: DashboardProps) {
  const [activeSection, setActiveSection] = useState('students');
  const [showHelp, setShowHelp] = useState(false);

  const handleStudentDetails = (studentId: string) => {
    alert(`Opening detailed view for student ID: ${studentId}`);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'students':
        if (userType === 'parent') {
          return <ParentDashboard parentEmail="rajesh.gupta@email.com" />;
        } else if (userType === 'school') {
          return <SchoolAdminDashboard onStudentDetails={handleStudentDetails} />;
        } else {
          return <EnhancedTeacherDashboard onStudentDetails={handleStudentDetails} />;
        }
      case 'dashboard':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Dashboard Overview</h1>
            <p className="text-muted-foreground">
              Welcome to your Gurukul dashboard. Navigate using the sidebar to access different features.
            </p>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold capitalize">{activeSection.replace('-', ' ')}</h1>
            <p className="text-muted-foreground">
              This section is coming soon. Use the Students section to see the full functionality.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userType={userType} 
        onLogout={onLogout}
        onHelpClick={() => setShowHelp(true)}
      />
      
      <div className="flex h-[calc(100vh-80px)]">
        <Sidebar 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          userType={userType}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>

      {showHelp && (
        <HelpCenter onClose={() => setShowHelp(false)} />
      )}
    </div>
  );
}