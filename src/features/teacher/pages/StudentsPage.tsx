import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import { Badge } from '../../../shared/ui/Badge';
import { Input } from '../../../shared/ui/Input';
import { TeacherNav } from '../components/TeacherNav';

interface Student {
  id: string;
  name: string;
  email: string;
  college: string;
  testsCompleted: number;
  avgScore: number;
  lastActive: string;
  status: 'active' | 'inactive';
}

const mockStudents: Student[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', college: 'MIT', testsCompleted: 15, avgScore: 85, lastActive: '2 hours ago', status: 'active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', college: 'Stanford', testsCompleted: 20, avgScore: 92, lastActive: '1 day ago', status: 'active' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', college: 'Harvard', testsCompleted: 12, avgScore: 78, lastActive: '3 hours ago', status: 'active' },
  { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', college: 'MIT', testsCompleted: 18, avgScore: 88, lastActive: '5 hours ago', status: 'active' },
  { id: '5', name: 'David Brown', email: 'david@example.com', college: 'Stanford', testsCompleted: 10, avgScore: 72, lastActive: '1 week ago', status: 'inactive' },
];

export const StudentsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

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
        <h1 className="text-4xl font-bold text-primary mb-2">👥 My Students</h1>
        <p className="text-gray-600">Manage and track your students' progress</p>
      </motion.div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === 'all' ? 'primary' : 'outline'}
              onClick={() => setFilterStatus('all')}
            >
              All
            </Button>
            <Button
              variant={filterStatus === 'active' ? 'primary' : 'outline'}
              onClick={() => setFilterStatus('active')}
            >
              Active
            </Button>
            <Button
              variant={filterStatus === 'inactive' ? 'primary' : 'outline'}
              onClick={() => setFilterStatus('inactive')}
            >
              Inactive
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <p className="text-sm text-gray-600 mb-1">Total Students</p>
          <p className="text-3xl font-bold text-primary">{mockStudents.length}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">Active Students</p>
          <p className="text-3xl font-bold text-green-600">
            {mockStudents.filter(s => s.status === 'active').length}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">Avg Score</p>
          <p className="text-3xl font-bold text-secondary">
            {Math.round(mockStudents.reduce((acc, s) => acc + s.avgScore, 0) / mockStudents.length)}%
          </p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">Total Tests</p>
          <p className="text-3xl font-bold text-primary">
            {mockStudents.reduce((acc, s) => acc + s.testsCompleted, 0)}
          </p>
        </Card>
      </div>

      {/* Students Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-bold text-primary">Student</th>
                <th className="text-left py-3 px-4 font-bold text-primary">College</th>
                <th className="text-center py-3 px-4 font-bold text-primary">Tests</th>
                <th className="text-center py-3 px-4 font-bold text-primary">Avg Score</th>
                <th className="text-center py-3 px-4 font-bold text-primary">Last Active</th>
                <th className="text-center py-3 px-4 font-bold text-primary">Status</th>
                <th className="text-center py-3 px-4 font-bold text-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-bold text-primary">{student.name}</p>
                      <p className="text-sm text-gray-600">{student.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{student.college}</td>
                  <td className="py-4 px-4 text-center font-medium">{student.testsCompleted}</td>
                  <td className="py-4 px-4 text-center">
                    <Badge variant={student.avgScore >= 80 ? 'success' : student.avgScore >= 60 ? 'warning' : 'danger'}>
                      {student.avgScore}%
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-center text-sm text-gray-600">{student.lastActive}</td>
                  <td className="py-4 px-4 text-center">
                    <Badge variant={student.status === 'active' ? 'success' : 'default'}>
                      {student.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No students found</p>
          </div>
        )}
      </Card>
      </div>
    </div>
  );
};

export default StudentsPage;
