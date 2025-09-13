import { useState } from "react";
import LoginPortal from "@/components/LoginPortal";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'school' | 'teacher'>('school');

  const handleLogin = (type: 'school' | 'teacher') => {
    setUserType(type);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <LoginPortal onLogin={handleLogin} />;
  }

  return <Dashboard userType={userType} onLogout={handleLogout} />;
};

export default Index;
