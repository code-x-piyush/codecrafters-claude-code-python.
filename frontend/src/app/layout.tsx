import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Piyush AI Portfolio',
  description: '3D AI Portfolio with SaaS tools and backend integrations',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-black antialiased">{children}</body>
    </html>
  );
}
