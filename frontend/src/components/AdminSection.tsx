'use client';

import { useState } from 'react';
import { apiFetch } from '@/lib/api';

type AnyData = { success: boolean; data: unknown[] };

export default function AdminSection() {
  const [users, setUsers] = useState(0);
  const [usage, setUsage] = useState(0);
  const [messages, setMessages] = useState(0);
  const [error, setError] = useState('');

  const load = async () => {
    setError('');
    try {
      const [u, us, m] = await Promise.all([
        apiFetch<AnyData>('/admin/users'),
        apiFetch<AnyData>('/admin/usage'),
        apiFetch<AnyData>('/admin/messages'),
      ]);
      setUsers(u.data.length);
      setUsage(us.data.length);
      setMessages(m.data.length);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-2xl font-semibold text-white">Admin Control</h2>
      <button onClick={load} className="mt-3 rounded-lg border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/10">Load Metrics</button>
      <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
        <div className="rounded-xl bg-black/40 p-3 text-zinc-200"><p className="text-lg font-bold text-white">{users}</p><p>Users</p></div>
        <div className="rounded-xl bg-black/40 p-3 text-zinc-200"><p className="text-lg font-bold text-white">{usage}</p><p>Usage</p></div>
        <div className="rounded-xl bg-black/40 p-3 text-zinc-200"><p className="text-lg font-bold text-white">{messages}</p><p>Messages</p></div>
      </div>
      {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
    </section>
  );
}
