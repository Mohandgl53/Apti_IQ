import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import { Badge } from '../../../shared/ui/Badge';
import { Input } from '../../../shared/ui/Input';
import { TeacherNav } from '../components/TeacherNav';

interface StudentActivity {
  id: string;
  type: 'test_completed' | 'test_started' | 'joined_class' | 'assignment_submitted';
  description: string;
  timestamp: string;
  score?: number;
}

interface Student {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  testsCompleted: number;
  avgScore: number;
  lastActive: string;
  status: 'active' | 'inactive';
  recentActivities: StudentActivity[];
}

interface Class {
  id: string;
  name: string;
  subject: string;
  code: string;
  studentCount: number;
  students: Student[];
}

const mockClasses: Class[] = [
  {
    id: '1',
    name: 'Mathematics - Section A',
    subject: 'Mathematics',
    code: 'MATH-A-2024',
    studentCount: 3,
    students: [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        rollNumber: 'CS001',
        testsCompleted: 15,
        avgScore: 85,
        lastActive: '2 hours ago',
        status: 'active',
        recentActivities: [
          { id: '1', type: 'test_completed', description: 'Completed Algebra Test', timestamp: '2 hours ago', score: 88 },
          { id: '2', type: 'test_started', description: 'Started Geometry Test', timestamp: '1 day ago' },
          { id: '3', type: 'assignment_submitted', description: 'Submitted Homework #5', timestamp: '2 days ago' },
        ]
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        rollNumber: 'CS002',
        testsCompleted: 20,
        avgScore: 92,
        lastActive: '1 day ago',
        status: 'active',
        recentActivities: [
          { id: '1', type: 'test_completed', description: 'Completed Calculus Test', timestamp: '1 day ago', score: 95 },
          { id: '2', type: 'test_completed', description: 'Completed Trigonometry Test', timestamp: '3 days ago', score: 90 },
        ]
      },
      {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        rollNumber: 'CS003',
        testsCompleted: 12,
        avgScore: 78,
        lastActive: '3 hours ago',
        status: 'active',
        recentActivities: [
          { id: '1', type: 'test_completed', description: 'Completed Statistics Test', timestamp: '3 hours ago', score: 75 },
          { id: '2', type: 'assignment_submitted', description: 'Submitted Project Report', timestamp: '1 day ago' },
        ]
      },
    ]
  },
  {
    id: '2',
    name: 'Logical Reasoning - Section B',
    subject: 'Logical Reasoning',
    code: 'LR-B-2024',
    studentCount: 2,
    students: [
      {
        id: '4',
        name: 'Sarah Williams',
        email: 'sarah@example.com',
        rollNumber: 'CS004',
        testsCompleted: 18,
        avgScore: 88,
        lastActive: '5 hours ago',
        status: 'active',
        recentActivities: [
          { id: '1', type: 'test_completed', description: 'Completed Puzzles Test', timestamp: '5 hours ago', score: 92 },
          { id: '2', type: 'test_completed', description: 'Completed Syllogisms Test', timestamp: '2 days ago', score: 85 },
        ]
      },
      {
        id: '5',
        name: 'David Brown',
        email: 'david@example.com',
        rollNumber: 'CS005',
        testsCompleted: 10,
        avgScore: 72,
        lastActive: '1 week ago',
        status: 'inactive',
        recentActivities: [
          { id: '1', type: 'test_completed', description: 'Completed Coding-Decoding Test', timestamp: '1 week ago', score: 70 },
          { id: '2', type: 'joined_class', description: 'Joined the class', timestamp: '2 weeks ago' },
        ]
      },
    ]
  },
  {
    id: '3',
    name: 'Data Interpretation - Section C',
    subject: 'Data Interpretation',
    code: 'DI-C-2024',
    studentCount: 2,
    students: [
      {
        id: '6',
        name: 'Emily Davis',
        email: 'emily@example.com',
        rollNumber: 'CS006',
        testsCompleted: 14,
        avgScore: 90,
        lastActive: '4 hours ago',
        status: 'active',
        recentActivities: [
          { id: '1', type: 'test_completed', description: 'Completed Bar Charts Test', timestamp: '4 hours ago', score: 93 },
          { id: '2', type: 'test_completed', description: 'Completed Tables Test', timestamp: '1 day ago', score: 88 },
        ]
      },
      {
        id: '7',
        name: 'Robert Wilson',
        email: 'robert@example.com',
        rollNumber: 'CS007',
        testsCompleted: 16,
        avgScore: 82,
        lastActive: '6 hours ago',
        status: 'active',
        recentActivities: [
          { id: '1', type: 'test_completed', description: 'Completed Pie Charts Test', timestamp: '6 hours ago', score: 80 },
          { id: '2', type: 'assignment_submitted', description: 'Submitted Case Study', timestamp: '2 days ago' },
        ]
      },
    ]
  },
];

export const StudentsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null);

  const totalStudents = mockClasses.reduce((acc, cls) => acc + cls.studentCount, 0);
  const activeStudents = mockClasses.reduce((acc, cls) => 
    acc + cls.students.filter(s => s.status === 'active').length, 0
  );
  const allStudents = mockClasses.flatMap(cls => cls.students);
  const avgScore = Math.round(allStudents.reduce((acc, s) => acc + s.avgScore, 0) / allStudents.length);
  const totalTests = allStudents.reduce((acc, s) => acc + s.testsCompleted, 0);

  const filteredClasses = selectedClass === 'all' 
    ? mockClasses 
    : mockClasses.filter(cls => cls.id === selectedClass);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'test_completed': return '✅';
      case 'test_started': return '📝';
      case 'joined_class': return '👋';
      case 'assignment_submitted': return '📤';
      default: return '📌';
    }
  };

  return (
    <div className="flex gap-8">
      {/* Left Navigation */}
      <TeacherNav />

      {/* Main Content */}
      <div className="flex-1 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-primary mb-2">👥 My Students</h1>
        <p className="text-sm sm:text-base text-gray-600">Manage students by class and track their activities</p>
      </motion.div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by name, email, or roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            <Button
              variant={selectedClass === 'all' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedClass('all')}
            >
              All Classes
            </Button>
            {mockClasses.map((cls) => (
              <Button
                key={cls.id}
                variant={selectedClass === cls.id ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedClass(cls.id)}
              >
                {cls.subject}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Students</p>
          <p className="text-2xl sm:text-3xl font-bold text-primary">{totalStudents}</p>
        </Card>
        <Card>
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Active Students</p>
          <p className="text-2xl sm:text-3xl font-bold text-green-600">{activeStudents}</p>
        </Card>
        <Card>
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Avg Score</p>
          <p className="text-2xl sm:text-3xl font-bold text-secondary">{avgScore}%</p>
        </Card>
        <Card>
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Tests</p>
          <p className="text-2xl sm:text-3xl font-bold text-primary">{totalTests}</p>
        </Card>
      </div>

      {/* Students by Class */}
      <div className="space-y-4 sm:space-y-6">
        {filteredClasses.map((classItem, classIndex) => (
          <motion.div
            key={classItem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: classIndex * 0.1 }}
          >
            <Card>
              {/* Class Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-gray-200">
                <div>
                  <h2 className="text-base sm:text-lg lg:text-xl font-bold text-primary">{classItem.name}</h2>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <Badge variant="secondary" size="sm">📚 {classItem.subject}</Badge>
                    <Badge variant="primary" size="sm">Code: {classItem.code}</Badge>
                    <span className="text-xs sm:text-sm text-gray-600">{classItem.studentCount} students</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Class Details
                </Button>
              </div>

              {/* Students in Class */}
              <div className="space-y-3">
                {classItem.students
                  .filter(student => 
                    searchQuery === '' ||
                    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((student, studentIndex) => (
                    <motion.div
                      key={student.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: studentIndex * 0.05 }}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all"
                    >
                      {/* Student Summary */}
                      <div className="p-3 sm:p-4 bg-gray-50">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                              <h3 className="text-sm sm:text-base font-bold text-primary">{student.name}</h3>
                              <Badge variant={student.status === 'active' ? 'success' : 'default'} size="sm">
                                {student.status}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-600">
                              <span>📧 {student.email}</span>
                              <span>•</span>
                              <span>🎓 {student.rollNumber}</span>
                              <span>•</span>
                              <span>🕐 {student.lastActive}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="grid grid-cols-2 gap-2 sm:gap-3 text-center">
                              <div className="p-2 bg-white rounded">
                                <p className="text-base sm:text-lg font-bold text-primary">{student.testsCompleted}</p>
                                <p className="text-xs text-gray-600">Tests</p>
                              </div>
                              <div className="p-2 bg-white rounded">
                                <Badge variant={student.avgScore >= 80 ? 'success' : student.avgScore >= 60 ? 'warning' : 'danger'}>
                                  {student.avgScore}%
                                </Badge>
                                <p className="text-xs text-gray-600 mt-1">Avg</p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setExpandedStudent(expandedStudent === student.id ? null : student.id)}
                            >
                              {expandedStudent === student.id ? '▲ Hide' : '▼ Activities'}
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Student Activities (Expandable) */}
                      {expandedStudent === student.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-3 sm:p-4 bg-white border-t border-gray-200"
                        >
                          <h4 className="text-sm font-bold text-primary mb-3">📋 Recent Activities</h4>
                          {student.recentActivities.length > 0 ? (
                            <div className="space-y-2">
                              {student.recentActivities.map((activity) => (
                                <div
                                  key={activity.id}
                                  className="flex items-start gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg"
                                >
                                  <span className="text-xl sm:text-2xl flex-shrink-0">{getActivityIcon(activity.type)}</span>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs sm:text-sm font-medium text-primary">
                                      {activity.description}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                                  </div>
                                  {activity.score && (
                                    <Badge 
                                      variant={activity.score >= 80 ? 'success' : activity.score >= 60 ? 'warning' : 'danger'}
                                      size="sm"
                                    >
                                      {activity.score}%
                                    </Badge>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs sm:text-sm text-gray-500 text-center py-4">No recent activities</p>
                          )}
                          
                          <div className="mt-4 pt-3 border-t border-gray-200 flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              View Full History
                            </Button>
                            <Button variant="primary" size="sm" className="flex-1">
                              Send Message
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default StudentsPage;
