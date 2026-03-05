import { motion } from 'framer-motion';
import { Card } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { TeacherNav } from '../components/TeacherNav';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const TeacherAnalyticsPage = () => {
  // Student Performance by Subject
  const subjectPerformanceData = {
    labels: ['Mathematics', 'Logical Reasoning', 'Verbal Ability', 'Data Interpretation'],
    datasets: [
      {
        label: 'Average Score (%)',
        data: [78, 72, 68, 85],
        backgroundColor: 'rgba(155, 89, 182, 0.6)',
        borderColor: 'rgba(155, 89, 182, 1)',
        borderWidth: 2,
      },
    ],
  };

  // Student Progress Over Time
  const progressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Class Average',
        data: [65, 68, 72, 75, 77, 78],
        borderColor: 'rgba(155, 89, 182, 1)',
        backgroundColor: 'rgba(155, 89, 182, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Top Performer',
        data: [85, 87, 89, 91, 92, 94],
        borderColor: 'rgba(46, 204, 113, 1)',
        backgroundColor: 'rgba(46, 204, 113, 0.1)',
        tension: 0.4,
      },
    ],
  };

  // Student Distribution
  const distributionData = {
    labels: ['Excellent (80%+)', 'Good (60-80%)', 'Need Help (<60%)'],
    datasets: [
      {
        data: [45, 78, 33],
        backgroundColor: [
          'rgba(46, 204, 113, 0.8)',
          'rgba(241, 196, 15, 0.8)',
          'rgba(231, 76, 60, 0.8)',
        ],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
      {/* Left Navigation */}
      <TeacherNav />

      {/* Main Content */}
      <div className="flex-1 space-y-4 sm:space-y-6 px-3 sm:px-4 lg:px-0 pb-20 lg:pb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-primary mb-1 sm:mb-2">📈 Student Analytics</h1>
        <p className="text-xs sm:text-sm text-gray-600">Comprehensive insights into student performance</p>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Students</p>
          <p className="text-2xl sm:text-3xl font-bold text-primary">156</p>
          <Badge variant="success" className="mt-2 text-xs">+12 this month</Badge>
        </Card>
        <Card>
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Class Average</p>
          <p className="text-2xl sm:text-3xl font-bold text-secondary">78%</p>
          <Badge variant="success" className="mt-2 text-xs">+5% from last month</Badge>
        </Card>
        <Card>
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Completion Rate</p>
          <p className="text-2xl sm:text-3xl font-bold text-primary">85%</p>
          <Badge variant="success" className="mt-2 text-xs">+3% improvement</Badge>
        </Card>
        <Card>
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Active Students</p>
          <p className="text-2xl sm:text-3xl font-bold text-green-600">142</p>
          <Badge variant="default" className="mt-2 text-xs">91% of total</Badge>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Subject Performance */}
        <Card>
          <h2 className="text-base sm:text-lg lg:text-xl font-bold text-primary mb-3 sm:mb-4">📊 Performance by Subject</h2>
          <div className="h-64 sm:h-72 lg:h-80">
            <Bar data={subjectPerformanceData} options={chartOptions} />
          </div>
        </Card>

        {/* Student Distribution */}
        <Card>
          <h2 className="text-base sm:text-lg lg:text-xl font-bold text-primary mb-3 sm:mb-4">👥 Student Distribution</h2>
          <div className="h-64 sm:h-72 lg:h-80 flex items-center justify-center">
            <Doughnut data={distributionData} options={chartOptions} />
          </div>
        </Card>
      </div>

      {/* Progress Over Time */}
      <Card>
        <h2 className="text-base sm:text-lg lg:text-xl font-bold text-primary mb-3 sm:mb-4">📈 Progress Over Time</h2>
        <div className="h-64 sm:h-72 lg:h-80">
          <Line data={progressData} options={chartOptions} />
        </div>
      </Card>

      {/* Top Performers */}
      <Card>
        <h2 className="text-base sm:text-lg lg:text-xl font-bold text-primary mb-3 sm:mb-4">🏆 Top Performers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {[
            { name: 'Jane Smith', score: 94, tests: 20, improvement: '+8%' },
            { name: 'John Doe', score: 92, tests: 18, improvement: '+6%' },
            { name: 'Sarah Williams', score: 90, tests: 19, improvement: '+7%' },
          ].map((student, index) => (
            <div
              key={index}
              className="p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border-2 border-purple-200"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm sm:text-base font-bold text-primary">{student.name}</p>
                <Badge variant="success" size="sm">{student.score}%</Badge>
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                <p>Tests Completed: {student.tests}</p>
                <p className="text-green-600 font-medium">Improvement: {student.improvement}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Students Needing Attention */}
      <Card>
        <h2 className="text-base sm:text-lg lg:text-xl font-bold text-primary mb-3 sm:mb-4">⚠️ Students Needing Attention</h2>
        <div className="space-y-3">
          {[
            { name: 'David Brown', score: 58, subject: 'Verbal Ability', lastActive: '1 week ago' },
            { name: 'Emily Davis', score: 55, subject: 'Logical Reasoning', lastActive: '3 days ago' },
            { name: 'Michael Wilson', score: 52, subject: 'Mathematics', lastActive: '5 days ago' },
          ].map((student, index) => (
            <div
              key={index}
              className="p-3 sm:p-4 bg-red-50 rounded-lg border border-red-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3"
            >
              <div className="flex-1">
                <p className="text-sm sm:text-base font-bold text-primary">{student.name}</p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Struggling with {student.subject} • Last active: {student.lastActive}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="danger" size="sm">{student.score}%</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
      </div>
    </div>
  );
};

export default TeacherAnalyticsPage;
