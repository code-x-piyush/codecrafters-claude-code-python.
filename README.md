# AI Portfolio Monorepo (Frontend + Backend)

This repository now contains a production-style monorepo setup while preserving the original Python challenge files.

## Folder Structure

- `frontend/` - Next.js 16 + Tailwind + React Three Fiber + Framer Motion UI
- `backend/` - Node.js + Express + MongoDB + JWT + Razorpay + Nodemailer APIs
- `app/` - Original CodeCrafters Python challenge entrypoint (unchanged)

## Core Features

- 3D hero section and modern dark/glassmorphism UI
- AI chat and summarization endpoints using OpenAI API
- PDF tools endpoints: merge, split, compress, PDF↔Word adapter placeholders
- Image tools endpoints: background removal/color change/optimization
- Guest usage limits and JWT-based user authentication
- Razorpay order creation + paid plan activation flow
- Contact form persistence + optional email notifications
- Admin APIs for users, usage, and messages
- Drag-and-drop upload with progress bar in frontend
- Download history API for tool outputs

## Installation

### Prerequisites

- Node.js 20+
- npm 10+
- MongoDB instance

### Install dependencies

```bash
npm install
npm install --prefix frontend
npm install --prefix backend
```

## Environment Setup

### Backend

Copy:

```bash
cp /home/runner/work/codecrafters-claude-code-python./codecrafters-claude-code-python./backend/.env.example /home/runner/work/codecrafters-claude-code-python./codecrafters-claude-code-python./backend/.env
```

Required variables (in `backend/.env`):

- `MONGODB_URI`
- `JWT_SECRET`
- `OPENAI_API_KEY`
- optional: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `SMTP_*`, `CONTACT_TO_EMAIL`

### Frontend

Copy:

```bash
cp /home/runner/work/codecrafters-claude-code-python./codecrafters-claude-code-python./frontend/.env.example /home/runner/work/codecrafters-claude-code-python./codecrafters-claude-code-python./frontend/.env.local
```

Set:

- `NEXT_PUBLIC_API_BASE` (default `http://localhost:5000/api`)

## Run Commands

### Run both apps in development

```bash
npm run dev
```

### Run individually

```bash
npm run dev --prefix backend
npm run dev --prefix frontend
```

### Build frontend

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## API Overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/ai/chat`
- `POST /api/ai/summarize`
- `POST /api/tools/pdf/merge`
- `POST /api/tools/pdf/split`
- `POST /api/tools/pdf/compress`
- `POST /api/tools/pdf/to-word`
- `POST /api/tools/pdf/from-word`
- `POST /api/tools/image/remove-bg`
- `POST /api/tools/image/change-bg-color`
- `POST /api/tools/image/optimize`
- `GET /api/tools/downloads/history`
- `POST /api/contact`
- `POST /api/payment/order`
- `POST /api/payment/activate`
- `GET /api/admin/users`
- `GET /api/admin/usage`
- `GET /api/admin/messages`

## Notes

- Guest users must send `x-guest-id` and are rate-limited by `GUEST_LIMIT`.
- Paid users bypass guest limits.
- Some heavy conversion features are adapter placeholders meant for plugging in production conversion services.
