import { useState, useEffect } from 'react';
import type { User } from '../types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check
    const user: User = {
      id: '1',
      name: 'John Doe',
      role: 'auditor',
      email: 'john@example.com'
    };
    setUser(user);
    setLoading(false);
  }, []);

  const logout = () => setUser(null);

  return { user, loading, logout };
}