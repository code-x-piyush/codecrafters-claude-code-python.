'use client';

import { FormEvent, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { clearSession, getUser, setSession, type User } from '@/lib/auth';

type AuthResponse = { success: boolean; data: { token: string; user: User } };

export default function AuthPanel() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(getUser());

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const path = mode === 'login' ? '/auth/login' : '/auth/register';
      const payload = mode === 'login' ? { email, password } : { name, email, password };
      const res = await apiFetch<AuthResponse>(path, { method: 'POST', body: JSON.stringify(payload) });
      setSession(res.data.token, res.data.user);
      setUser(res.data.user);
      setMessage('Authenticated successfully');
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-200">
        <p>Logged in as {user.name} ({user.isPaid ? 'Paid Plan' : 'Free Plan'})</p>
        <button
          onClick={() => {
            clearSession();
            setUser(null);
          }}
          className="mt-3 rounded-lg border border-white/20 px-3 py-2 hover:bg-white/10"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex gap-2 text-xs">
        <button type="button" onClick={() => setMode('login')} className={`rounded px-2 py-1 ${mode === 'login' ? 'bg-cyan-500 text-black' : 'bg-white/10 text-white'}`}>Login</button>
        <button type="button" onClick={() => setMode('register')} className={`rounded px-2 py-1 ${mode === 'register' ? 'bg-cyan-500 text-black' : 'bg-white/10 text-white'}`}>Register</button>
      </div>
      {mode === 'register' && <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm text-white" required />}
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm text-white" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm text-white" required />
      <button disabled={loading} className="w-full rounded-lg bg-cyan-500 px-3 py-2 text-sm font-semibold text-black disabled:opacity-50">
        {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create account'}
      </button>
      {message && <p className="text-xs text-zinc-300">{message}</p>}
    </form>
  );
}
