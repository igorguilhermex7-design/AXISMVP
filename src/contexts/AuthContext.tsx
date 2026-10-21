import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, MockSession, MockUser } from '../lib/supabase';

interface AuthContextType {
  session: MockSession | null;
  user: MockUser | null;
  role: 'admin' | 'user' | null;
  signOut: () => Promise<void>;
  loginAsDemo: (role: 'admin' | 'user') => Promise<void>;
  switchRole: () => Promise<void>;
  isDemoMode: boolean;
}

const AuthContext = createContext<AuthContextType>({ 
  session: null, 
  user: null, 
  role: null,
  signOut: async () => {},
  loginAsDemo: async () => {},
  switchRole: async () => {},
  isDemoMode: true
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<MockSession | null>(null);
  const [user, setUser] = useState<MockUser | null>(null);
  const [role, setRole] = useState<'admin' | 'user' | null>(null);
  const [loading, setLoading] = useState(true);

  const syncUserState = async (currentSession: MockSession | null) => {
    setSession(currentSession);
    const currentUser = currentSession?.user ?? null;
    setUser(currentUser);

    if (currentUser) {
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', currentUser.id)
        .single();
      
      const userRole = (data?.role as 'admin' | 'user') || currentUser.role || 'user';
      setRole(userRole);
    } else {
      setRole(null);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      syncUserState(session).finally(() => setLoading(false));
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      syncUserState(newSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const loginAsDemo = async (targetRole: 'admin' | 'user') => {
    const email = targetRole === 'admin' ? 'admin@axiscondo.com.br' : 'morador@axiscondo.com.br';
    await supabase.auth.signInWithPassword({ email });
  };

  const switchRole = async () => {
    const nextRole = role === 'admin' ? 'user' : 'admin';
    await loginAsDemo(nextRole);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050713] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-[#2867F5] text-white flex items-center justify-center text-2xl font-bold shadow-lg animate-pulse">
            A
          </div>
          <span className="text-[#F3F5FC] text-sm font-medium tracking-wide">Carregando Axis Condo...</span>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ session, user, role, signOut, loginAsDemo, switchRole, isDemoMode: true }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
