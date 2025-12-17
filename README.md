# Next.js Full-Stack Starter Template

Production-ready Next.js 15 full-stack starter template with React 19, TypeScript, Prisma, PostgreSQL, NextAuth, Tailwind CSS, and Shadcn UI. Clone and start building in minutes.

---

## 🚀 Quick Start Guide

### 1. Clone the Repository
```bash
git clone https://github.com/PremMann/nextjs-fullstack-starter.git
cd nextjs-fullstack-starter
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
cp .env.example . env
```

Edit `.env` file with the following configuration: 

```env
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

# Admin Credentials (for seeding)
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="admin123"
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 4. Start Database
```bash
docker-compose up -d
```

### 5. Setup Database
```bash
# Run migrations
npx prisma migrate dev --name init

# Seed initial data (creates admin user)
npx prisma db seed
```

### 6. Start Development Server
```bash
npm run dev
```

Visit **http://localhost:3000** 🎉

---

## 🔐 Default Login Credentials

- **Email:** `admin@example.com`
- **Password:** `admin123`

**⚠️ Change these credentials in production!**

---

## 📋 Available Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run db:studio    # Open Prisma Studio (Database GUI)
npm run db:migrate   # Create and run migrations
npm run db:seed      # Seed database with initial data
npm run db:push      # Push schema changes without migration
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next. js 15 (App Router, Server Actions, SSR/SSG)
- **Library:** React 19 (Hooks, Server Components)
- **Language:** TypeScript (Strict mode)

### UI & Styling
- **CSS Framework:** Tailwind CSS 3.4
- **Component Library:** Shadcn UI, NextUI
- **Icons:** Lucide React, FontAwesome
- **Animations:** Framer Motion

### Backend & Database
- **ORM:** Prisma (Type-safe database access)
- **Database:** PostgreSQL
- **Authentication:** NextAuth. js v5 (Credentials, JWT Sessions)
- **Validation:** Zod (Schema validation)
- **Real-time:** Pusher (WebSockets)

### Infrastructure
- **Runtime:** Node.js 22. x
- **Package Manager:** npm
- **Containerization:** Docker & Docker Compose

---

## ✨ Features

- ✅ **Authentication & Authorization** - NextAuth v5 with credentials provider
- ✅ **Role-Based Access Control (RBAC)** - Admin, Moderator, User roles
- ✅ **Admin Dashboard** - User management, statistics, settings
- ✅ **Database Ready** - Prisma ORM with PostgreSQL
- ✅ **Type-Safe** - End-to-end TypeScript with Zod validation
- ✅ **Modern UI** - Shadcn UI components with Tailwind CSS
- ✅ **Dark/Light Theme** - Built-in theme switching
- ✅ **Internationalization (i18n)** - Multi-language support ready
- ✅ **Server Actions** - Modern data mutations with Next.js
- ✅ **API Routes** - RESTful endpoints for external integrations
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Docker Support** - Easy local development with Docker Compose

---

## 📁 Project Structure

```
nextjs-fullstack-starter/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/              # Auth pages (login, register)
│   │   ├── (dashboard)/         # Dashboard pages
│   │   ├── api/                 # API routes
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Landing page
│   │   └── globals.css          # Global styles
│   ├── components/
│   │   ├── ui/                  # Shadcn UI components
│   │   ├── auth/                # Auth forms
│   │   ├── dashboard/           # Dashboard components
│   │   └── shared/              # Shared components
│   ├── lib/                     # Utility functions
│   │   ├── auth.ts              # NextAuth configuration
│   │   ├── prisma.ts            # Prisma client
│   │   ├── utils.ts             # Helper functions
│   │   └── rbac.ts              # Role-based access control
│   ├── actions/                 # Server Actions
│   ├── schemas/                 # Zod validation schemas
│   ├── types/                   # TypeScript types
│   └── middleware. ts            # Route protection
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── seed.ts                  # Database seeding
├── public/                      # Static assets
├── . env.example                 # Environment variables template
├── docker-compose.yml           # Docker configuration
├── package. json                 # Dependencies and scripts
├── tailwind.config.ts           # Tailwind configuration
└── tsconfig.json                # TypeScript configuration
```

---

## 🔧 Configuration

### Database Configuration

The default Docker setup uses:
- **Host:** localhost
- **Port:** 5432
- **Database:** nextjs_starter
- **Username:** user
- **Password:** password

To use a different database, update the `DATABASE_URL` in `.env` file.

### NextAuth Configuration

1. Generate a secure secret:
   ```bash
   openssl rand -base64 32
   ```
2. Add it to `.env` as `NEXTAUTH_SECRET`
3. Update `NEXTAUTH_URL` for production deployment

### Pusher Configuration (Optional)

For real-time features: 
1. Sign up at [pusher.com](https://pusher.com)
2. Create a new app
3. Copy credentials to `.env` file

---

## 🎨 Customization

### Update Branding & Colors

Edit `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      primary: {
        // Your brand colors
      }
    }
  }
}
```

### Add New Pages

Create files in `src/app/`:
```bash
src/app/your-page/page.tsx
```

### Extend Database Schema

1. Edit `prisma/schema.prisma`
2. Run migration:
   ```bash
   npx prisma migrate dev --name your_migration_name
   ```

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy automatically

### Railway

1. Create new project in [Railway](https://railway.app)
2. Add PostgreSQL service
3. Connect GitHub repository
4. Add environment variables
5. Deploy

### Docker

```bash
docker build -t nextjs-starter . 
docker run -p 3000:3000 nextjs-starter
```

---

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker ps

# View database logs
docker logs nextjs_postgres

# Restart database
docker-compose restart
```

### Port Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

### Prisma Issues
```bash
# Regenerate Prisma Client
npx prisma generate

# Reset database (⚠️ deletes all data)
npx prisma migrate reset
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf . next

# Clean install
rm -rf node_modules package-lock.json
npm install
```

---

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth. js Documentation](https://next-auth.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn UI Documentation](https://ui.shadcn.com)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - The React Framework
- [Shadcn UI](https://ui.shadcn.com) - Beautiful UI components
- [Prisma](https://www.prisma.io) - Next-generation ORM
- [NextAuth. js](https://next-auth.js.org) - Authentication for Next.js

---

## 💬 Support

For support, email your-email@example.com or open an issue in the repository.

---

**Built with ❤️ using Next.js 15, React 19, and TypeScript**
