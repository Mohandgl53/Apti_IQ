import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import { Input } from '../../../shared/ui/Input';
import { useToast } from '../../../shared/hooks/useToast';

export const CreateLessonPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    chapter: '',
    duration: '',
    difficulty: 'beginner',
    content: '',
    objectives: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Lesson created successfully!');
    setTimeout(() => navigate('/teacher/dashboard'), 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-primary mb-2">📝 Create New Lesson</h1>
        <p className="text-gray-600">Design a new lesson for your students</p>
      </motion.div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div>
            <h2 className="text-xl font-bold text-primary mb-4">Basic Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Lesson Title"
                placeholder="e.g., Introduction to Algebra"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <Input
                label="Subject"
                placeholder="e.g., Mathematics"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />
              <Input
                label="Chapter"
                placeholder="e.g., Linear Equations"
                value={formData.chapter}
                onChange={(e) => setFormData({ ...formData, chapter: e.target.value })}
                required
              />
              <Input
                label="Duration (minutes)"
                type="number"
                placeholder="e.g., 30"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty Level
            </label>
            <div className="flex gap-3">
              {['beginner', 'intermediate', 'advanced'].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFormData({ ...formData, difficulty: level })}
                  className={`px-4 py-2 rounded-lg border-2 transition-smooth capitalize ${
                    formData.difficulty === level
                      ? 'border-secondary bg-secondary/10 text-secondary font-bold'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Learning Objectives */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Learning Objectives
            </label>
            <textarea
              placeholder="What will students learn from this lesson?"
              value={formData.objectives}
              onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              rows={3}
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lesson Content (Markdown supported)
            </label>
            <textarea
              placeholder="Write your lesson content here..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary font-mono"
              rows={12}
              required
            />
            <p className="text-sm text-gray-500 mt-2">
              Tip: Use markdown formatting for better readability
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/teacher/dashboard')}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create Lesson
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateLessonPage;
