import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import { Input } from '../../../shared/ui/Input';
import { useToast } from '../../../shared/hooks/useToast';

interface TestType {
  id: string;
  name: string;
  icon: string;
  description: string;
  duration: string;
  questions: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const TestSelectionPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [testCode, setTestCode] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);

  const testTypes: TestType[] = [
    {
      id: 'practice',
      name: 'Practice Test',
      icon: '📝',
      description: 'Quick practice with 15 questions',
      duration: '20 minutes',
      questions: '15 questions',
      difficulty: 'Easy',
    },
    {
      id: 'mock',
      name: 'Mock Test',
      icon: '🎯',
      description: 'Full-length test with all subjects',
      duration: '60 minutes',
      questions: '50 questions',
      difficulty: 'Medium',
    },
    {
      id: 'advanced',
      name: 'Advanced Test',
      icon: '🚀',
      description: 'Challenging test for experts',
      duration: '90 minutes',
      questions: '75 questions',
      difficulty: 'Hard',
    },
  ];

  const handleSelectTest = (typeId: string) => {
    setSelectedType(typeId);
    setShowCodeInput(false);
  };

  const handleJoinWithCode = () => {
    if (!testCode.trim()) {
      toast.error('Please enter a test code');
      return;
    }

    // Validate test code format (e.g., ABC-123-XYZ)
    const codePattern = /^[A-Z]{3}-\d{3}-[A-Z]{3}$/;
    if (!codePattern.test(testCode.toUpperCase())) {
      toast.error('Invalid test code format. Use format: ABC-123-XYZ');
      return;
    }

    // Store test code in session storage
    sessionStorage.setItem('testCode', testCode.toUpperCase());
    toast.success('Test code validated! Proceeding to instructions...');
    
    setTimeout(() => {
      navigate('/test/instructions');
    }, 1000);
  };

  const handleProceed = () => {
    if (!selectedType) {
      toast.error('Please select a test type');
      return;
    }

    // Store selected test type
    sessionStorage.setItem('testType', selectedType);
    navigate('/test/instructions');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">
              Select Test Type
            </h1>
            <p className="text-gray-600">
              Choose a test type or join with a code
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            ← Back
          </Button>
        </div>
      </motion.div>

      {/* Join with Code Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200">
          <div className="flex items-center gap-4">
            <span className="text-4xl">🔑</span>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-primary mb-1">
                Join Teacher's Test
              </h2>
              <p className="text-sm text-gray-600">
                Have a test code from your teacher? Enter it here
              </p>
            </div>
            <Button
              variant="secondary"
              onClick={() => setShowCodeInput(!showCodeInput)}
            >
              {showCodeInput ? 'Cancel' : 'Enter Code'}
            </Button>
          </div>

          {showCodeInput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 pt-4 border-t border-purple-200"
            >
              <div className="flex gap-3">
                <Input
                  placeholder="Enter test code (e.g., ABC-123-XYZ)"
                  value={testCode}
                  onChange={(e) => setTestCode(e.target.value.toUpperCase())}
                  className="flex-1"
                />
                <Button variant="primary" onClick={handleJoinWithCode}>
                  Join Test →
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Format: Three letters, three numbers, three letters (e.g., MAT-456-TST)
              </p>
            </motion.div>
          )}
        </Card>
      </motion.div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="text-gray-500 font-medium">OR</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* Test Types */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-primary mb-4">
          Choose a Test Type
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedType === type.id
                    ? 'border-2 border-secondary bg-secondary/5'
                    : 'border border-gray-200'
                }`}
                onClick={() => handleSelectTest(type.id)}
              >
                <div className="text-center">
                  <div className="text-5xl mb-3">{type.icon}</div>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {type.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {type.description}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                      <span className="text-gray-600">⏱️ Duration:</span>
                      <span className="font-medium text-primary">
                        {type.duration}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                      <span className="text-gray-600">📝 Questions:</span>
                      <span className="font-medium text-primary">
                        {type.questions}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                      <span className="text-gray-600">🎚️ Difficulty:</span>
                      <span
                        className={`font-medium ${
                          type.difficulty === 'Easy'
                            ? 'text-green-600'
                            : type.difficulty === 'Medium'
                            ? 'text-orange-600'
                            : 'text-red-600'
                        }`}
                      >
                        {type.difficulty}
                      </span>
                    </div>
                  </div>

                  {selectedType === type.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mt-4"
                    >
                      <div className="w-8 h-8 mx-auto bg-secondary rounded-full flex items-center justify-center">
                        <span className="text-white text-xl">✓</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Proceed Button */}
      {selectedType && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-primary mb-1">Ready to start?</h3>
                <p className="text-sm text-gray-600">
                  You've selected{' '}
                  <span className="font-medium">
                    {testTypes.find((t) => t.id === selectedType)?.name}
                  </span>
                </p>
              </div>
              <Button variant="primary" size="lg" onClick={handleProceed}>
                Continue to Instructions →
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default TestSelectionPage;
