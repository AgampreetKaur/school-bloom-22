import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { School, Users, BookOpen, Shield } from "lucide-react";

interface LoginPortalProps {
  onLogin: (type: 'school' | 'teacher' | 'parent') => void;
}

export default function LoginPortal({ onLogin }: LoginPortalProps) {
  const [loginType, setLoginType] = useState<'school' | 'teacher' | 'parent'>('school');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    schoolId: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(loginType);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Hero Section */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="gradient-hero p-3 rounded-xl">
                <School className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold">Gurukul</h1>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              Empowering Education Through
              <span className="bg-gradient-hero bg-clip-text text-transparent"> Smart Management</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl text-center lg:text-left">
              Comprehensive school management platform that helps educators track student progress, 
              attendance, and identify at-risk students with AI-powered insights.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-card shadow-card">
              <School className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">School Management</h3>
                <p className="text-sm text-muted-foreground">Complete oversight</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-card shadow-card">
              <Users className="h-8 w-8 text-secondary" />
              <div>
                <h3 className="font-semibold">Student Tracking</h3>
                <p className="text-sm text-muted-foreground">Real-time insights</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-card shadow-card">
              <BookOpen className="h-8 w-8 text-accent" />
              <div>
                <h3 className="font-semibold">Academic Records</h3>
                <p className="text-sm text-muted-foreground">Comprehensive data</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-card shadow-card">
              <Shield className="h-8 w-8 text-warning" />
              <div>
                <h3 className="font-semibold">Risk Assessment</h3>
                <p className="text-sm text-muted-foreground">Early intervention</p>
              </div>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <Card className="w-full max-w-md mx-auto shadow-elevated">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to access your educational dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Login Type Selector */}
              <div className="grid grid-cols-3 gap-1 p-1 bg-muted rounded-lg">
                <Button
                  type="button"
                  variant={loginType === 'school' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setLoginType('school')}
                  className="w-full text-xs"
                >
                  School Admin
                </Button>
                <Button
                  type="button"
                  variant={loginType === 'teacher' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setLoginType('teacher')}
                  className="w-full text-xs"
                >
                  Teacher
                </Button>
                <Button
                  type="button"
                  variant={loginType === 'parent' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setLoginType('parent')}
                  className="w-full text-xs"
                >
                  Parent
                </Button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={
                      loginType === 'school' ? 'admin@bharatvidyalaya.edu' : 
                      loginType === 'teacher' ? 'ravi.kumar@bharatvidyalaya.edu' :
                      'parent@bharatvidyalaya.edu'
                    }
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>

                {loginType === 'school' && (
                  <div className="space-y-2">
                    <Label htmlFor="schoolId">School ID</Label>
                    <Input
                      id="schoolId"
                      placeholder="Enter your school ID"
                      value={formData.schoolId}
                      onChange={(e) => setFormData(prev => ({ ...prev, schoolId: e.target.value }))}
                      required
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full">
                Sign In to Gurukul
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Need help? <Button variant="link" className="p-0 h-auto">Contact Support</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}