import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Lightbulb,
  FileText,
  Scale,
  ClipboardList,
  Wallet,
  BookOpen,
  Calendar,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo-dos.png';
import { useState } from 'react';

const navigation = [
  { name: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Mon Projet', href: '/dashboard/project', icon: Lightbulb },
  { name: 'Business Plan', href: '/dashboard/business-plan', icon: FileText },
  { name: 'Statut Juridique', href: '/dashboard/legal-status', icon: Scale },
  { name: 'Démarches', href: '/dashboard/admin-steps', icon: ClipboardList },
  { name: 'Financement', href: '/dashboard/financing', icon: Wallet },
  { name: 'Ressources', href: '/dashboard/resources', icon: BookOpen },
  { name: 'Calendrier', href: '/dashboard/calendar', icon: Calendar },
];

export function DashboardSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 z-40 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        <Link to="/" className={cn("flex items-center", collapsed && "justify-center w-full")}>
          <img
            src={logo}
            alt="DOS"
            className={cn(
              "brightness-0 invert transition-all duration-300",
              collapsed ? "h-8" : "h-10"
            )}
          />
        </Link>
        {!collapsed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(true)}
            className="text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <ChevronLeft size={18} />
          </Button>
        )}
      </div>

      {/* Collapse toggle when collapsed */}
      {collapsed && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(false)}
          className="mx-auto mt-2 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <ChevronRight size={18} />
        </Button>
      )}

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                  title={collapsed ? item.name : undefined}
                >
                  <item.icon size={20} className="shrink-0" />
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.name}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom actions */}
      <div className="p-4 border-t border-sidebar-border space-y-1">
        <Link
          to="/dashboard/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
            collapsed && "justify-center"
          )}
          title={collapsed ? "Paramètres" : undefined}
        >
          <Settings size={20} />
          {!collapsed && <span className="text-sm font-medium">Paramètres</span>}
        </Link>
        <Link
          to="/"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
            collapsed && "justify-center"
          )}
          title={collapsed ? "Déconnexion" : undefined}
        >
          <LogOut size={20} />
          {!collapsed && <span className="text-sm font-medium">Déconnexion</span>}
        </Link>
      </div>
    </aside>
  );
}
