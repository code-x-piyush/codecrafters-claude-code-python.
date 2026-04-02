'use client';

import { FormEvent, useState } from 'react';
import { apiFetch } from '@/lib/api';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      await apiFetch('/contact', {
        method: 'POST',
        body: JSON.stringify({ name, email, subject, message }),
      });
      setStatus('Message sent successfully');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      setStatus((error as Error).message);
    }
  };

  return (
    <section id="contact" className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-3 text-2xl font-semibold text-white">Contact</h2>
      <form onSubmit={submit} className="grid gap-3 md:grid-cols-2">
        <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Name" className="rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm text-white" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" className="rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm text-white" />
        <input value={subject} onChange={(e) => setSubject(e.target.value)} required placeholder="Subject" className="md:col-span-2 rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm text-white" />
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={4} placeholder="Message" className="md:col-span-2 rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm text-white" />
        <button className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-black md:col-span-2">Send Message</button>
      </form>
      {status && <p className="mt-2 text-xs text-zinc-300">{status}</p>}
    </section>
  );
}
