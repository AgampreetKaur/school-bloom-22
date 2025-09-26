import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Calendar,
  BarChart3,
  DollarSign,
  Heart,
  FileText,
  Bell,
  Search,
  Download,
  MessageSquare,
  Phone,
  Eye,
  CheckCircle,
  XCircle,
  TrendingDown,
  Target
} from "lucide-react";
import { studentsData, getStudentsByRiskLevel } from "@/data/enhancedStudentsData";

interface EnhancedTeacherDashboardProps {
  onStudentDetails: (studentId: string) => void;
}

export default function EnhancedTeacherDashboard({ onStudentDetails }: EnhancedTeacherDashboardProps) {
  const [activeSection, setActiveSection] = useState('alerts');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const highRiskStudents = getStudentsByRiskLevel('high');
  const mediumRiskStudents = getStudentsByRiskLevel('medium');
  const totalStudents = studentsData.length;
  
  const riskTrendData = {
    increasing: highRiskStudents.filter(s => s.dropoutRisk > 60).length,
    stable: highRiskStudents.filter(s => s.dropoutRisk >= 40 && s.dropoutRisk <= 60).length,
    decreasing: highRiskStudents.filter(s => s.dropoutRisk < 40).length
  };
  
  const topRiskFactors = [
    { factor: 'Poor Attendance', percentage: 35, students: 12 },
    { factor: 'Declining Grades', percentage: 28, students: 9 },
    { factor: 'Fee Issues', percentage: 22, students: 7 },
    { factor: 'Behavioral Problems', percentage: 15, students: 5 }
  ];

  const renderAlertsSection = () => (
    <div className="space-y-6">
      {/* Critical Alerts */}
      <Card className="shadow-card border-destructive bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Critical Alerts - Immediate Action Required
          </CardTitle>
          <CardDescription>
            Students whose risk score has crossed critical thresholds in the last 7 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {highRiskStudents.slice(0, 5).map((student) => (
              <div key={student.id} className="flex items-center justify-between p-3 bg-card rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-destructive text-white flex items-center justify-center font-bold">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.class}</p>
                  </div>
                  <div className="bg-destructive text-white px-2 py-1 rounded text-sm font-medium">
                    {student.dropoutRisk}% Risk
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {student.riskFactors.slice(0, 2).join(', ')}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      {student.dropoutRisk > 70 ? (
                        <TrendingUp className="h-3 w-3 text-destructive" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-success" />
                      )}
                      {student.dropoutRisk > 70 ? 'Increasing' : 'Stable'}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => onStudentDetails(student.id)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Class Risk Overview</CardTitle>
            <CardDescription>Distribution of risk levels in your classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>High Risk</span>
                <div className="flex items-center gap-2">
                  <Progress value={(highRiskStudents.length / totalStudents) * 100} className="w-20 h-2" />
                  <span className="text-sm font-medium">{highRiskStudents.length}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Medium Risk</span>
                <div className="flex items-center gap-2">
                  <Progress value={(mediumRiskStudents.length / totalStudents) * 100} className="w-20 h-2" />
                  <span className="text-sm font-medium">{mediumRiskStudents.length}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Low Risk</span>
                <div className="flex items-center gap-2">
                  <Progress value={((totalStudents - highRiskStudents.length - mediumRiskStudents.length) / totalStudents) * 100} className="w-20 h-2" />
                  <span className="text-sm font-medium">{totalStudents - highRiskStudents.length - mediumRiskStudents.length}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <div className="text-sm font-medium text-center">
                {Math.round((highRiskStudents.length + mediumRiskStudents.length) / totalStudents * 100)}% of your class is flagged as at-risk
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Top Risk Factors</CardTitle>
            <CardDescription>Most common issues across at-risk students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topRiskFactors.map((factor, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">{factor.factor}</div>
                    <div className="text-xs text-muted-foreground">{factor.students} students</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={factor.percentage} className="w-16 h-2" />
                    <span className="text-sm font-medium w-8">{factor.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAttendanceSection = () => (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Attendance Management
        </CardTitle>
        <CardDescription>Mark attendance for {selectedDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-48"
          />
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-4 gap-0 bg-muted p-3 font-medium text-sm">
            <div>Student Name</div>
            <div>Class</div>
            <div>Present</div>
            <div>Notes</div>
          </div>
          
          {studentsData.map((student) => (
            <div key={student.id} className="grid grid-cols-4 gap-0 p-3 border-t hover:bg-muted/50">
              <div className="font-medium">{student.name}</div>
              <div className="text-muted-foreground">{student.class}</div>
              <div>
                <Checkbox 
                  defaultChecked={student.attendance > 80}
                  className="scale-125"
                />
              </div>
              <div>
                <Input placeholder="Add note..." className="h-8 text-xs" />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button>Save Attendance</Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderGradesSection = () => (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Grades & Academic Performance
        </CardTitle>
        <CardDescription>Student rankings with high-risk students highlighted</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {studentsData
            .sort((a, b) => a.averageMarks - b.averageMarks) // Lowest marks first (highest risk)
            .map((student, index) => (
            <div key={student.id} className={`p-3 rounded-lg border flex items-center justify-between ${
              student.riskLevel === 'high' ? 'bg-destructive/10 border-destructive' : 
              student.riskLevel === 'medium' ? 'bg-warning/10 border-warning' : ''
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  student.riskLevel === 'high' ? 'bg-destructive text-white' :
                  student.riskLevel === 'medium' ? 'bg-warning text-white' : 
                  'bg-success text-white'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <div className="font-medium">{student.name}</div>
                  <div className="text-sm text-muted-foreground">{student.class}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-semibold">{student.averageMarks}%</div>
                  <div className="text-xs text-muted-foreground">Average</div>
                </div>
                
                <div className="grid grid-cols-4 gap-2 text-xs">
                  {Object.entries(student.subjects).map(([subject, details]) => (
                    <div key={subject} className="text-center">
                      <div className="font-medium">{details.currentMark}</div>
                      <div className="text-muted-foreground">{subject.slice(0, 4)}</div>
                    </div>
                  ))}
                </div>
                
                <Button size="sm" variant="outline" onClick={() => onStudentDetails(student.id)}>
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderFeesSection = () => (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Fee Management
        </CardTitle>
        <CardDescription>Fee status with priority on at-risk students</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="grid grid-cols-4 gap-4 p-3 bg-muted rounded-lg font-medium text-sm">
            <div>Term 1</div>
            <div>Term 2</div>
            <div>Term 3</div>
            <div>Total Paid</div>
          </div>
        </div>
        
        <div className="space-y-3">
          {studentsData
            .sort((a, b) => {
              // Sort by risk level first, then by amount pending
              if (a.riskLevel !== b.riskLevel) {
                const riskOrder = { high: 0, medium: 1, low: 2 };
                return riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
              }
              return (a.feeDetails.totalAmount - a.feeDetails.paidAmount) - (b.feeDetails.totalAmount - b.feeDetails.paidAmount);
            })
            .map((student) => (
            <div key={student.id} className={`p-3 rounded-lg border ${
              student.riskLevel === 'high' ? 'bg-destructive/10 border-destructive' : ''
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    student.riskLevel === 'high' ? 'bg-destructive text-white' :
                    student.riskLevel === 'medium' ? 'bg-warning text-white' : 
                    'bg-success text-white'
                  }`}>
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-muted-foreground">{student.class}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">₹{student.feeDetails.paidAmount.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">of ₹{student.feeDetails.totalAmount.toLocaleString()}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox checked={student.feeDetails.term1} />
                  <span className="text-sm">Term 1</span>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox checked={student.feeDetails.term2} />
                  <span className="text-sm">Term 2</span>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox checked={student.feeDetails.term3} />
                  <span className="text-sm">Term 3</span>
                </div>
                <div className="text-right">
                  <Badge variant={student.feesStatus === 'paid' ? 'secondary' : 
                                 student.feesStatus === 'pending' ? 'outline' : 'destructive'}>
                    {student.feesStatus.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderMedicalSection = () => (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5" />
          Medical Records
        </CardTitle>
        <CardDescription>Students with medical conditions requiring attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {studentsData
            .filter(student => student.medicalConditions.length > 0)
            .map((student) => (
            <div key={student.id} className={`p-3 rounded-lg border ${
              student.medicalStatus === 'urgent' ? 'bg-destructive/10 border-destructive' :
              student.medicalStatus === 'attention' ? 'bg-warning/10 border-warning' : ''
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    student.medicalStatus === 'urgent' ? 'bg-destructive text-white' :
                    student.medicalStatus === 'attention' ? 'bg-warning text-white' : 
                    'bg-success text-white'
                  }`}>
                    <Heart className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-muted-foreground">{student.class}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {student.medicalConditions.join(', ')}
                    </div>
                    <Badge variant={student.medicalStatus === 'urgent' ? 'destructive' :
                                   student.medicalStatus === 'attention' ? 'outline' : 'secondary'}>
                      {student.medicalStatus.toUpperCase()}
                    </Badge>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => onStudentDetails(student.id)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderRiskAssessmentSection = () => (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Dropout Risk Analytics
          </CardTitle>
          <CardDescription>Predictive analytics showing student dropout probability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-destructive">{riskTrendData.increasing}</div>
              <div className="text-sm text-muted-foreground">Risk Increasing</div>
              <TrendingUp className="h-8 w-8 text-destructive mx-auto mt-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warning">{riskTrendData.stable}</div>
              <div className="text-sm text-muted-foreground">Risk Stable</div>
              <Target className="h-8 w-8 text-warning mx-auto mt-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success">{riskTrendData.decreasing}</div>
              <div className="text-sm text-muted-foreground">Risk Decreasing</div>
              <TrendingDown className="h-8 w-8 text-success mx-auto mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Class-wise Risk Assessment</CardTitle>
          <CardDescription>Scroll down to see individual class analytics</CardDescription>
        </CardHeader>
        <CardContent>
          {['10A', '10B', '9A'].map((className) => {
            const classStudents = studentsData.filter(s => s.class === className);
            const classHighRisk = classStudents.filter(s => s.riskLevel === 'high').length;
            const classMediumRisk = classStudents.filter(s => s.riskLevel === 'medium').length;
            
            return (
              <div key={className} className="mb-6 p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Class {className}</h3>
                  <Badge variant="outline">{classStudents.length} students</Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-destructive">{classHighRisk}</div>
                    <div className="text-sm text-muted-foreground">High Risk</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-warning">{classMediumRisk}</div>
                    <div className="text-sm text-muted-foreground">Medium Risk</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-success">{classStudents.length - classHighRisk - classMediumRisk}</div>
                    <div className="text-sm text-muted-foreground">Low Risk</div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Progress 
                    value={(classHighRisk + classMediumRisk) / classStudents.length * 100} 
                    className="h-3"
                  />
                  <div className="text-xs text-center mt-1 text-muted-foreground">
                    {Math.round((classHighRisk + classMediumRisk) / classStudents.length * 100)}% at risk
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );

  const renderReportsSection = () => (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Student Reports
        </CardTitle>
        <CardDescription>Generate and download individual student reports</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        
        <div className="space-y-3">
          {studentsData
            .filter(student => 
              student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              student.class.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((student) => (
            <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {student.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{student.name}</div>
                  <div className="text-sm text-muted-foreground">{student.class} • {student.grade} Grade</div>
                </div>
              </div>
              
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderNotificationsSection = () => (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications & Alerts
        </CardTitle>
        <CardDescription>Manage and view system notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[
            {
              id: 1,
              type: 'urgent',
              title: 'High Risk Alert',
              message: 'Karan Singh has been flagged as extremely high risk (75% dropout probability)',
              time: '2 minutes ago',
              action: 'View Student'
            },
            {
              id: 2,
              type: 'warning',
              title: 'Attendance Alert',
              message: 'Rohan Gupta has been absent for 3 consecutive days',
              time: '1 hour ago',
              action: 'Contact Parent'
            },
            {
              id: 3,
              type: 'info',
              title: 'Fee Reminder',
              message: 'Term 2 fees are due for 7 students in your classes',
              time: '3 hours ago',
              action: 'View List'
            },
            {
              id: 4,
              type: 'success',
              title: 'Improvement Alert',
              message: 'Arjun Nair\'s risk score has decreased from 35% to 25%',
              time: '1 day ago',
              action: 'View Progress'
            }
          ].map((notification) => (
            <div key={notification.id} className={`p-3 rounded-lg border-l-4 ${
              notification.type === 'urgent' ? 'border-l-destructive bg-destructive/5' :
              notification.type === 'warning' ? 'border-l-warning bg-warning/5' :
              notification.type === 'success' ? 'border-l-success bg-success/5' : 'border-l-primary bg-primary/5'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-medium text-sm">{notification.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">{notification.message}</div>
                  <div className="text-xs text-muted-foreground mt-2">{notification.time}</div>
                </div>
                <Button size="sm" variant="outline">
                  {notification.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const sections = {
    alerts: { title: 'Alert & Priority Panel', component: renderAlertsSection },
    attendance: { title: 'Attendance Management', component: renderAttendanceSection },
    grades: { title: 'Grades & Marks', component: renderGradesSection },
    fees: { title: 'Fee Management', component: renderFeesSection },
    medical: { title: 'Medical Records', component: renderMedicalSection },
    risk: { title: 'Risk Assessment', component: renderRiskAssessmentSection },
    reports: { title: 'Reports', component: renderReportsSection },
    notifications: { title: 'Notifications', component: renderNotificationsSection }
  };

  return (
    <div className="space-y-6">
      {/* Header with Section Navigation */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold">Enhanced Teacher Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive student monitoring with predictive analytics and intervention tools
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {Object.entries(sections).map(([key, section]) => (
            <Button
              key={key}
              variant={activeSection === key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveSection(key)}
            >
              {section.title}
            </Button>
          ))}
        </div>
      </div>

      {/* Current Section Content */}
      <div className="min-h-[600px]">
        {sections[activeSection as keyof typeof sections].component()}
      </div>
    </div>
  );
}