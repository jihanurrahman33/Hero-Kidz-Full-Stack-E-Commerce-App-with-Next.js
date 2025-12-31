# Hero Kidz (Next.js + MongoDB)

Modern single-vendor storefront for children's products built with Next.js 16 (App Router), MongoDB, NextAuth, and Tailwind (DaisyUI).

## Stack
- Next.js 16 (App Router), React 19
- MongoDB via official driver
- NextAuth (credentials + Google OAuth)
- Tailwind CSS 4 + DaisyUI
- Nodemailer for order emails

## Features
- Product browsing with skeleton loading states
- Cart and checkout with protected routes
- Credentials and Google-based sign-in/out
- Server actions for auth, cart, and orders
- Order confirmation email with invoice markup

## Quick Start
1. Install dependencies
  ```bash
  npm install
  ```
2. Copy environment template and fill values
  ```bash
  cp .env.example .env.local
  ```
3. Run development server
  ```bash
  npm run dev
  ```
4. Open http://localhost:3000

## Environment Variables
Create .env.local with values for your project:

```env
MONGODB_URI=         # MongoDB connection string
DBNAME=              # Database name

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=     # Generate with `openssl rand -base64 32`

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

EMAIL_USER=          # Gmail address used to send mail
EMAIL_PASS=          # App password for the Gmail account
```

## Scripts
- `npm run dev` — start Next.js in development
- `npm run build` — create production build
- `npm start` — run built app
- `npm run lint` — lint with ESLint

## Key Paths
- App entry: [src/app/page.jsx](src/app/page.jsx)
- API auth route: [src/app/api/auth/[...nextauth]/route.js](src/app/api/auth/[...nextauth]/route.js)
- Auth options: [src/lib/authOptions.js](src/lib/authOptions.js)
- Mongo helper: [src/lib/dbConnect.js](src/lib/dbConnect.js)
- Email sender: [src/lib/sendEmail.js](src/lib/sendEmail.js)
- Sample data: [src/data/toys.json](src/data/toys.json)

## Middleware
Private routes (cart/checkout/profile/dashboard) are guarded in [src/proxy.js](src/proxy.js) using NextAuth JWT tokens.

## Styling
Tailwind 4 with DaisyUI; brand palette lives in global styles and can be extended in [src/app/globals.css](src/app/globals.css).

## Deployment Notes
- Ensure all environment variables are set in the hosting platform.
- Configure OAuth redirect URIs for Google to point at your deployed domain.
- Provide SMTP credentials that allow transactional emails.

## License
Project assets and code are proprietary to Hero Kidz unless the owner specifies otherwise.
