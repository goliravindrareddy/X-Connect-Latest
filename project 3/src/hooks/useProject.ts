import { useState, useEffect } from 'react';
import type { ProjectScope } from '../types/project';

export function useProject(projectId?: string) {
  const [project, setProject] = useState<ProjectScope | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!projectId) {
      setLoading(false);
      return;
    }

    // In a real app, this would fetch from an API
    const fetchProject = async () => {
      try {
        // Simulated API call
        setProject(null); // Replace with actual API call
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch project'));
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  return { project, loading, error };
}