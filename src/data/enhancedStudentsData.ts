export interface Student {
  id: string;
  name: string;
  class: string;
  grade: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    distance: number; // km from school
  };
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  attendance: number;
  averageMarks: number;
  subjects: {
    [subject: string]: {
      marks: number[];
      currentMark: number;
      teacher: string;
      teacherContact: string;
      rank: number;
    };
  };
  feesStatus: 'paid' | 'pending' | 'overdue';
  feeDetails: {
    term1: boolean;
    term2: boolean;
    term3: boolean;
    totalAmount: number;
    paidAmount: number;
  };
  medicalConditions: string[];
  medicalStatus: 'healthy' | 'attention' | 'urgent';
  lastActive: string;
  riskLevel: 'low' | 'medium' | 'high';
  riskFactors: string[];
  interventions: {
    date: string;
    type: string;
    notes: string;
    followUp: string;
    staff: string;
  }[];
  behavioralIncidents: number;
  socialEngagement: number; // 1-10 scale
  dropoutRisk: number; // percentage
  attendanceHistory: { date: string; present: boolean }[];
  profileImage?: string;
}

export const studentsData: Student[] = [
  {
    id: '1',
    name: 'Arya Sharma',
    email: 'arya.sharma@student.edu',
    phone: '+91-9876543210',
    class: '10A',
    grade: '10th',
    address: {
      street: '45, MG Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      distance: 2.5
    },
    parentName: 'Rajesh Sharma',
    parentEmail: 'rajesh.sharma@email.com',
    parentPhone: '+91-9876543211',
    attendance: 95,
    averageMarks: 88,
    subjects: {
      'Mathematics': {
        marks: [92, 89, 95, 87],
        currentMark: 92,
        teacher: 'Priya Sharma',
        teacherContact: 'priya.sharma@bharatvidyalaya.edu',
        rank: 3
      },
      'Science': {
        marks: [89, 91, 86, 88],
        currentMark: 89,
        teacher: 'Vikram Patel',
        teacherContact: 'vikram.patel@bharatvidyalaya.edu',
        rank: 5
      },
      'English': {
        marks: [85, 87, 89, 84],
        currentMark: 85,
        teacher: 'Meera Joshi',
        teacherContact: 'meera.joshi@bharatvidyalaya.edu',
        rank: 7
      },
      'History': {
        marks: [87, 85, 90, 86],
        currentMark: 87,
        teacher: 'Ravi Kumar',
        teacherContact: 'ravi.kumar@bharatvidyalaya.edu',
        rank: 4
      }
    },
    feesStatus: 'paid',
    feeDetails: {
      term1: true,
      term2: true,
      term3: false,
      totalAmount: 25000,
      paidAmount: 16700
    },
    medicalConditions: [],
    medicalStatus: 'healthy',
    lastActive: '2024-01-15',
    riskLevel: 'low',
    riskFactors: [],
    interventions: [],
    behavioralIncidents: 0,
    socialEngagement: 8,
    dropoutRisk: 5,
    attendanceHistory: [
      { date: '2024-01-15', present: true },
      { date: '2024-01-14', present: true },
      { date: '2024-01-13', present: false },
      { date: '2024-01-12', present: true }
    ]
  },
  {
    id: '2',
    name: 'Rohan Gupta',
    email: 'rohan.gupta@student.edu',
    phone: '+91-9876543212',
    class: '10A',
    grade: '10th',
    address: {
      street: '78, Brigade Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560025',
      distance: 5.2
    },
    parentName: 'Sunita Gupta',
    parentEmail: 'sunita.gupta@email.com',
    parentPhone: '+91-9876543213',
    attendance: 78,
    averageMarks: 65,
    subjects: {
      'Mathematics': {
        marks: [68, 65, 72, 64],
        currentMark: 68,
        teacher: 'Priya Sharma',
        teacherContact: 'priya.sharma@bharatvidyalaya.edu',
        rank: 24
      },
      'Science': {
        marks: [72, 70, 75, 69],
        currentMark: 72,
        teacher: 'Vikram Patel',
        teacherContact: 'vikram.patel@bharatvidyalaya.edu',
        rank: 18
      },
      'English': {
        marks: [60, 62, 58, 65],
        currentMark: 60,
        teacher: 'Meera Joshi',
        teacherContact: 'meera.joshi@bharatvidyalaya.edu',
        rank: 28
      },
      'History': {
        marks: [62, 64, 60, 68],
        currentMark: 62,
        teacher: 'Ravi Kumar',
        teacherContact: 'ravi.kumar@bharatvidyalaya.edu',
        rank: 26
      }
    },
    feesStatus: 'pending',
    feeDetails: {
      term1: true,
      term2: false,
      term3: false,
      totalAmount: 25000,
      paidAmount: 8300
    },
    medicalConditions: ['Mild asthma'],
    medicalStatus: 'attention',
    lastActive: '2024-01-12',
    riskLevel: 'medium',
    riskFactors: ['Low attendance', 'Fee pending', 'Declining grades'],
    interventions: [
      {
        date: '2024-01-10',
        type: 'Parent meeting',
        notes: 'Discussed attendance issues and academic performance',
        followUp: '2024-01-25',
        staff: 'Priya Sharma'
      }
    ],
    behavioralIncidents: 2,
    socialEngagement: 5,
    dropoutRisk: 35,
    attendanceHistory: [
      { date: '2024-01-15', present: false },
      { date: '2024-01-14', present: true },
      { date: '2024-01-13', present: false },
      { date: '2024-01-12', present: true }
    ]
  },
  {
    id: '3',
    name: 'Priya Reddy',
    email: 'priya.reddy@student.edu',
    phone: '+91-9876543214',
    class: '10B',
    grade: '10th',
    address: {
      street: '23, Jayanagar 4th Block',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560011',
      distance: 3.8
    },
    parentName: 'Venkat Reddy',
    parentEmail: 'venkat.reddy@email.com',
    parentPhone: '+91-9876543215',
    attendance: 92,
    averageMarks: 94,
    subjects: {
      'Mathematics': {
        marks: [96, 94, 98, 92],
        currentMark: 96,
        teacher: 'Anita Singh',
        teacherContact: 'anita.singh@bharatvidyalaya.edu',
        rank: 1
      },
      'Science': {
        marks: [94, 96, 92, 95],
        currentMark: 94,
        teacher: 'Rajesh Kumar',
        teacherContact: 'rajesh.kumar@bharatvidyalaya.edu',
        rank: 2
      },
      'English': {
        marks: [92, 90, 94, 91],
        currentMark: 92,
        teacher: 'Kavya Iyer',
        teacherContact: 'kavya.iyer@bharatvidyalaya.edu',
        rank: 1
      },
      'History': {
        marks: [94, 92, 96, 93],
        currentMark: 94,
        teacher: 'Arjun Nair',
        teacherContact: 'arjun.nair@bharatvidyalaya.edu',
        rank: 1
      }
    },
    feesStatus: 'paid',
    feeDetails: {
      term1: true,
      term2: true,
      term3: true,
      totalAmount: 25000,
      paidAmount: 25000
    },
    medicalConditions: [],
    medicalStatus: 'healthy',
    lastActive: '2024-01-15',
    riskLevel: 'low',
    riskFactors: [],
    interventions: [],
    behavioralIncidents: 0,
    socialEngagement: 9,
    dropoutRisk: 2,
    attendanceHistory: [
      { date: '2024-01-15', present: true },
      { date: '2024-01-14', present: true },
      { date: '2024-01-13', present: true },
      { date: '2024-01-12', present: false }
    ]
  },
  {
    id: '4',
    name: 'Karan Singh',
    email: 'karan.singh@student.edu',
    phone: '+91-9876543216',
    class: '10B',
    grade: '10th',
    address: {
      street: '156, Whitefield Main Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560066',
      distance: 12.5
    },
    parentName: 'Gurpreet Singh',
    parentEmail: 'gurpreet.singh@email.com',
    parentPhone: '+91-9876543217',
    attendance: 65,
    averageMarks: 58,
    subjects: {
      'Mathematics': {
        marks: [55, 52, 58, 49],
        currentMark: 55,
        teacher: 'Anita Singh',
        teacherContact: 'anita.singh@bharatvidyalaya.edu',
        rank: 28
      },
      'Science': {
        marks: [62, 58, 65, 56],
        currentMark: 62,
        teacher: 'Rajesh Kumar',
        teacherContact: 'rajesh.kumar@bharatvidyalaya.edu',
        rank: 25
      },
      'English': {
        marks: [58, 55, 61, 52],
        currentMark: 58,
        teacher: 'Kavya Iyer',
        teacherContact: 'kavya.iyer@bharatvidyalaya.edu',
        rank: 29
      },
      'History': {
        marks: [56, 54, 59, 51],
        currentMark: 56,
        teacher: 'Arjun Nair',
        teacherContact: 'arjun.nair@bharatvidyalaya.edu',
        rank: 30
      }
    },
    feesStatus: 'overdue',
    feeDetails: {
      term1: false,
      term2: false,
      term3: false,
      totalAmount: 25000,
      paidAmount: 5000
    },
    medicalConditions: ['Anxiety disorder', 'Learning disability'],
    medicalStatus: 'urgent',
    lastActive: '2024-01-08',
    riskLevel: 'high',
    riskFactors: ['Poor attendance', 'Failing grades', 'Fee overdue', 'Long commute', 'Mental health issues'],
    interventions: [
      {
        date: '2024-01-05',
        type: 'Counselor referral',
        notes: 'Student showing signs of anxiety, referred to school counselor',
        followUp: '2024-01-20',
        staff: 'Anita Singh'
      },
      {
        date: '2023-12-15',
        type: 'Parent conference',
        notes: 'Discussed academic struggles and attendance issues',
        followUp: '2024-01-15',
        staff: 'Principal'
      }
    ],
    behavioralIncidents: 5,
    socialEngagement: 3,
    dropoutRisk: 75,
    attendanceHistory: [
      { date: '2024-01-15', present: false },
      { date: '2024-01-14', present: false },
      { date: '2024-01-13', present: false },
      { date: '2024-01-12', present: true }
    ]
  },
  {
    id: '5',
    name: 'Kavya Iyer',
    email: 'kavya.iyer@student.edu',
    phone: '+91-9876543218',
    class: '9A',
    grade: '9th',
    address: {
      street: '89, Koramangala 5th Block',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560095',
      distance: 4.2
    },
    parentName: 'Lakshmi Iyer',
    parentEmail: 'lakshmi.iyer@email.com',
    parentPhone: '+91-9876543219',
    attendance: 89,
    averageMarks: 82,
    subjects: {
      'Mathematics': {
        marks: [85, 83, 87, 81],
        currentMark: 85,
        teacher: 'Priya Sharma',
        teacherContact: 'priya.sharma@bharatvidyalaya.edu',
        rank: 8
      },
      'Science': {
        marks: [80, 82, 78, 84],
        currentMark: 80,
        teacher: 'Vikram Patel',
        teacherContact: 'vikram.patel@bharatvidyalaya.edu',
        rank: 12
      },
      'English': {
        marks: [84, 86, 82, 85],
        currentMark: 84,
        teacher: 'Meera Joshi',
        teacherContact: 'meera.joshi@bharatvidyalaya.edu',
        rank: 6
      },
      'History': {
        marks: [79, 81, 77, 83],
        currentMark: 79,
        teacher: 'Ravi Kumar',
        teacherContact: 'ravi.kumar@bharatvidyalaya.edu',
        rank: 10
      }
    },
    feesStatus: 'paid',
    feeDetails: {
      term1: true,
      term2: true,
      term3: false,
      totalAmount: 23000,
      paidAmount: 15300
    },
    medicalConditions: ['Lactose intolerance'],
    medicalStatus: 'attention',
    lastActive: '2024-01-14',
    riskLevel: 'low',
    riskFactors: [],
    interventions: [],
    behavioralIncidents: 0,
    socialEngagement: 7,
    dropoutRisk: 8,
    attendanceHistory: [
      { date: '2024-01-15', present: true },
      { date: '2024-01-14', present: true },
      { date: '2024-01-13', present: false },
      { date: '2024-01-12', present: true }
    ]
  },
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
    feesStatus: 'pending',
    feeDetails: {
      term1: true,
      term2: false,
      term3: false,
      totalAmount: 23000,
      paidAmount: 7700
    },
    medicalConditions: ['ADHD'],
    medicalStatus: 'attention',
    lastActive: '2024-01-11',
    riskLevel: 'medium',
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

export const getStudentById = (id: string): Student | undefined => {
  return studentsData.find(student => student.id === id);
};

export const getStudentsByRiskLevel = (riskLevel: 'low' | 'medium' | 'high'): Student[] => {
  return studentsData.filter(student => student.riskLevel === riskLevel);
};

export const getStudentsByClass = (className: string): Student[] => {
  return studentsData.filter(student => student.class === className);
};

export const getStudentsByParent = (parentEmail: string): Student[] => {
  return studentsData.filter(student => student.parentEmail === parentEmail);
};

export const getDropoutRate = (): number => {
  const highRiskStudents = getStudentsByRiskLevel('high');
  return Math.round((highRiskStudents.length / studentsData.length) * 100);
};

export const getTeacherStats = () => {
  const teachers = new Map();
  
  studentsData.forEach(student => {
    Object.values(student.subjects).forEach(subject => {
      if (!teachers.has(subject.teacher)) {
        teachers.set(subject.teacher, {
          name: subject.teacher,
          contact: subject.teacherContact,
          students: new Set(),
          highRiskStudents: 0
        });
      }
      
      const teacher = teachers.get(subject.teacher);
      teacher.students.add(student.id);
      
      if (student.riskLevel === 'high') {
        teacher.highRiskStudents++;
      }
    });
  });
  
  return Array.from(teachers.values()).map(teacher => ({
    ...teacher,
    totalStudents: teacher.students.size
  }));
};