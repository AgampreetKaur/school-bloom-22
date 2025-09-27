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
  Mail,
  Target,
  TrendingDown,
  Eye
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
  
  // Section components
  const renderAlertsSection = () => (
    <div className="space-y-6">
      <Card className="shadow-card border-destructive bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Critical Alerts - Immediate Action Required
          </CardTitle>
          <CardDescription>
            Students requiring urgent intervention based on multiple risk factors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {highRiskStudents.slice(0, 5).map((student) => (
              <div key={student.id} className="flex items-center justify-between p-3 bg-card rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-destructive text-white rounded-full flex items-center justify-center font-bold">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {student.class} • Risk: {student.dropoutRisk}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Contact Parent
                  </Button>
                  <Button size="sm" onClick={() => onStudentDetails(student.id)}>
                    <Eye className="h-4 w-4 mr-1" />
                    View Profile
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
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
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Student Name</th>
                <th className="text-center p-2">Present</th>
                <th className="text-center p-2">Absent</th>
                <th className="text-center p-2">Late</th>
              </tr>
            </thead>
            <tbody>
              {studentsData.map((student) => (
                <tr key={student.id} className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">{student.name}</td>
                  <td className="text-center p-2">
                    <Checkbox />
                  </td>
                  <td className="text-center p-2">
                    <Checkbox />
                  </td>
                  <td className="text-center p-2">
                    <Checkbox />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
            .sort((a, b) => a.averageMarks - b.averageMarks)
            .map((student, index) => (
              <div key={student.id} className={`p-4 rounded-lg border ${
                student.riskLevel === 'high' ? 'bg-destructive/5 border-destructive' : 'bg-card'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-bold text-muted-foreground">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.class}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{student.averageMarks}%</div>
                    {student.riskLevel === 'high' && (
                      <Badge variant="destructive" className="bg-destructive text-white">
                        High Risk
                      </Badge>
                    )}
                  </div>
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
        <div className="space-y-3">
          {studentsData
            .sort((a, b) => b.riskFactors.length - a.riskFactors.length)
            .map((student) => (
              <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {student.class} • ₹{student.feeDetails.totalAmount}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">Term 1</div>
                      <Checkbox checked={student.feeDetails.term1} disabled />
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">Term 2</div>
                      <Checkbox checked={student.feeDetails.term2} disabled />
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">Term 3</div>
                      <Checkbox checked={student.feeDetails.term3} disabled />
                    </div>
                  </div>
                  <Badge variant={student.feesStatus === 'paid' ? 'default' : 'destructive'}>
                    {student.feesStatus}
                  </Badge>
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
              <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                    student.medicalStatus === 'urgent' ? 'bg-destructive' : 
                    student.medicalStatus === 'attention' ? 'bg-warning' : 'bg-success'
                  }`}>
                    <Heart className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {student.medicalConditions.join(', ')}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => onStudentDetails(student.id)}>
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </Button>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-destructive">{highRiskStudents.length}</div>
              <div className="text-sm text-muted-foreground">High Risk Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warning">{mediumRiskStudents.length}</div>
              <div className="text-sm text-muted-foreground">Medium Risk Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success">
                {Math.round((totalStudents - highRiskStudents.length - mediumRiskStudents.length) / totalStudents * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Low Risk Rate</div>
            </div>
          </div>
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
        <div className="space-y-3">
          {studentsData.map((student) => (
            <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">{student.name}</p>
                <p className="text-sm text-muted-foreground">{student.class}</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
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
          <div className="p-3 border rounded-lg bg-destructive/5 border-destructive">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <span className="font-medium">Critical Alert</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              5 students have crossed high-risk threshold this week
            </p>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-primary" />
              <span className="font-medium">Attendance Alert</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              3 students have been absent for more than 5 consecutive days
            </p>
          </div>
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Enhanced Teacher Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive student monitoring and intervention tools
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>
      </div>

      {/* Navigation Pills */}
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

      {/* Current Section Content */}
      <div className="min-h-[600px]">
        {sections[activeSection as keyof typeof sections].component()}
      </div>
    </div>
  );
}