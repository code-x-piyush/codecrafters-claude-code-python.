'use client';

import { useState } from 'react';
import { apiFetch } from '@/lib/api';

type OrderResponse = { success: boolean; data: { id: string; amount: number; currency: string } };

export default function PaymentSection() {
  const [message, setMessage] = useState('');

  const upgrade = async () => {
    try {
      const order = await apiFetch<OrderResponse>('/payment/order', { method: 'POST' });
      setMessage(`Order created: ${order.data.id} (${order.data.currency} ${order.data.amount / 100})`);
      await apiFetch('/payment/activate', { method: 'POST' });
      setMessage('Payment simulated and unlimited plan activated.');
    } catch (error) {
      setMessage((error as Error).message);
    }
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-2xl font-semibold text-white">Upgrade Plan</h2>
      <p className="mt-2 text-sm text-zinc-300">Unlock unlimited usage with Razorpay-enabled premium plan.</p>
      <button onClick={upgrade} className="mt-4 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-black">Upgrade Now</button>
      {message && <p className="mt-2 text-xs text-zinc-300">{message}</p>}
    </section>
  );
}
