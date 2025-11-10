import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, BookOpen, Home } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  showHomeButton?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, title, showHomeButton = true }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/logout-success');
  };

  const handleHome = () => {
    navigate(user?.role === 'admin' ? '/admin' : '/user');
  };

  const isHomePage = location.pathname === '/admin' || location.pathname === '/user';

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Library Management System</h1>
              <p className="text-xs text-muted-foreground">
                {user?.name} ({user?.role === 'admin' ? 'Administrator' : 'User'})
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {showHomeButton && !isHomePage && (
              <Button variant="ghost" size="sm" onClick={handleHome}>
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-foreground">{title}</h2>
        {children}
      </main>
    </div>
  );
};
