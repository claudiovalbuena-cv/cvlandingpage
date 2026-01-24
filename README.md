# Photography Landing Page - Premium Next.js Application

A stunning, high-end photography portfolio and booking system built with modern web technologies.

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Email**: Resend
- **Calendar**: react-day-picker
- **Icons**: Lucide React
- **Fonts**: Playfair Display & Inter (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account
- Resend account (for email notifications)

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your credentials:
   ```
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://pehtvrduqtvekeffxshk.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   RESEND_API_KEY=your_resend_api_key
   EMAIL_FROM=onboarding@resend.dev
   EMAIL_TO=your_email@example.com
   ```

3. **Set up Supabase database**:
   - Go to your Supabase project
   - Open SQL Editor
   - Run the contents of `supabase/schema.sql`

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── admin/              # Admin panel routes
│   │   ├── bookings/       # Manage bookings
│   │   ├── services/       # Manage pricing/services
│   │   └── settings/       # Site settings
│   ├── api/                # API routes
│   │   ├── booking/        # Public booking endpoint
│   │   └── admin/          # Admin API endpoints
│   ├── globals.css         # Global styles & animations
│   ├── layout.tsx          # Root layout with fonts
│   └── page.tsx            # Main landing page
├── components/             # React components
│   ├── Header.tsx          # Navigation with dynamic logo
│   ├── Hero.tsx            # Hero section
│   ├── About.tsx           # About & services section
│   ├── Portfolio.tsx       # Portfolio gallery
│   ├── BehindCamera.tsx    # About the photographer
│   ├── PhotoGrid.tsx       # Photo grid showcase
│   ├── Testimonials.tsx    # Client testimonials
│   ├── CTA.tsx             # Call to action
│   ├── Pricing.tsx         # Dynamic pricing cards
│   ├── BookingForm.tsx     # Booking form with calendar
│   └── Footer.tsx          # Footer with social links
├── lib/
│   └── supabase.ts         # Supabase client & helpers
└── types/
    └── index.ts            # TypeScript interfaces
```

## Features

### Public Site
- ✅ Stunning hero section with animations
- ✅ About section with service categories
- ✅ Portfolio gallery with hover effects
- ✅ Photo grid showcase
- ✅ Client testimonials carousel
- ✅ Dynamic pricing from Supabase
- ✅ Booking form with calendar
- ✅ Email notifications via Resend
- ✅ Responsive design

### Admin Panel (`/admin`)
- ✅ Dashboard with overview stats
- ✅ Services management (CRUD)
- ✅ Bookings management with status updates
- ✅ Site settings (logo, URLs, social links)

## Design System

| Element | Value |
|---------|-------|
| Primary | Black (#000000) |
| Background | White (#FFFFFF) |
| Light Gray | #F5F5F5 |
| Accent | Gold (#D97706) |
| Headings | Playfair Display |
| Body | Inter |

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

Build the production bundle:
```bash
npm run build
npm start
```

## License

MIT License - feel free to use for personal or commercial projects.
# cvlandingpage
