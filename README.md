# Vercel Sales Contact Form

A modern, AI-powered lead management system built with Next.js 15 and the Vercel AI SDK. Features intelligent lead scoring, enrichment, and a sales assistant with direct database access.

## Tech Stack

- **Framework**: Next.js 15 with App Router and React Server Components
- **Database**: PostgreSQL with Drizzle ORM
- **AI**: Vercel AI SDK
- **UI**: Tailwind CSS with shacn/ui components
- **Validation**: Zod schemas with TypeScript integration
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+
- PostgreSQL database (or Supabase)
- OpenAI API key
- pnpm (recommended) or npm

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd vercel-gtm
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

4. **Set up the database**

   ```bash
   # Generate and apply database schema
   pnpm db:generate
   pnpm db:push

   # Optional: Seed with sample data
   pnpm db:seed

   # Single command to do all steps and check env vars
   pnpm db:setup
   ```

5. **Start the development server**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Contact Form

Visit `/contact` to see the lead contact form with:

- Smart question flow that adapts based on responses
- Real-time validation and feedback
- AI-powered lead enrichment and scoring

### Admin Dashboard

Access `/admin/leads` for the full lead management interface:

- Filter and search leads by various criteria
- View detailed lead profiles with enrichment data
- Track lead progression through the sales pipeline
- Access lead statistics and conversion metrics

### Sales Assistant

Use the AI-powered sales assistant to:

- Query lead data with natural language
- Get insights on lead quality and pipeline health
- Search for specific companies or job titles
- Analyze lead trends and patterns
