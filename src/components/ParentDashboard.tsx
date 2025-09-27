import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  BookOpen, 
  Calendar, 
  TrendingUp,
  Heart,
  Phone,
  Mail,
  MapPin,
  Award,
  AlertTriangle,
  Target,
  BarChart3
} from "lucide-react";
import { getStudentsByParent } from "@/data/enhancedStudentsData";

interface ParentDashboardProps {
  parentEmail: string;
  activeSection?: string;
}

export default function ParentDashboard({ parentEmail = "rajesh.gupta@email.com", activeSection = "students" }: ParentDashboardProps) {
  const [selectedChild, setSelectedChild] = useState(0);
  
  // Get children for this parent - for demo, we'll use the last student
  const children = getStudentsByParent(parentEmail) || [
    {
      id: '6',
      name: 'Arjun Nair',
      email: 'arjun.nair@student.edu',
      phone: '+91-9876543220',
      class: '9A',
      grade: '9th',
      address: {
        street: '67, Indiranagar 2nd Stage',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560038',
        distance: 6.8
      },
      parentName: 'Rajesh Gupta',
      parentEmail: 'rajesh.gupta@email.com',
      parentPhone: '+91-9876543221',
      attendance: 72,
      averageMarks: 69,
      subjects: {
        'Mathematics': {
          marks: [65, 67, 63, 69],
          currentMark: 65,
          teacher: 'Priya Sharma',
          teacherContact: 'priya.sharma@bharatvidyalaya.edu',
          rank: 22
        },
        'Science': {
          marks: [74, 72, 76, 70],
          currentMark: 74,
          teacher: 'Vikram Patel',
          teacherContact: 'vikram.patel@bharatvidyalaya.edu',
          rank: 15
        },
        'English': {
          marks: [68, 70, 66, 72],
          currentMark: 68,
          teacher: 'Meera Joshi',
          teacherContact: 'meera.joshi@bharatvidyalaya.edu',
          rank: 20
        },
        'History': {
          marks: [70, 68, 72, 66],
          currentMark: 70,
          teacher: 'Ravi Kumar',
          teacherContact: 'ravi.kumar@bharatvidyalaya.edu',
          rank: 18
        }
      },
      feesStatus: 'pending' as const,
      feeDetails: {
        term1: true,
        term2: false,
        term3: false,
        totalAmount: 23000,
        paidAmount: 7700
      },
      medicalConditions: ['ADHD'],
      medicalStatus: 'attention' as const,
      lastActive: '2024-01-11',
      riskLevel: 'medium' as const,
      riskFactors: ['Attendance issues', 'ADHD management', 'Fee pending'],
      interventions: [
        {
          date: '2024-01-08',
          type: 'Special education plan',
          notes: 'Adjusted learning plan for ADHD, extra time for tests',
          followUp: '2024-02-08',
          staff: 'Special Education Coordinator'
        }
      ],
      behavioralIncidents: 3,
      socialEngagement: 6,
      dropoutRisk: 25,
      attendanceHistory: [
        { date: '2024-01-15', present: true },
        { date: '2024-01-14', present: false },
        { date: '2024-01-13', present: true },
        { date: '2024-01-12', present: false }
      ]
    }
  ];
  
  const child = children[selectedChild];
  
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      default: return 'text-success';
    }
  };
  
  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      default: return 'success';
    }
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'students':
        return (
          <>
            {/* Student Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {child.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xl">{child.name}</div>
                      <div className="text-sm text-muted-foreground">Class {child.class} • {child.grade} Grade</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{child.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{child.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{child.address.city}, {child.address.state}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{child.address.distance}km from school</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Risk Level</span>
                      <Badge variant={getRiskBadge(child.riskLevel) as any}>
                        {child.riskLevel.toUpperCase()}
                      </Badge>
                    </div>
                    {child.riskFactors.length > 0 && (
                      <div className="text-sm text-muted-foreground">
                        Areas of concern: {child.riskFactors.join(', ')}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{child.attendance}%</div>
                    <div className="text-sm text-muted-foreground">Attendance</div>
                    <Progress value={child.attendance} className="h-2 mt-2" />
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold">{child.averageMarks}%</div>
                    <div className="text-sm text-muted-foreground">Average Marks</div>
                    <Progress value={child.averageMarks} className="h-2 mt-2" />
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold">{child.socialEngagement}/10</div>
                    <div className="text-sm text-muted-foreground">Social Engagement</div>
                    <Progress value={child.socialEngagement * 10} className="h-2 mt-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        );
      case 'grades':
        return (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Academic Performance by Subject
              </CardTitle>
              <CardDescription>Current marks, teacher details, and class ranking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(child.subjects).map(([subject, details]) => (
                  <div key={subject} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{subject}</h3>
                      <Badge variant="outline">Rank #{details.rank}</Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Current Mark</span>
                          <span className="font-medium">{details.currentMark}%</span>
                        </div>
                        <Progress value={details.currentMark} className="h-2" />
                      </div>
                      
                      <div className="text-sm">
                        <div className="font-medium">Recent Marks:</div>
                        <div className="flex gap-2 mt-1">
                          {details.marks.map((mark, index) => (
                            <span key={index} className="px-2 py-1 bg-muted rounded text-xs">
                              {mark}%
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t">
                        <div className="text-sm">
                          <div className="font-medium">{details.teacher}</div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            <span className="text-xs">{details.teacherContact}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      case 'attendance':
        return (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Attendance Record
              </CardTitle>
              <CardDescription>Your child's attendance history and patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">{child.attendance}%</div>
                  <div className="text-muted-foreground">Overall Attendance</div>
                  <Progress value={child.attendance} className="h-3 mt-2" />
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Recent Attendance (Last 7 days)</h3>
                  <div className="flex gap-2">
                    {child.attendanceHistory.slice(-7).map((record, index) => (
                      <div key={index} className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">
                          {new Date(record.date).toLocaleDateString('en-IN', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                          record.present 
                            ? 'bg-success text-white' 
                            : 'bg-destructive text-white'
                        }`}>
                          {record.present ? '✓' : '✗'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 'fees':
        return (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Fee Status
              </CardTitle>
              <CardDescription>Payment status and fee breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total Amount</span>
                  <span className="font-bold">₹{child.feeDetails.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Paid Amount</span>
                  <span className="font-bold text-success">₹{child.feeDetails.paidAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Remaining</span>
                  <span className="font-bold text-warning">
                    ₹{(child.feeDetails.totalAmount - child.feeDetails.paidAmount).toLocaleString()}
                  </span>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="text-sm font-medium mb-2">Term-wise Payment</div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Term 1</span>
                      <Badge variant={child.feeDetails.term1 ? 'secondary' : 'destructive'}>
                        {child.feeDetails.term1 ? 'Paid' : 'Pending'}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Term 2</span>
                      <Badge variant={child.feeDetails.term2 ? 'secondary' : 'destructive'}>
                        {child.feeDetails.term2 ? 'Paid' : 'Pending'}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Term 3</span>
                      <Badge variant={child.feeDetails.term3 ? 'secondary' : 'destructive'}>
                        {child.feeDetails.term3 ? 'Paid' : 'Pending'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 'medical':
        return (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Health & Medical Records
              </CardTitle>
              <CardDescription>Medical conditions and health status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium mb-2">Medical Status</div>
                  <Badge variant={child.medicalStatus === 'healthy' ? 'secondary' : 
                                 child.medicalStatus === 'attention' ? 'outline' : 'destructive'}>
                    {child.medicalStatus.toUpperCase()}
                  </Badge>
                </div>
                
                {child.medicalConditions.length > 0 && (
                  <div>
                    <div className="text-sm font-medium mb-2">Medical Conditions</div>
                    <div className="space-y-1">
                      {child.medicalConditions.map((condition, index) => (
                        <div key={index} className="text-sm p-2 bg-muted rounded">
                          {condition}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {child.interventions.length > 0 && (
                  <div>
                    <div className="text-sm font-medium mb-2">Recent Interventions</div>
                    <div className="space-y-2">
                      {child.interventions.slice(0, 2).map((intervention, index) => (
                        <div key={index} className="text-sm p-2 border rounded">
                          <div className="font-medium">{intervention.type}</div>
                          <div className="text-muted-foreground text-xs">{intervention.date}</div>
                          <div className="text-xs mt-1">{intervention.notes}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      case 'risk-assessment':
        return (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Risk Assessment
              </CardTitle>
              <CardDescription>Dropout risk analysis and intervention strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-warning">{child.dropoutRisk}%</div>
                  <div className="text-muted-foreground">Dropout Risk Score</div>
                  <Progress value={child.dropoutRisk} className="h-3 mt-2" />
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-2">Risk Factors</div>
                  <div className="space-y-1">
                    {child.riskFactors.map((factor, index) => (
                      <div key={index} className="text-sm p-2 bg-muted rounded flex items-center gap-2">
                        <AlertTriangle className="h-3 w-3 text-warning" />
                        {factor}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-2">Risk Level</div>
                  <Badge variant={getRiskBadge(child.riskLevel) as any} className="text-sm">
                    {child.riskLevel.toUpperCase()} RISK
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 'reports':
        return (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Academic Reports
              </CardTitle>
              <CardDescription>Comprehensive progress reports and analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold">{child.averageMarks}%</div>
                    <div className="text-sm text-muted-foreground">Overall Grade</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold">{child.attendance}%</div>
                    <div className="text-sm text-muted-foreground">Attendance</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-2">Subject Performance</div>
                  <div className="space-y-2">
                    {Object.entries(child.subjects).map(([subject, details]) => (
                      <div key={subject} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">{subject}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{details.currentMark}%</span>
                          <Badge variant="outline" className="text-xs">Rank #{details.rank}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 'classes':
        return (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Class Information
              </CardTitle>
              <CardDescription>Your child's class details and classmates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-xl font-bold">Class {child.class}</div>
                  <div className="text-muted-foreground">{child.grade} Grade</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-2">Subjects & Teachers</div>
                  <div className="space-y-2">
                    {Object.entries(child.subjects).map(([subject, details]) => (
                      <div key={subject} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{subject}</div>
                            <div className="text-sm text-muted-foreground">{details.teacher}</div>
                          </div>
                          <Badge variant="outline">Rank #{details.rank}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Section content coming soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Parent Portal</h1>
          <p className="text-muted-foreground">
            Monitor your child's academic progress and school activities
          </p>
        </div>
        {children.length > 1 && (
          <div className="flex gap-2">
            {children.map((child, index) => (
              <Button
                key={child.id}
                variant={selectedChild === index ? 'default' : 'outline'}
                onClick={() => setSelectedChild(index)}
              >
                {child.name.split(' ')[0]}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Student Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                {child.name.charAt(0)}
              </div>
              <div>
                <div className="text-xl">{child.name}</div>
                <div className="text-sm text-muted-foreground">Class {child.class} • {child.grade} Grade</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{child.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{child.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{child.address.city}, {child.address.state}</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{child.address.distance}km from school</span>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Risk Level</span>
                <Badge variant={getRiskBadge(child.riskLevel) as any}>
                  {child.riskLevel.toUpperCase()}
                </Badge>
              </div>
              {child.riskFactors.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  Areas of concern: {child.riskFactors.join(', ')}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{child.attendance}%</div>
              <div className="text-sm text-muted-foreground">Attendance</div>
              <Progress value={child.attendance} className="h-2 mt-2" />
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold">{child.averageMarks}%</div>
              <div className="text-sm text-muted-foreground">Average Marks</div>
              <Progress value={child.averageMarks} className="h-2 mt-2" />
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold">{child.socialEngagement}/10</div>
              <div className="text-sm text-muted-foreground">Social Engagement</div>
              <Progress value={child.socialEngagement * 10} className="h-2 mt-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section Content */}
      {renderSectionContent()}
    </div>
  );
}