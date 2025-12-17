# Next.js Full-Stack Starter Template

Production-ready Next.js 15 starter template with React 19, TypeScript, Prisma, PostgreSQL, NextAuth, Tailwind CSS, and Shadcn UI. 

## 🚀 Quick Start Guide

### 1. Clone the Repository
```bash
git clone https://github.com/PremMann/nextjs-fullstack-starter.git
cd nextjs-fullstack-starter
2. Install Dependencies
bash
npm install
3. Setup Environment Variables
bash
cp .env.example . env
Edit .env file with the following configuration:

env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/nextjs_starter? schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Pusher (Optional - Can skip for initial setup)
NEXT_PUBLIC_PUSHER_KEY="your-pusher-key"
PUSHER_APP_ID="your-pusher-app-id"
PUSHER_SECRET="your-pusher-secret"
NEXT_PUBLIC_PUSHER_CLUSTER="mt1"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"

# Admin Credentials
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="admin123"
Generate NEXTAUTH_SECRET:

bash
openssl rand -base64 32
4. Start Database
bash
docker-compose up -d
5. Setup Database
bash
# Run migrations
npx prisma migrate dev --name init

# Seed initial data (creates admin user)
npx prisma db seed
6. Start Development Server
bash
npm run dev
Visit http://localhost:3000 🎉

🔐 Default Login
Email: admin@example.com
Password: admin123
📋 Essential Commands
bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:studio    # Open Prisma Studio (Database GUI)
npm run db:migrate   # Create and run migrations
npm run db:seed      # Seed database with initial data
🛠️ Tech Stack
Frontend: Next. js 15, React 19, TypeScript
Styling: Tailwind CSS, Shadcn UI
Backend: Prisma, PostgreSQL
Auth: NextAuth v5
Validation: Zod
