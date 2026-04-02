'use client';

import { motion } from 'framer-motion';

const items = ['Home', 'Projects', 'Services', 'Tools', 'Contact'];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <p className="text-sm font-semibold tracking-[0.2em] text-white">PIYUSH.AI</p>
        <div className="hidden gap-6 text-sm md:flex">
          {items.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-zinc-300 transition hover:text-white">
              {item}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
