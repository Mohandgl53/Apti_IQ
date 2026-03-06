import { Link, useLocation } from 'react-router-dom';
import { Card } from '../../../shared/ui/Card';

export const DashboardNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Overview', icon: '📊' },
    { path: '/progress', label: 'Progress', icon: '📈' },
    { path: '/analytics', label: 'Analytics', icon: '📊' },
    { path: '/badges', label: 'Badges & Streaks', icon: '🏅' },
    { path: '/tournaments', label: 'Tournaments', icon: '🏆' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Sidebar - Desktop Only */}
      <div className="hidden lg:block lg:sticky lg:top-20 w-64">
        <Card className="p-4 h-full lg:h-auto overflow-y-auto">
          <h3 className="font-bold text-primary mb-4 text-base uppercase tracking-wide">
            Quick Navigation
          </h3>
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base transition-smooth ${
                  isActive(item.path)
                    ? 'bg-secondary text-white font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Tips */}
          <div className="mt-6 p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-700">
              💡 <span className="font-medium">Tip:</span> Maintain your daily streak by practicing regularly!
            </p>
          </div>
        </Card>
      </div>
    </>
  );
};
