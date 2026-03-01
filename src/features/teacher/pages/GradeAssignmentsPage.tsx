import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import { Badge } from '../../../shared/ui/Badge';
import { useToast } from '../../../shared/hooks/useToast';

interface Assignment {
  id: string;
  student: string;
  title: string;
  submittedAt: string;
  status: 'pending' | 'graded';
  score?: number;
  maxScore: number;
}

const mockAssignments: Assignment[] = [
  { id: '1', student: 'John Doe', title: 'Algebra Assignment 1', submittedAt: '2 hours ago', status: 'pending', maxScore: 100 },
  { id: '2', student: 'Jane Smith', title: 'Geometry Quiz', submittedAt: '1 day ago', status: 'graded', score: 92, maxScore: 100 },
  { id: '3', student: 'Mike Johnson', title: 'Calculus Problem Set', submittedAt: '3 hours ago', status: 'pending', maxScore: 50 },
  { id: '4', student: 'Sarah Williams', title: 'Trigonometry Test', submittedAt: '5 hours ago', status: 'pending', maxScore: 100 },
  { id: '5', student: 'David Brown', title: 'Statistics Assignment', submittedAt: '2 days ago', status: 'graded', score: 78, maxScore: 100 },
];

export const GradeAssignmentsPage = () => {
  const toast = useToast();
  const [assignments, setAssignments] = useState(mockAssignments);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [gradeInput, setGradeInput] = useState('');
  const [feedback, setFeedback] = useState('');

  const pendingCount = assignments.filter(a => a.status === 'pending').length;

  const handleGrade = () => {
    if (!selectedAssignment || !gradeInput) return;

    const score = parseInt(gradeInput);
    if (score < 0 || score > selectedAssignment.maxScore) {
      toast.error(`Score must be between 0 and ${selectedAssignment.maxScore}`);
      return;
    }

    setAssignments(assignments.map(a =>
      a.id === selectedAssignment.id
        ? { ...a, status: 'graded' as const, score }
        : a
    ));

    toast.success('Assignment graded successfully!');
    setSelectedAssignment(null);
    setGradeInput('');
    setFeedback('');
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-primary mb-2">✅ Grade Assignments</h1>
        <p className="text-gray-600">Review and grade student submissions</p>
      </motion.div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <p className="text-sm text-gray-600 mb-1">Total Assignments</p>
          <p className="text-3xl font-bold text-primary">{assignments.length}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">Pending</p>
          <p className="text-3xl font-bold text-orange-600">{pendingCount}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">Graded</p>
          <p className="text-3xl font-bold text-green-600">
            {assignments.length - pendingCount}
          </p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Assignments List */}
        <Card>
          <h2 className="text-xl font-bold text-primary mb-4">Submissions</h2>
          <div className="space-y-3">
            {assignments.map((assignment, index) => (
              <motion.div
                key={assignment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedAssignment(assignment)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-smooth ${
                  selectedAssignment?.id === assignment.id
                    ? 'border-secondary bg-secondary/10'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-bold text-primary">{assignment.student}</p>
                    <p className="text-sm text-gray-700">{assignment.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{assignment.submittedAt}</p>
                  </div>
                  <Badge variant={assignment.status === 'graded' ? 'success' : 'warning'}>
                    {assignment.status === 'graded' ? `${assignment.score}/${assignment.maxScore}` : 'Pending'}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Grading Panel */}
        <Card>
          {selectedAssignment ? (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-primary mb-2">Grade Assignment</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-bold text-primary">{selectedAssignment.student}</p>
                  <p className="text-sm text-gray-700">{selectedAssignment.title}</p>
                  <p className="text-xs text-gray-500 mt-1">Submitted {selectedAssignment.submittedAt}</p>
                </div>
              </div>

              {selectedAssignment.status === 'graded' ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Current Grade</p>
                  <p className="text-3xl font-bold text-green-600">
                    {selectedAssignment.score}/{selectedAssignment.maxScore}
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Score (out of {selectedAssignment.maxScore})
                    </label>
                    <input
                      type="number"
                      min="0"
                      max={selectedAssignment.maxScore}
                      value={gradeInput}
                      onChange={(e) => setGradeInput(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                      placeholder="Enter score"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Feedback (Optional)
                    </label>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                      rows={4}
                      placeholder="Provide feedback to the student..."
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      💡 Tip: Provide constructive feedback to help students improve
                    </p>
                  </div>

                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={handleGrade}
                    disabled={!gradeInput}
                  >
                    Submit Grade
                  </Button>
                </>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-4xl mb-4">📝</p>
              <p className="text-gray-600">Select an assignment to grade</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default GradeAssignmentsPage;
