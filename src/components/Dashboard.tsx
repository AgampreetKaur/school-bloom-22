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
          return <ParentDashboard parentEmail="rajesh.gupta@email.com" activeSection="students" />;
        } else if (userType === 'school') {
          return <SchoolAdminDashboard onStudentDetails={handleStudentDetails} activeSection="students" />;
        } else {
          return <StudentDashboard onStudentDetails={handleStudentDetails} />;
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
      case 'attendance':
        if (userType === 'parent') {
          return <ParentDashboard parentEmail="rajesh.gupta@email.com" activeSection="attendance" />;
        } else if (userType === 'school') {
          return <SchoolAdminDashboard onStudentDetails={handleStudentDetails} activeSection="attendance" />;
        } else {
          return <EnhancedTeacherDashboard onStudentDetails={handleStudentDetails} activeSection="attendance" />;
        }
      case 'grades':
        if (userType === 'parent') {
          return <ParentDashboard parentEmail="rajesh.gupta@email.com" activeSection="grades" />;
        } else if (userType === 'school') {
          return <SchoolAdminDashboard onStudentDetails={handleStudentDetails} activeSection="grades" />;
        } else {
          return <EnhancedTeacherDashboard onStudentDetails={handleStudentDetails} activeSection="grades" />;
        }
      case 'fees':
        if (userType === 'parent') {
          return <ParentDashboard parentEmail="rajesh.gupta@email.com" activeSection="fees" />;
        } else if (userType === 'school') {
          return <SchoolAdminDashboard onStudentDetails={handleStudentDetails} activeSection="fees" />;
        } else {
          return <EnhancedTeacherDashboard onStudentDetails={handleStudentDetails} activeSection="fees" />;
        }
      case 'medical':
        if (userType === 'parent') {
          return <ParentDashboard parentEmail="rajesh.gupta@email.com" activeSection="medical" />;
        } else if (userType === 'school') {
          return <SchoolAdminDashboard onStudentDetails={handleStudentDetails} activeSection="medical" />;
        } else {
          return <EnhancedTeacherDashboard onStudentDetails={handleStudentDetails} activeSection="medical" />;
        }
      case 'risk-assessment':
        if (userType === 'parent') {
          return <ParentDashboard parentEmail="rajesh.gupta@email.com" activeSection="risk-assessment" />;
        } else if (userType === 'school') {
          return <SchoolAdminDashboard onStudentDetails={handleStudentDetails} activeSection="risk-assessment" />;
        } else {
          return <EnhancedTeacherDashboard onStudentDetails={handleStudentDetails} activeSection="risk-assessment" />;
        }
      case 'reports':
        if (userType === 'parent') {
          return <ParentDashboard parentEmail="rajesh.gupta@email.com" activeSection="reports" />;
        } else if (userType === 'school') {
          return <SchoolAdminDashboard onStudentDetails={handleStudentDetails} activeSection="reports" />;
        } else {
          return <EnhancedTeacherDashboard onStudentDetails={handleStudentDetails} activeSection="reports" />;
        }
      case 'classes':
        if (userType === 'parent') {
          return <ParentDashboard parentEmail="rajesh.gupta@email.com" activeSection="classes" />;
        } else if (userType === 'school') {
          return <SchoolAdminDashboard onStudentDetails={handleStudentDetails} activeSection="classes" />;
        } else {
          return <EnhancedTeacherDashboard onStudentDetails={handleStudentDetails} activeSection="classes" />;
        }
      default:
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold capitalize">{activeSection.replace('-', ' ')}</h1>
            <p className="text-muted-foreground">
              This section is coming soon.
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