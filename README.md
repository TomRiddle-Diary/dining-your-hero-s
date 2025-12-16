# Dining Your Hero,s - Restaurant Website

A modern, responsive restaurant website built with Next.js 14+, TypeScript, Tailwind CSS, and Framer Motion.

## Design System

### Colors
- **Primary Green**: `#0D4D4D` - Header, buttons, primary text
- **Primary Orange**: `#FF6B1A` - Logo, accents, CTA elements
- **Background Cream**: `#F5EBD7` - Main background

### Border Radius
- **Buttons**: `25-30px` (pill shape)
- **Images**: `8-12px` (subtle rounded corners)

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Fonts**: System fonts optimized for performance

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
└── components/          # Reusable components
```

## Features

- ✅ Responsive design optimized for all devices
- ✅ Smooth scroll animations with Framer Motion
- ✅ Optimized image loading with Next.js Image component
- ✅ SEO-friendly with metadata configuration
- ✅ Fast page loads with App Router
