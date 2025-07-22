# Vercel Sales Contact Form

A modern, AI-powered lead management system built with Next.js 15 and the Vercel AI SDK. Features intelligent lead scoring, enrichment, and a sales assistant with direct database access.

## ✨ Features

- **Progressive Contact Form** - Multi-step form with smart question flow to maximize conversion
- **AI Lead Enrichment** - Automatic company data enhancement using GPT-4
- **Intelligent Lead Scoring** - 7-factor scoring algorithm with temperature classification (Hot/Warm/Cold)
- **Sales Assistant** - AI chat interface with database query capabilities
- **Admin Dashboard** - Complete lead management with filtering, sorting, and analytics
- **Real-time Updates** - Live lead statistics and status tracking

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router and React Server Components
- **Database**: PostgreSQL with Drizzle ORM
- **AI**: Vercel AI SDK with OpenAI GPT-4
- **UI**: Tailwind CSS with Radix UI components
- **Validation**: Zod schemas with TypeScript integration
- **Deployment**: Vercel

## 🛠 Prerequisites

- Node.js 18+ 
- PostgreSQL database (or Supabase)
- OpenAI API key
- pnpm (recommended) or npm

## 📦 Installation

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
   
   Required environment variables:
   ```bash
   # Database
   POSTGRES_URL="your_postgres_connection_string"
   
   # AI Services  
   OPENAI_API_KEY="your_openai_api_key"
   
   # Supabase (if using)
   SUPABASE_URL="your_supabase_project_url"
   SUPABASE_ANON_KEY="your_supabase_anon_key"
   SUPABASE_SERVICE_ROLE_KEY="your_supabase_service_role_key"
   ```

4. **Set up the database**
   ```bash
   # Generate and apply database schema
   pnpm db:generate
   pnpm db:push
   
   # Optional: Seed with sample data
   pnpm db:seed
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄 Database Setup

The application uses PostgreSQL with optimized indexes for performance. The database schema includes:

- **leads** - Core lead data with contact info, scoring, and enrichment
- Optimized indexes for common queries (status, temperature, scoring)
- Full-text search capabilities for company and use case data
- JSONB indexes for enrichment data queries

## 🎯 Usage

### Contact Form
Visit `/contact` to see the progressive lead capture form with:
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

## 🧪 Development

### Available Scripts

```bash
# Development
pnpm dev              # Start development server with Turbopack
pnpm build            # Build for production  
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues
pnpm format           # Format code with Prettier
pnpm type-check       # Run TypeScript type checking

# Database
pnpm db:generate      # Generate Drizzle migrations
pnpm db:push          # Push schema changes to database
pnpm db:studio        # Open Drizzle Studio
pnpm db:seed          # Seed with sample data
```

### Code Structure

```
app/
├── admin/leads/      # Admin dashboard and lead management
├── api/              # API routes for leads, scoring, and AI
├── contact/          # Progressive contact form
└── layout.tsx        # Root layout with providers

lib/
├── db/               # Database schema and queries
├── schemas/          # Zod validation schemas
└── utils.ts          # Shared utilities

components/
└── ui/               # Reusable UI components
```

## 🚀 Deployment

### Deploy to Vercel

1. **Connect your repository to Vercel**
2. **Set environment variables** in the Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Environment Variables for Production

Ensure these are set in your deployment environment:
- `POSTGRES_URL` - Production database connection
- `OPENAI_API_KEY` - OpenAI API access
- All Supabase keys if using Supabase

## 🔧 Configuration

### AI Scoring Factors

The lead scoring algorithm evaluates 7 key factors:
- Company size (0-20 points)
- Job title seniority (0-20 points)  
- Budget range (0-15 points)
- Timeline urgency (0-15 points)
- Use case complexity (0-10 points)
- Engagement level (0-10 points)
- Buying signals (0-10 points)

### Temperature Classification

- **Hot** (75-100): High-intent leads requiring immediate attention
- **Warm** (45-74): Qualified prospects for nurture sequences  
- **Cold** (0-44): Early-stage leads for educational content

## 📊 Performance

- **Database**: Optimized indexes for sub-50ms query times
- **AI Processing**: Streaming responses with tool integration
- **Frontend**: Server Components for optimal loading performance
- **Search**: Full-text search with PostgreSQL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`pnpm lint && pnpm type-check`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.