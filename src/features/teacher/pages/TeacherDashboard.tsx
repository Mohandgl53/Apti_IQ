import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Card } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import { StatCard } from '../../../shared/ui/StatCard';
import { Badge } from '../../../shared/ui/Badge';
import { useAuthStore } from '../../auth/store/authStore';
import { useToast } from '../../../shared/hooks/useToast';
import { TeacherNav } from '../components/TeacherNav';

export const TeacherDashboard = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const toast = useToast();
  const [createdTests, setCreatedTests] = useState<any[]>([]);

  // Load created tests from localStorage
  useState(() => {
    const tests = JSON.parse(localStorage.getItem('teacherTests') || '[]');
    setCreatedTests(tests.slice(-5)); // Show last 5 tests
  });

  const copyTestCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Test code copied to clipboard!');
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'test_created': return '✅';
      case 'test_updated': return '✏️';
      case 'class_created': return '📚';
      case 'grading': return '📝';
      case 'shared': return '📤';
      default: return '📌';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'test_created': return 'bg-green-50 border-green-200';
      case 'test_updated': return 'bg-blue-50 border-blue-200';
      case 'class_created': return 'bg-purple-50 border-purple-200';
      case 'grading': return 'bg-yellow-50 border-yellow-200';
      case 'shared': return 'bg-orange-50 border-orange-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  // Mock teacher stats - replace with real API call
  const teacherStats = {
    totalStudents: 156,
    activeTests: 12,
    totalTests: 45,
    avgStudentScore: 78,
    teacherActivity: [
      { id: 1, action: 'Created "Algebra Basics Test"', type: 'test_created', time: '2 hours ago', details: '30 questions, 45 min' },
      { id: 2, action: 'Graded assignments for Mathematics - Section A', type: 'grading', time: '5 hours ago', details: '25 students' },
      { id: 3, action: 'Created new class "Data Interpretation - Section C"', type: 'class_created', time: '1 day ago', details: 'Class code: DI-C-2024' },
      { id: 4, action: 'Updated "Logical Reasoning Mock Test"', type: 'test_updated', time: '2 days ago', details: 'Modified 5 questions' },
      { id: 5, action: 'Shared test code with students', type: 'shared', time: '3 days ago', details: 'Test: Quantitative Aptitude' },
    ],
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
      {/* Left Navigation */}
      <TeacherNav />

      {/* Main Content */}
      <div className="flex-1 space-y-4 sm:space-y-6 lg:space-y-8 px-3 sm:px-4 lg:px-0 pb-20 lg:pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-primary mb-1 sm:mb-2">
              👨‍🏫 Teacher Dashboard
            </h1>
            <p className="text-sm sm:text-base text-gray-600">Welcome back, {user?.name}!</p>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <Button variant="outline" size="sm" onClick={() => navigate('/teacher/test-results')}>
              Test Results
            </Button>
            <Button variant="primary" size="sm" onClick={() => navigate('/teacher/create-test')}>
              + Create Test
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatCard
            title="Total Students"
            value={teacherStats.totalStudents}
            icon="👥"
            trend="up"
            trendValue="+12"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatCard
            title="Active Tests"
            value={teacherStats.activeTests}
            icon="🧪"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StatCard
            title="Total Tests Created"
            value={teacherStats.totalTests}
            icon="📝"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <StatCard
            title="Avg Student Score"
            value={`${teacherStats.avgStudentScore}%`}
            icon="📊"
            trend="up"
            trendValue="+5%"
          />
        </motion.div>
      </div>

      {/* Created Tests & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Created Tests */}
        {createdTests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-200">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <h2 className="text-base sm:text-lg lg:text-xl font-bold text-primary">🧪 Your Created Tests</h2>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">Share these codes with your students</p>
                </div>
                <Badge variant="success">{createdTests.length} Active</Badge>
              </div>
              <div className="space-y-3">
                {createdTests.map((test) => (
                  <div
                    key={test.id}
                    className="p-4 bg-white rounded-lg border border-green-200 hover:shadow-md transition-smooth"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-bold text-primary">{test.title}</p>
                        <p className="text-sm text-gray-600">{test.subject}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="primary">{test.questions.length} Qs</Badge>
                        {test.status === 'scheduled' && (
                          <Badge variant="warning">Scheduled</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
                      <span>⏱️ {test.duration} min</span>
                      <span>📊 {test.totalMarks} marks</span>
                    </div>
                    {test.isScheduled && test.startDate && (
                      <div className="mt-2 text-xs text-blue-600">
                        📅 {new Date(test.startDate).toLocaleDateString()} {test.startTime} - {new Date(test.endDate).toLocaleDateString()} {test.endTime}
                      </div>
                    )}
                    <div className="mt-3 p-2 bg-gray-50 rounded border border-dashed border-gray-300 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Test Code:</p>
                        <p className="font-mono font-bold text-primary">{test.code}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyTestCode(test.code)}
                      >
                        📋 Copy
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="primary"
                className="w-full mt-4"
                onClick={() => navigate('/teacher/create-test')}
              >
                + Create New Test
              </Button>
            </Card>
          </motion.div>
        )}

        {/* Teacher Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: createdTests.length > 0 ? 0.7 : 0.6 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-primary">📋 My Recent Activity</h2>
            </div>
            <div className="space-y-3">
              {teacherStats.teacherActivity.map((activity) => (
                <div
                  key={activity.id}
                  className={`flex items-start gap-3 p-3 sm:p-4 rounded-lg border transition-smooth hover:shadow-md ${getActivityColor(activity.type)}`}
                >
                  <span className="text-2xl flex-shrink-0">{getActivityIcon(activity.type)}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base font-medium text-primary">{activity.action}</p>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">{activity.details}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
