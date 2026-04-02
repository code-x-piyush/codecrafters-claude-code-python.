import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero3D from '@/components/Hero3D';
import AuthPanel from '@/components/AuthPanel';
import AiToolSection from '@/components/AiToolSection';
import ContactSection from '@/components/ContactSection';

const UploadToolSection = dynamic(() => import('@/components/UploadToolSection'));
const PaymentSection = dynamic(() => import('@/components/PaymentSection'));
const AdminSection = dynamic(() => import('@/components/AdminSection'));

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8">
        <Hero3D />

        <section id="projects" className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold">Projects</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-300">
              <li>3D AI SaaS Portfolio Platform</li>
              <li>PDF and image utility toolkit</li>
              <li>Authentication, payments, and analytics backend</li>
            </ul>
          </div>
          <div id="services" className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold">Services</h2>
            <p className="mt-3 text-sm text-zinc-300">Full-stack web development, AI tool integration, SaaS architecture, and UI/UX design.</p>
            <div className="mt-4"><AuthPanel /></div>
          </div>
        </section>

        <AiToolSection />
        <Suspense fallback={<div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-zinc-300">Loading tools...</div>}>
          <UploadToolSection />
          <PaymentSection />
          <AdminSection />
        </Suspense>
        <ContactSection />
      </main>
    </div>
  );
}
