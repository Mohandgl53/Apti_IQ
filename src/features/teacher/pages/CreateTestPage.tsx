import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import { Input } from '../../../shared/ui/Input';
import { useToast } from '../../../shared/hooks/useToast';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export const CreateTestPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [testInfo, setTestInfo] = useState({
    title: '',
    subject: '',
    duration: '',
    totalMarks: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    isScheduled: false,
  });
  const [questions, setQuestions] = useState<Question[]>([
    { id: '1', text: '', options: ['', '', '', ''], correctAnswer: 0 },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: Date.now().toString(), text: '', options: ['', '', '', ''], correctAnswer: 0 },
    ]);
  };

  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, [field]: value } : q));
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const newOptions = [...q.options];
        newOptions[optionIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const generateTestCode = (): string => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    
    const randomLetters = (count: number) =>
      Array.from({ length: count }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
    
    const randomNumbers = (count: number) =>
      Array.from({ length: count }, () => numbers[Math.floor(Math.random() * numbers.length)]).join('');
    
    return `${randomLetters(3)}-${randomNumbers(3)}-${randomLetters(3)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate scheduling if enabled
    if (testInfo.isScheduled) {
      if (!testInfo.startDate || !testInfo.startTime || !testInfo.endDate || !testInfo.endTime) {
        toast.error('Please fill in all scheduling fields');
        return;
      }
      
      const startDateTime = new Date(`${testInfo.startDate}T${testInfo.startTime}`);
      const endDateTime = new Date(`${testInfo.endDate}T${testInfo.endTime}`);
      
      if (startDateTime >= endDateTime) {
        toast.error('End date/time must be after start date/time');
        return;
      }
      
      if (startDateTime < new Date()) {
        toast.error('Start date/time cannot be in the past');
        return;
      }
    }
    
    const testCode = generateTestCode();
    
    // Store test in localStorage (in real app, this would be API call)
    const existingTests = JSON.parse(localStorage.getItem('teacherTests') || '[]');
    const newTest = {
      id: Date.now().toString(),
      code: testCode,
      ...testInfo,
      questions,
      createdAt: new Date().toISOString(),
      status: testInfo.isScheduled ? 'scheduled' : 'active',
    };
    existingTests.push(newTest);
    localStorage.setItem('teacherTests', JSON.stringify(existingTests));
    
    toast.success(`Test created! Code: ${testCode}`);
    
    // Show code in alert for easy copying
    setTimeout(() => {
      const scheduleInfo = testInfo.isScheduled 
        ? `\n\n📅 Scheduled: ${testInfo.startDate} ${testInfo.startTime} to ${testInfo.endDate} ${testInfo.endTime}\n\n⏰ Students can only access this test during the scheduled time.`
        : '';
      
      alert(`✅ Test Created Successfully!\n\n📋 Test Code: ${testCode}${scheduleInfo}\n\n👥 Share this code with your students so they can join and take the test.\n\n💡 Students will enter this code on the test page to access your test.`);
      navigate('/teacher/dashboard');
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-primary mb-2">🧪 Create Test for Students</h1>
        <p className="text-gray-600">Design a test and get a shareable code for your students</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Test Info */}
        <Card>
          <h2 className="text-xl font-bold text-primary mb-4">Test Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Test Title"
              placeholder="e.g., Algebra Mid-term Test"
              value={testInfo.title}
              onChange={(e) => setTestInfo({ ...testInfo, title: e.target.value })}
              required
            />
            <Input
              label="Subject"
              placeholder="e.g., Mathematics"
              value={testInfo.subject}
              onChange={(e) => setTestInfo({ ...testInfo, subject: e.target.value })}
              required
            />
            <Input
              label="Duration (minutes)"
              type="number"
              placeholder="e.g., 60"
              value={testInfo.duration}
              onChange={(e) => setTestInfo({ ...testInfo, duration: e.target.value })}
              required
            />
            <Input
              label="Total Marks"
              type="number"
              placeholder="e.g., 100"
              value={testInfo.totalMarks}
              onChange={(e) => setTestInfo({ ...testInfo, totalMarks: e.target.value })}
              required
            />
          </div>
        </Card>

        {/* Scheduling */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <input
              type="checkbox"
              id="schedule-test"
              checked={testInfo.isScheduled}
              onChange={(e) => setTestInfo({ ...testInfo, isScheduled: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300"
            />
            <label htmlFor="schedule-test" className="text-xl font-bold text-primary cursor-pointer">
              📅 Schedule Test (Optional)
            </label>
          </div>
          
          {testInfo.isScheduled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-4"
            >
              <p className="text-sm text-gray-600 mb-4">
                Set a time window when students can access this test. The test will only be available during this period.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={testInfo.startDate}
                    onChange={(e) => setTestInfo({ ...testInfo, startDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    required={testInfo.isScheduled}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={testInfo.startTime}
                    onChange={(e) => setTestInfo({ ...testInfo, startTime: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    required={testInfo.isScheduled}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={testInfo.endDate}
                    onChange={(e) => setTestInfo({ ...testInfo, endDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    required={testInfo.isScheduled}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={testInfo.endTime}
                    onChange={(e) => setTestInfo({ ...testInfo, endTime: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    required={testInfo.isScheduled}
                  />
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-white rounded-lg border border-blue-300">
                <p className="text-sm text-gray-700">
                  💡 <span className="font-medium">Note:</span> Students will only be able to access this test between the scheduled start and end times. Outside this window, the test will be unavailable.
                </p>
              </div>
            </motion.div>
          )}
        </Card>

        {/* Questions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-primary">Questions</h2>
            <Button type="button" variant="secondary" onClick={addQuestion}>
              + Add Question
            </Button>
          </div>

          {questions.map((question, qIndex) => (
            <Card key={question.id}>
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-primary">Question {qIndex + 1}</h3>
                  {questions.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeQuestion(question.id)}
                    >
                      Remove
                    </Button>
                  )}
                </div>

                <textarea
                  placeholder="Enter question text..."
                  value={question.text}
                  onChange={(e) => updateQuestion(question.id, 'text', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  rows={2}
                  required
                />

                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Options:</p>
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-3">
                      <input
                        type="radio"
                        name={`correct-${question.id}`}
                        checked={question.correctAnswer === oIndex}
                        onChange={() => updateQuestion(question.id, 'correctAnswer', oIndex)}
                        className="w-4 h-4"
                      />
                      <Input
                        placeholder={`Option ${oIndex + 1}`}
                        value={option}
                        onChange={(e) => updateOption(question.id, oIndex, e.target.value)}
                        required
                      />
                    </div>
                  ))}
                  <p className="text-xs text-gray-500">Select the correct answer</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Actions */}
        <Card>
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/teacher/dashboard')}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create Test
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default CreateTestPage;
