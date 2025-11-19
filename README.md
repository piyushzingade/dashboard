# Custom Theme Dashboard 🎨

A modern, customizable dashboard application built with Next.js, featuring multiple beautiful themes, interactive charts, and a comprehensive UI system.

![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-38bdf8?style=flat-square&logo=tailwindcss)

## 🌐 Live Preview

Check out the live demo: [https://zingify-six.vercel.app/](https://zingify-six.vercel.app/)

## ✨ Features

- **Multiple Custom Themes** - T3 chat, Amber, Lilac, Candy, Sky, and Default theme
- **Interactive Data Visualizations** - Bar charts, line charts, radar charts, and sales graphs
- **Kanban Board** - Drag-and-drop task management with smooth animations
- **Product Management** - Server-side table with filtering, sorting, and pagination
- **Theme Selector** - Dynamic theme switching with persistence
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Smooth Animations** - Powered by Motion (Motion react)
- **TypeScript First** - Full type safety throughout
- **Modern UI Components** - Built with shadcn/ui
- **Authentication Ready** - NextAuth.js integration
- **Database Integration** - Prisma ORM with PostgreSQL support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- PostgreSQL (optional, for full features)

### Installation

```bash
git clone <repository-url>
cd dashboard
npm install
```

### Environment Setup

Create a `.env.local` file in the root directory:

```env
# NextAuth (optional)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Database (optional)
DATABASE_URL="postgresql://user:password@localhost:5432/dashboard"
```

### Database Setup (Optional)

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database
npx prisma db seed
```

### Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14+** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **shadcn/ui** | Beautiful UI components |
| **Recharts** | Data visualization library |
| **Motion** | Animation library |
| **NextAuth.js** | Authentication solution |
| **Prisma** | Next-generation ORM |
| **PostgreSQL** | Relational database |
| **Lucide React** | Icon library |
| **Tabler Icons** | Additional icons |

## 📁 Project Structure

```
dashboard/
├── app/
│   ├── api/
│   │   └── auth/          # NextAuth API routes
│   │   └── verify-captcha/
│   ├── dashboard/         # Dashboard pages
│   │   ├── (account)/     # Account settings
│   │   ├── (general)/     # General pages
│   │   ├── calendar/      # Calendar page
│   │   ├── kanban/        # Kanban board
│   │   ├── overview/      # Main dashboard
│   │   ├── product/       # Product management
│   │   ├── reports/       # Reports page
│   │   └── transactions/  # Transactions page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── graphs/            # Chart components
│   │   ├── BarChart.tsx
│   │   ├── LineChart.tsx
│   │   ├── RadarChart.tsx
│   │   ├── Sales.tsx
│   │   └── TopCard.tsx
│   ├── kanban/            # Kanban components
│   ├── products/          # Product table components
│   ├── ui/                # shadcn/ui components
│   ├── active-theme.tsx   # Theme provider
│   ├── ThemeSelector.tsx  # Theme selector
│   ├── UpdateSoon.tsx     # Coming soon component
│   └── ...                 # Other components
├── constants/
│   └── mock-api.ts        # Mock data and API
├── hooks/                 # Custom hooks
├── lib/                   # Utility libraries
├── prisma/                # Database schema and migrations
├── public/
│   ├── theme.json         # Theme configurations
│   └── ...                # Static assets
├── types/                 # TypeScript types
└── ...
```

## 🎨 Theme System

The dashboard features a comprehensive theme system with 6 built-in themes:

- **Default**: Clean, neutral theme
- **T3 chat**: Warm purple tones
- **Amber**: Golden yellow theme
- **Lilac**: Soft purple and pink
- **Candy**: Bright, playful colors
- **Sky**: Twitter-inspired blue theme

### Adding Custom Themes

1. Add your theme configuration to `public/theme.json`
2. Include `light` and `dark` variants
3. The theme selector will automatically pick up new themes

Example theme structure:

```json
{
  "your-theme": {
    "displayName": "Your Theme",
    "light": {
      "background": "#ffffff",
      "foreground": "#000000",
      // ... more color variables
    },
    "dark": {
      // ... dark mode colors
    }
  }
}
```

## 📊 Charts & Visualizations

Pre-built chart components:

- **BarChart**: Animated bar chart with hover effects
- **LineChart**: Partial line chart with dash patterns
- **RadarChart**: Radar chart for multi-dimensional data
- **Sales**: Recent sales component with avatars
- **TopCard**: Animated KPI cards with trend indicators

## 🔧 Customization

### Adding New Components

Use shadcn/ui CLI:

```bash
npx shadcn-ui@latest add [component-name]
```

### Modifying Themes

Edit theme variables in `public/theme.json` or add new themes.

### Database Models

Update `prisma/schema.prisma` and run:

```bash
npx prisma migrate dev --name your-migration
```

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## 🚢 Deployment

### Vercel

```bash
npm run build
vercel --prod
```

### Other Platforms

Ensure environment variables are set for your deployment platform.

## 🤝 Contributing
1. Star the repository
2. Fork the repository
3. Create a feature branch
4. Make your changes
5. Test thoroughly
6. Submit a pull request

### For Contributors: Syncing Template Changes

If you make changes to the main dashboard files (outside the `cli/` directory), you need to sync these changes to the CLI templates so they're included when users scaffold new projects.

**The CLI uses two separate templates:**
- `template-with-auth`: Includes NextAuth + Prisma authentication
- `template-without-auth`: Dashboard without authentication features

**Run this command after making changes:**

```bash
cd cli
npm run sync
```

This will automatically generate both templates from the main dashboard source.

> **Note**: When users run the CLI, they are asked upfront if they want to include authentication. The CLI then copies from the appropriate pre-built template based on their choice.

## 📄 License

MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Evil charts](https://evilcharts.com/) for charting library
- [Motion](https://motion.dev/) for animations
- [Next.js](https://nextjs.org/) team
- All open-source contributors

---

Built by ❤️ Piyush


