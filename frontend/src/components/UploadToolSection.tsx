'use client';

import { useRef, useState } from 'react';
import { API_BASE } from '@/lib/config';
import { getGuestId, getToken } from '@/lib/auth';

type Tool = { key: string; label: string; endpoint: string; multiple?: boolean };

const tools: Tool[] = [
  { key: 'pdf-merge', label: 'Merge PDF', endpoint: '/tools/pdf/merge', multiple: true },
  { key: 'pdf-split', label: 'Split PDF', endpoint: '/tools/pdf/split' },
  { key: 'pdf-compress', label: 'Compress PDF', endpoint: '/tools/pdf/compress' },
  { key: 'pdf-to-word', label: 'PDF to Word', endpoint: '/tools/pdf/to-word' },
  { key: 'word-to-pdf', label: 'Word to PDF', endpoint: '/tools/pdf/from-word' },
  { key: 'remove-bg', label: 'Remove Background', endpoint: '/tools/image/remove-bg' },
  { key: 'bg-color', label: 'Change Background Color', endpoint: '/tools/image/change-bg-color' },
  { key: 'img-optimize', label: 'Optimize Image', endpoint: '/tools/image/optimize' },
];

export default function UploadToolSection() {
  const [active, setActive] = useState<Tool>(tools[0]);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [dragOn, setDragOn] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const formData = new FormData();
    if (active.multiple) {
      Array.from(files).forEach((f) => formData.append('files', f));
    } else {
      formData.append('file', files[0]);
    }

    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable) return;
      setProgress(Math.round((event.loaded / event.total) * 100));
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        setMessage('Processed successfully. Check download prompt from browser.');
      } else {
        try {
          const parsed = JSON.parse(xhr.responseText);
          setMessage(parsed.message || 'Request failed');
        } catch {
          setMessage('Request failed');
        }
      }
    };

    xhr.onerror = () => setMessage('Upload failed');
    xhr.open('POST', `${API_BASE}${active.endpoint}`);
    xhr.setRequestHeader('x-guest-id', getGuestId());
    const token = getToken();
    if (token) xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.send(formData);
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-3 text-2xl font-semibold text-white">PDF & Image Tools</h2>
      <div className="mb-4 flex flex-wrap gap-2">
        {tools.map((tool) => (
          <button key={tool.key} onClick={() => setActive(tool)} className={`rounded-lg px-3 py-2 text-xs ${active.key === tool.key ? 'bg-cyan-500 text-black' : 'bg-white/10 text-zinc-200'}`}>
            {tool.label}
          </button>
        ))}
      </div>

      <div
        className={`rounded-2xl border-2 border-dashed p-6 text-center ${dragOn ? 'border-cyan-400 bg-cyan-500/10' : 'border-white/20 bg-black/30'}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOn(true);
        }}
        onDragLeave={() => setDragOn(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOn(false);
          upload(e.dataTransfer.files);
        }}
      >
        <p className="text-sm text-zinc-200">Drag & drop files here or select manually</p>
        <button onClick={() => inputRef.current?.click()} className="mt-3 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-black">
          Choose File
        </button>
        <input ref={inputRef} type="file" className="hidden" multiple={Boolean(active.multiple)} onChange={(e) => upload(e.target.files)} />
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full bg-cyan-400 transition-all" style={{ width: `${progress}%` }} />
      </div>
      <p className="mt-2 text-xs text-zinc-300">Upload progress: {progress}%</p>
      {message && <p className="mt-2 text-sm text-zinc-200">{message}</p>}
    </section>
  );
}
