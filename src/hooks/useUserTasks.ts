import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface UserTask {
  id: string;
  user_id: string;
  task_key: string;
  title: string;
  description: string | null;
  category: string;
  status: 'pending' | 'in_progress' | 'completed';
  due_date: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

const DEFAULT_TASKS: Omit<UserTask, 'id' | 'user_id' | 'created_at' | 'updated_at'>[] = [
  {
    task_key: 'complete_project',
    title: 'Compléter mon projet',
    description: 'Finalisez la définition de votre projet entrepreneurial',
    category: 'project',
    status: 'pending',
    due_date: null,
    completed_at: null,
  },
  {
    task_key: 'business_plan',
    title: 'Créer le business plan',
    description: 'Construisez votre business plan complet',
    category: 'business',
    status: 'pending',
    due_date: null,
    completed_at: null,
  },
  {
    task_key: 'choose_legal_status',
    title: 'Choisir le statut juridique',
    description: 'Comparez et sélectionnez le meilleur statut',
    category: 'legal',
    status: 'pending',
    due_date: null,
    completed_at: null,
  },
  {
    task_key: 'market_study',
    title: 'Finaliser l\'étude de marché',
    description: 'Analysez votre marché cible',
    category: 'project',
    status: 'pending',
    due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    completed_at: null,
  },
  {
    task_key: 'register_business',
    title: 'Immatriculer l\'entreprise',
    description: 'Effectuez les démarches d\'immatriculation',
    category: 'admin',
    status: 'pending',
    due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    completed_at: null,
  },
  {
    task_key: 'find_financing',
    title: 'Rechercher des financements',
    description: 'Identifiez les aides et financements disponibles',
    category: 'financing',
    status: 'pending',
    due_date: null,
    completed_at: null,
  },
  {
    task_key: 'prepare_statutes',
    title: 'Rédiger les statuts',
    description: 'Préparez les statuts de votre entreprise',
    category: 'legal',
    status: 'pending',
    due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    completed_at: null,
  },
  {
    task_key: 'open_bank_account',
    title: 'Ouvrir un compte bancaire professionnel',
    description: 'Créez votre compte bancaire entreprise',
    category: 'admin',
    status: 'pending',
    due_date: null,
    completed_at: null,
  },
];

export function useUserTasks() {
  const [tasks, setTasks] = useState<UserTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchAndInitTasks = async () => {
      setLoading(true);
      
      // Fetch existing tasks
      const { data, error } = await supabase
        .from('user_tasks')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching tasks:', error);
        setLoading(false);
        return;
      }

      // If no tasks exist, initialize with default tasks
      if (!data || data.length === 0) {
        const tasksToInsert = DEFAULT_TASKS.map(task => ({
          ...task,
          user_id: userId,
        }));

        const { data: insertedData, error: insertError } = await supabase
          .from('user_tasks')
          .insert(tasksToInsert)
          .select();

        if (insertError) {
          console.error('Error creating default tasks:', insertError);
        } else if (insertedData) {
          setTasks(insertedData as UserTask[]);
        }
      } else {
        setTasks(data as UserTask[]);
      }
      
      setLoading(false);
    };

    fetchAndInitTasks();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('user_tasks_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_tasks',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setTasks(prev => [...prev, payload.new as UserTask]);
          } else if (payload.eventType === 'UPDATE') {
            setTasks(prev => 
              prev.map(task => 
                task.id === (payload.new as UserTask).id 
                  ? payload.new as UserTask 
                  : task
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setTasks(prev => 
              prev.filter(task => task.id !== (payload.old as UserTask).id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const updateTaskStatus = async (taskId: string, status: UserTask['status']) => {
    const updates: Partial<UserTask> = { status };
    
    if (status === 'completed') {
      updates.completed_at = new Date().toISOString();
    } else {
      updates.completed_at = null;
    }

    const { error } = await supabase
      .from('user_tasks')
      .update(updates)
      .eq('id', taskId);

    if (error) {
      console.error('Error updating task:', error);
      toast.error('Erreur lors de la mise à jour de la tâche');
    } else {
      if (status === 'completed') {
        toast.success('Tâche marquée comme terminée !');
      }
    }
  };

  const completeTask = (taskId: string) => updateTaskStatus(taskId, 'completed');
  const startTask = (taskId: string) => updateTaskStatus(taskId, 'in_progress');
  const resetTask = (taskId: string) => updateTaskStatus(taskId, 'pending');

  // Computed stats
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const totalCount = tasks.length;
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  
  const upcomingTasks = tasks
    .filter(t => t.status !== 'completed' && t.due_date)
    .sort((a, b) => new Date(a.due_date!).getTime() - new Date(b.due_date!).getTime())
    .slice(0, 5);

  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const inProgressCount = tasks.filter(t => t.status === 'in_progress').length;

  return {
    tasks,
    loading,
    updateTaskStatus,
    completeTask,
    startTask,
    resetTask,
    completedCount,
    totalCount,
    progressPercentage,
    upcomingTasks,
    pendingCount,
    inProgressCount,
  };
}
