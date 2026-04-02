'use client';

import { FormEvent, useMemo, useState } from 'react';
import { apiFetch } from '@/lib/api';

type AIResponse = { success: boolean; data: { response: string } };

export default function AiToolSection() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const typed = useMemo(() => result, [result]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('');
    try {
      const response = await apiFetch<AIResponse>('/ai/chat', {
        method: 'POST',
        body: JSON.stringify({ prompt }),
      });
      const text = response.data.response;
      let i = 0;
      const interval = setInterval(() => {
        i += 1;
        setResult(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, 8);
    } catch (error) {
      setResult((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="tools" className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-3 text-2xl font-semibold text-white">AI Chat Tool</h2>
      <form onSubmit={submit} className="space-y-3">
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={4} placeholder="Ask anything..." className="w-full rounded-xl border border-white/20 bg-black/40 px-3 py-2 text-sm text-white" required />
        <button disabled={loading} className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-black disabled:opacity-50">{loading ? 'Generating...' : 'Generate'}</button>
      </form>
      <div className="mt-4 min-h-24 rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-zinc-200 whitespace-pre-wrap">{typed || 'Response will appear here...'}</div>
    </section>
  );
}
