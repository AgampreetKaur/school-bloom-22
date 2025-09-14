export interface Student {
  id: string;
  name: string;
  email: string;
  class: string;
  grade: string;
  attendance: number;
  averageMarks: number;
  feesStatus: 'paid' | 'pending' | 'overdue';
  medicalStatus: 'healthy' | 'attention' | 'urgent';
  riskLevel: 'low' | 'medium' | 'high';
  lastActive: string;
  profileImage?: string;
  subjects: {
    name: string;
    marks: number;
    grade: string;
  }[];
  medicalRecords: {
    condition?: string;
    medications?: string[];
    allergies?: string[];
    lastCheckup: string;
  };
  feeDetails: {
    totalAmount: number;
    paidAmount: number;
    dueDate: string;
  };
}

export const studentsData: Student[] = [
  {
    id: '1',
    name: 'Arya Sharma',
    email: 'arya.sharma@student.edu',
    class: '10A',
    grade: '10th',
    attendance: 95,
    averageMarks: 88,
    feesStatus: 'paid',
    medicalStatus: 'healthy',
    riskLevel: 'low',
    lastActive: '2024-01-15',
    subjects: [
      { name: 'Mathematics', marks: 92, grade: 'A' },
      { name: 'Science', marks: 89, grade: 'B+' },
      { name: 'English', marks: 85, grade: 'B+' },
      { name: 'History', marks: 87, grade: 'B+' }
    ],
    medicalRecords: {
      lastCheckup: '2024-01-10',
      allergies: ['None reported']
    },
    feeDetails: {
      totalAmount: 2500,
      paidAmount: 2500,
      dueDate: '2024-02-01'
    }
  },
  {
    id: '2',
    name: 'Rohan Gupta',
    email: 'rohan.gupta@student.edu',
    class: '10A',
    grade: '10th',
    attendance: 78,
    averageMarks: 65,
    feesStatus: 'pending',
    medicalStatus: 'attention',
    riskLevel: 'medium',
    lastActive: '2024-01-12',
    subjects: [
      { name: 'Mathematics', marks: 68, grade: 'C+' },
      { name: 'Science', marks: 72, grade: 'B-' },
      { name: 'English', marks: 60, grade: 'C' },
      { name: 'History', marks: 62, grade: 'C' }
    ],
    medicalRecords: {
      condition: 'Mild asthma',
      medications: ['Inhaler as needed'],
      lastCheckup: '2023-12-15',
      allergies: ['Dust mites']
    },
    feeDetails: {
      totalAmount: 2500,
      paidAmount: 1500,
      dueDate: '2024-01-20'
    }
  },
  {
    id: '3',
    name: 'Priya Reddy',
    email: 'priya.reddy@student.edu',
    class: '10B',
    grade: '10th',
    attendance: 92,
    averageMarks: 94,
    feesStatus: 'paid',
    medicalStatus: 'healthy',
    riskLevel: 'low',
    lastActive: '2024-01-15',
    subjects: [
      { name: 'Mathematics', marks: 96, grade: 'A+' },
      { name: 'Science', marks: 94, grade: 'A' },
      { name: 'English', marks: 92, grade: 'A' },
      { name: 'History', marks: 94, grade: 'A' }
    ],
    medicalRecords: {
      lastCheckup: '2024-01-05',
      allergies: ['Peanuts']
    },
    feeDetails: {
      totalAmount: 2500,
      paidAmount: 2500,
      dueDate: '2024-02-01'
    }
  },
  {
    id: '4',
    name: 'Karan Singh',
    email: 'karan.singh@student.edu',
    class: '10B',
    grade: '10th',
    attendance: 65,
    averageMarks: 58,
    feesStatus: 'overdue',
    medicalStatus: 'urgent',
    riskLevel: 'high',
    lastActive: '2024-01-08',
    subjects: [
      { name: 'Mathematics', marks: 55, grade: 'D+' },
      { name: 'Science', marks: 62, grade: 'C-' },
      { name: 'English', marks: 58, grade: 'D+' },
      { name: 'History', marks: 56, grade: 'D+' }
    ],
    medicalRecords: {
      condition: 'Anxiety disorder',
      medications: ['Counseling sessions'],
      lastCheckup: '2023-11-20',
      allergies: ['None reported']
    },
    feeDetails: {
      totalAmount: 2500,
      paidAmount: 800,
      dueDate: '2023-12-15'
    }
  },
  {
    id: '5',
    name: 'Kavya Iyer',
    email: 'kavya.iyer@student.edu',
    class: '9A',
    grade: '9th',
    attendance: 89,
    averageMarks: 82,
    feesStatus: 'paid',
    medicalStatus: 'healthy',
    riskLevel: 'low',
    lastActive: '2024-01-14',
    subjects: [
      { name: 'Mathematics', marks: 85, grade: 'B+' },
      { name: 'Science', marks: 80, grade: 'B' },
      { name: 'English', marks: 84, grade: 'B+' },
      { name: 'History', marks: 79, grade: 'B' }
    ],
    medicalRecords: {
      lastCheckup: '2024-01-08',
      allergies: ['Lactose intolerant']
    },
    feeDetails: {
      totalAmount: 2300,
      paidAmount: 2300,
      dueDate: '2024-02-01'
    }
  },
  {
    id: '6',
    name: 'Arjun Nair',
    email: 'arjun.nair@student.edu',
    class: '9A',
    grade: '9th',
    attendance: 72,
    averageMarks: 69,
    feesStatus: 'pending',
    medicalStatus: 'attention',
    riskLevel: 'medium',
    lastActive: '2024-01-11',
    subjects: [
      { name: 'Mathematics', marks: 65, grade: 'C+' },
      { name: 'Science', marks: 74, grade: 'B-' },
      { name: 'English', marks: 68, grade: 'C+' },
      { name: 'History', marks: 70, grade: 'B-' }
    ],
    medicalRecords: {
      condition: 'ADHD',
      medications: ['Ritalin'],
      lastCheckup: '2023-12-10',
      allergies: ['Food coloring']
    },
    feeDetails: {
      totalAmount: 2300,
      paidAmount: 1200,
      dueDate: '2024-01-25'
    }
  },
  {
    id: '7',
    name: 'Meera Joshi',
    email: 'meera.joshi@student.edu',
    class: '11A',
    grade: '11th',
    attendance: 97,
    averageMarks: 91,
    feesStatus: 'paid',
    medicalStatus: 'healthy',
    riskLevel: 'low',
    lastActive: '2024-01-15',
    subjects: [
      { name: 'Mathematics', marks: 93, grade: 'A' },
      { name: 'Physics', marks: 90, grade: 'A-' },
      { name: 'Chemistry', marks: 92, grade: 'A' },
      { name: 'Biology', marks: 89, grade: 'B+' }
    ],
    medicalRecords: {
      lastCheckup: '2024-01-12',
      allergies: ['None reported']
    },
    feeDetails: {
      totalAmount: 2800,
      paidAmount: 2800,
      dueDate: '2024-02-01'
    }
  },
  {
    id: '8',
    name: 'Vikram Kapoor',
    email: 'vikram.kapoor@student.edu',
    class: '11B',
    grade: '11th',
    attendance: 58,
    averageMarks: 52,
    feesStatus: 'overdue',
    medicalStatus: 'urgent',
    riskLevel: 'high',
    lastActive: '2024-01-05',
    subjects: [
      { name: 'Mathematics', marks: 48, grade: 'F' },
      { name: 'Physics', marks: 55, grade: 'D+' },
      { name: 'Chemistry', marks: 50, grade: 'D' },
      { name: 'Biology', marks: 56, grade: 'D+' }
    ],
    medicalRecords: {
      condition: 'Depression',
      medications: ['Therapy sessions'],
      lastCheckup: '2023-10-15',
      allergies: ['None reported']
    },
    feeDetails: {
      totalAmount: 2800,
      paidAmount: 500,
      dueDate: '2023-11-30'
    }
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