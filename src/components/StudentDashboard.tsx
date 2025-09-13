import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign,
  Search,
  Filter,
  Download,
  Calendar,
  Heart
} from "lucide-react";
import StudentCard from "./StudentCard";
import { studentsData, getStudentsByRiskLevel } from "@/data/studentsData";

interface StudentDashboardProps {
  onStudentDetails: (studentId: string) => void;
}

export default function StudentDashboard({ onStudentDetails }: StudentDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.class.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRisk = filterRisk === 'all' || student.riskLevel === filterRisk;
    
    return matchesSearch && matchesRisk;
  });

  const highRiskStudents = getStudentsByRiskLevel('high');
  const mediumRiskStudents = getStudentsByRiskLevel('medium');
  const totalStudents = studentsData.length;
  const averageAttendance = Math.round(studentsData.reduce((sum, student) => sum + student.attendance, 0) / totalStudents);
  const pendingFees = studentsData.filter(s => s.feesStatus === 'pending' || s.feesStatus === 'overdue').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Student Management</h1>
          <p className="text-muted-foreground">
            Monitor student progress, attendance, and identify at-risk students
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              Across all classes
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageAttendance}%</div>
            <p className="text-xs text-muted-foreground">
              This semester
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk Students</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{highRiskStudents.length}</div>
            <p className="text-xs text-muted-foreground">
              Need immediate attention
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Fees</CardTitle>
            <DollarSign className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{pendingFees}</div>
            <p className="text-xs text-muted-foreground">
              Students with pending payments
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Assessment Alert */}
      {highRiskStudents.length > 0 && (
        <Card className="border-destructive bg-destructive/5 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Immediate Attention Required
            </CardTitle>
            <CardDescription>
              {highRiskStudents.length} student{highRiskStudents.length !== 1 ? 's' : ''} classified as high-risk based on attendance, grades, and other factors.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {highRiskStudents.map((student) => (
                <Badge 
                  key={student.id} 
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={() => onStudentDetails(student.id)}
                >
                  {student.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Student Directory</CardTitle>
          <CardDescription>
            Search and filter students by name, class, or risk level
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students by name, email, or class..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterRisk === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterRisk('all')}
              >
                All
              </Button>
              <Button
                variant={filterRisk === 'low' ? 'success' : 'outline'}
                size="sm"
                onClick={() => setFilterRisk('low')}
              >
                Low Risk
              </Button>
              <Button
                variant={filterRisk === 'medium' ? 'warning' : 'outline'}
                size="sm"
                onClick={() => setFilterRisk('medium')}
              >
                Medium Risk
              </Button>
              <Button
                variant={filterRisk === 'high' ? 'destructive' : 'outline'}
                size="sm"
                onClick={() => setFilterRisk('high')}
              >
                High Risk
              </Button>
            </div>
          </div>

          {filteredStudents.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No students found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredStudents.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onViewDetails={onStudentDetails}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}