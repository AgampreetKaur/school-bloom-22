import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  TrendingDown, 
  AlertTriangle, 
  GraduationCap,
  BookOpen,
  DollarSign,
  BarChart3,
  Target,
  Eye
} from "lucide-react";
import { studentsData, getStudentsByRiskLevel, getDropoutRate, getTeacherStats } from "@/data/enhancedStudentsData";

interface SchoolAdminDashboardProps {
  onStudentDetails: (studentId: string) => void;
  activeSection?: string;
}

export default function SchoolAdminDashboard({ onStudentDetails, activeSection = "students" }: SchoolAdminDashboardProps) {
  const [viewMode, setViewMode] = useState<'class' | 'teacher'>('class');
  
  const totalStudents = studentsData.length;
  const highRiskStudents = getStudentsByRiskLevel('high');
  const mediumRiskStudents = getStudentsByRiskLevel('medium');
  const dropoutRate = getDropoutRate();
  const teacherStats = getTeacherStats();
  
  const averageAttendance = Math.round(
    studentsData.reduce((sum, student) => sum + student.attendance, 0) / totalStudents
  );
  
  const classwiseData = studentsData.reduce((acc, student) => {
    if (!acc[student.class]) {
      acc[student.class] = {
        total: 0,
        highRisk: 0,
        mediumRisk: 0,
        averageMarks: 0,
        attendance: 0
      };
    }
    acc[student.class].total++;
    if (student.riskLevel === 'high') acc[student.class].highRisk++;
    if (student.riskLevel === 'medium') acc[student.class].mediumRisk++;
    acc[student.class].averageMarks += student.averageMarks;
    acc[student.class].attendance += student.attendance;
    return acc;
  }, {} as any);
  
  Object.keys(classwiseData).forEach(className => {
    const classData = classwiseData[className];
    classData.averageMarks = Math.round(classData.averageMarks / classData.total);
    classData.attendance = Math.round(classData.attendance / classData.total);
  });

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'students':
        return (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    Total Students
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalStudents}</div>
                  <p className="text-xs text-muted-foreground">Across all classes</p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    High Risk Students
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">{highRiskStudents.length}</div>
                  <p className="text-xs text-muted-foreground">Need immediate attention</p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-warning" />
                    Dropout Risk Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-warning">{dropoutRate}%</div>
                  <p className="text-xs text-muted-foreground">Predicted dropout rate</p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Target className="h-4 w-4 text-success" />
                    Average Attendance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">{averageAttendance}%</div>
                  <p className="text-xs text-muted-foreground">School-wide average</p>
                </CardContent>
              </Card>
            </div>

            {/* Critical Alerts */}
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
                  {highRiskStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-3 bg-card rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-destructive text-white rounded-full flex items-center justify-center font-bold">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.class} • Dropout Risk: {student.dropoutRisk}%</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <div className="text-sm font-medium text-destructive">Risk Score: {student.dropoutRisk}%</div>
                          <div className="text-xs text-muted-foreground">
                            {student.riskFactors.slice(0, 2).join(', ')}
                          </div>
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

            {/* Class-wise / Teacher-wise View */}
            {viewMode === 'class' ? (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Class-wise Performance Overview</CardTitle>
                  <CardDescription>Performance metrics and risk assessment by class</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(classwiseData).map(([className, data]: [string, any]) => (
                      <div key={className} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">Class {className}</h3>
                            <p className="text-sm text-muted-foreground">{data.total} students</p>
                          </div>
                          <div className="flex gap-2">
                            {data.highRisk > 0 && (
                              <Badge variant="destructive">{data.highRisk} High Risk</Badge>
                            )}
                            {data.mediumRisk > 0 && (
                              <Badge variant="outline">{data.mediumRisk} Medium Risk</Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Average Marks</div>
                            <div className="font-semibold text-lg">{data.averageMarks}%</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Attendance</div>
                            <div className="font-semibold text-lg">{data.attendance}%</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Risk Level</div>
                            <Progress 
                              value={(data.highRisk + data.mediumRisk * 0.5) / data.total * 100} 
                              className="h-2 mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Teacher Performance & Risk Management</CardTitle>
                  <CardDescription>Teacher workload and high-risk student distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teacherStats.map((teacher) => (
                      <div key={teacher.name} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold">{teacher.name}</h3>
                            <p className="text-sm text-muted-foreground">{teacher.contact}</p>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="secondary">{teacher.totalStudents} Students</Badge>
                            {teacher.highRiskStudents > 0 && (
                              <Badge variant="destructive">{teacher.highRiskStudents} High Risk</Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="text-sm text-muted-foreground mb-1">Risk Distribution</div>
                            <Progress 
                              value={teacher.highRiskStudents / teacher.totalStudents * 100} 
                              className="h-2"
                            />
                          </div>
                          <div className="text-sm">
                            {Math.round(teacher.highRiskStudents / teacher.totalStudents * 100)}% High Risk
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        );
      case 'attendance':
        return (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>School-wide Attendance Management</CardTitle>
              <CardDescription>Monitor and manage attendance across all classes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold">{averageAttendance}%</div>
                    <div className="text-sm text-muted-foreground">Average Attendance</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold">{Math.round(totalStudents * averageAttendance / 100)}</div>
                    <div className="text-sm text-muted-foreground">Present Today</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold">{totalStudents - Math.round(totalStudents * averageAttendance / 100)}</div>
                    <div className="text-sm text-muted-foreground">Absent Today</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 'grades':
        return (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Academic Performance Overview</CardTitle>
              <CardDescription>School-wide academic performance and grades analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold">
                      {Math.round(studentsData.reduce((sum, s) => sum + s.averageMarks, 0) / totalStudents)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Average Marks</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold">
                      {studentsData.filter(s => s.averageMarks >= 90).length}
                    </div>
                    <div className="text-sm text-muted-foreground">A+ Students</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold">
                      {studentsData.filter(s => s.averageMarks >= 80 && s.averageMarks < 90).length}
                    </div>
                    <div className="text-sm text-muted-foreground">A Students</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold">
                      {studentsData.filter(s => s.averageMarks < 60).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Below Average</div>
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
              <CardTitle>Fee Management Overview</CardTitle>
              <CardDescription>Track fee collection and pending payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-success">
                      {studentsData.filter(s => s.feesStatus === 'paid').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Fees Paid</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-warning">
                      {studentsData.filter(s => s.feesStatus === 'pending').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Fees Pending</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-destructive">
                      {studentsData.filter(s => s.feesStatus === 'overdue').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Overdue</div>
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
              <CardTitle>Medical Records Overview</CardTitle>
              <CardDescription>Monitor student health and medical conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-destructive">
                      {studentsData.filter(s => s.medicalStatus === 'urgent').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Urgent Cases</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-warning">
                      {studentsData.filter(s => s.medicalStatus === 'attention').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Need Attention</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-success">
                      {studentsData.filter(s => s.medicalStatus === 'healthy').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Healthy</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 'risk-assessment':
        return (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Risk Assessment Dashboard</CardTitle>
              <CardDescription>Comprehensive dropout risk analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-destructive">{highRiskStudents.length}</div>
                    <div className="text-sm text-muted-foreground">High Risk</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-warning">{mediumRiskStudents.length}</div>
                    <div className="text-sm text-muted-foreground">Medium Risk</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-success">
                      {totalStudents - highRiskStudents.length - mediumRiskStudents.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Low Risk</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold">{dropoutRate}%</div>
                    <div className="text-sm text-muted-foreground">Dropout Rate</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 'reports':
        return (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>School Reports & Analytics</CardTitle>
              <CardDescription>Generate comprehensive school performance reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <BarChart3 className="h-6 w-6 mb-2" />
                    Academic Report
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Users className="h-6 w-6 mb-2" />
                    Attendance Report
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <DollarSign className="h-6 w-6 mb-2" />
                    Fee Collection Report
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <AlertTriangle className="h-6 w-6 mb-2" />
                    Risk Assessment Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 'classes':
        return (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Class Management</CardTitle>
              <CardDescription>Manage all classes and their performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(classwiseData).map(([className, data]: [string, any]) => (
                  <div key={className} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">Class {className}</h3>
                        <p className="text-sm text-muted-foreground">{data.total} students</p>
                      </div>
                      <div className="flex gap-2">
                        {data.highRisk > 0 && (
                          <Badge variant="destructive">{data.highRisk} High Risk</Badge>
                        )}
                        {data.mediumRisk > 0 && (
                          <Badge variant="outline">{data.mediumRisk} Medium Risk</Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Average Marks</div>
                        <div className="font-semibold text-lg">{data.averageMarks}%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Attendance</div>
                        <div className="font-semibold text-lg">{data.attendance}%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Risk Level</div>
                        <Progress 
                          value={(data.highRisk + data.mediumRisk * 0.5) / data.total * 100} 
                          className="h-2 mt-1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
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
          <h1 className="text-3xl font-bold">School Administration</h1>
          <p className="text-muted-foreground">
            Complete overview of school performance and student management
          </p>
        </div>
        {activeSection === 'students' && (
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'class' ? 'default' : 'outline'}
              onClick={() => setViewMode('class')}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Class View
            </Button>
            <Button
              variant={viewMode === 'teacher' ? 'default' : 'outline'}
              onClick={() => setViewMode('teacher')}
            >
              <GraduationCap className="h-4 w-4 mr-2" />
              Teacher View
            </Button>
          </div>
        )}
      </div>

      {/* Section Content */}
      {renderSectionContent()}
    </div>
  );
}