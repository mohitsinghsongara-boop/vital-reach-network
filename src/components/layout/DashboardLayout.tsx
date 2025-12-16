import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Droplet, LogOut, User, Settings, Bell, Home, Search, MapPin, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, profile, donorProfile, role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const displayName = profile?.first_name 
    ? `${profile.first_name}${profile.last_name ? ' ' + profile.last_name : ''}`
    : user?.email || 'User';

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getNavLinks = () => {
    if (!role) return [];

    const baseLinks = [
      { href: '/dashboard', label: 'Dashboard', icon: Home },
      { href: '/search', label: 'Search', icon: Search },
      { href: '/messages', label: 'Messages', icon: MessageSquare },
    ];

    if (role === 'donor') {
      return [
        ...baseLinks,
        { href: '/emergency', label: 'Emergency', icon: Bell },
      ];
    }

    if (role === 'receiver') {
      return [
        ...baseLinks,
        { href: '/emergency', label: 'Emergency', icon: Bell },
      ];
    }

    if (role === 'blood_bank') {
      return [
        ...baseLinks,
        { href: '/inventory', label: 'Inventory', icon: MapPin },
        { href: '/analytics', label: 'Analytics', icon: Settings },
      ];
    }

    if (role === 'admin') {
      return [
        ...baseLinks,
        { href: '/admin/users', label: 'Users', icon: User },
        { href: '/admin/analytics', label: 'Analytics', icon: Settings },
      ];
    }

    return baseLinks;
  };

  const isAvailable = donorProfile?.availability === 'available';

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Droplet className="w-6 h-6 text-primary fill-primary" />
            <span className="text-lg font-bold">
              Red<span className="text-primary">Drop</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {getNavLinks().map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href || location.pathname.startsWith(link.href + '/');
              return (
                <Link key={link.href} to={link.href}>
                  <Button
                    variant={isActive ? 'secondary' : 'ghost'}
                    size="sm"
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {role === 'donor' && (
              <Badge variant={isAvailable ? 'default' : 'secondary'} className="hidden md:flex">
                {isAvailable ? 'Available' : 'Unavailable'}
              </Badge>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{displayName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    <Badge variant="outline" className="mt-1 w-fit">
                      {role?.replace('_', ' ')}
                    </Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;
