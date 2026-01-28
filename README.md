# Multitenant E-commerce

A multitenant e-commerce platform built with Next.js and PayloadCMS.

## Tech Stack

- **Framework**: Next.js 15 (with Turbopack)
- **CMS**: PayloadCMS
- **Database**: MongoDB
- **Payments**: Stripe
- **API**: tRPC
- **Styling**: TailwindCSS
- **UI Components**: Radix UI

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance
- Stripe account

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Database

```bash
# Run migrations
npm run db:fresh

# Seed database
npm run db:seed

# Reset database (fresh + seed)
npm run db:reset
```

### Stripe Webhooks (Local Development)

```bash
npm run webhookhandler
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run generate:types` | Generate PayloadCMS types |
