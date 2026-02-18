import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Users, ShieldCheck, Trash2, Shield } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface UserProfile {
  user_id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  created_at: string | null;
  is_admin?: boolean;
}

export default function AdminDashboard() {
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      navigate('/dashboard');
      toast.error("Accès refusé : vous n'êtes pas administrateur");
    }
  }, [isAdmin, adminLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    setLoading(true);
    // Fetch all profiles
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Erreur lors du chargement des utilisateurs');
      setLoading(false);
      return;
    }

    // Fetch all admin roles
    const { data: roles } = await supabase
      .from('user_roles')
      .select('user_id, role');

    const adminUserIds = new Set(
      (roles || []).filter(r => r.role === 'admin').map(r => r.user_id)
    );

    setUsers(
      (profiles || []).map(p => ({
        ...p,
        is_admin: adminUserIds.has(p.user_id),
      }))
    );
    setLoading(false);
  };

  const toggleAdmin = async (userId: string, currentlyAdmin: boolean) => {
    if (currentlyAdmin) {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', 'admin');
      if (error) {
        toast.error('Erreur lors de la suppression du rôle admin');
        return;
      }
      toast.success('Rôle admin retiré');
    } else {
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: userId, role: 'admin' });
      if (error) {
        toast.error("Erreur lors de l'ajout du rôle admin");
        return;
      }
      toast.success('Rôle admin ajouté');
    }
    fetchUsers();
  };

  const deleteUser = async (userId: string) => {
    // We can only delete profile, not auth user from client side
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('user_id', userId);
    
    if (error) {
      toast.error("Erreur lors de la suppression de l'utilisateur");
      return;
    }
    toast.success('Profil utilisateur supprimé');
    fetchUsers();
  };

  if (adminLoading || !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold">Administration</h1>
        <p className="text-muted-foreground mt-1">Gérez les utilisateurs et les rôles</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Utilisateurs totaux
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Administrateurs
            </CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.is_admin).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Utilisateurs standard
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => !u.is_admin).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tous les utilisateurs</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground text-center py-8">Chargement...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Inscription</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.user_id}>
                    <TableCell className="font-medium">
                      {user.first_name || user.last_name
                        ? `${user.first_name || ''} ${user.last_name || ''}`.trim()
                        : '—'}
                    </TableCell>
                    <TableCell>{user.email || '—'}</TableCell>
                    <TableCell>
                      {user.created_at
                        ? new Date(user.created_at).toLocaleDateString('fr-FR')
                        : '—'}
                    </TableCell>
                    <TableCell>
                      {user.is_admin ? (
                        <Badge variant="default" className="bg-primary">Admin</Badge>
                      ) : (
                        <Badge variant="secondary">Utilisateur</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleAdmin(user.user_id, !!user.is_admin)}
                      >
                        <Shield size={14} className="mr-1" />
                        {user.is_admin ? 'Retirer admin' : 'Rendre admin'}
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash2 size={14} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Supprimer cet utilisateur ?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Cette action supprimera le profil de l'utilisateur. Cette action est irréversible.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteUser(user.user_id)}>
                              Supprimer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
