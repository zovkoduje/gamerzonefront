# GamerZone – Storefront

GamerZone is a full-stack e-commerce demo for gaming gear (keyboards, mice and headsets). This repository is the **customer-facing store**. Products, categories and orders are managed in a separate admin dashboard ([gamerzone](https://github.com/zovkoduje/gamerzone)), and both apps share one MongoDB database.

## Live demo

- **Store:** https://gamerzonefront.vercel.app/
- **Admin dashboard:** https://gamerzone-admin.vercel.app/ (sign-in is limited to whitelisted Google accounts)

> This is a test project for academic purposes. It is not a real shop, and no orders are fulfilled. Please don't enter real payment details or other sensitive information.

## Features

- Home page with a featured product, category tiles and the newest products in each category
- Product listing, category pages and search
- Product pages with an image gallery, specifications and related products
- Shopping cart, stored in the browser
- Checkout through Stripe
- Google sign-in, with a saved shipping address and order history on the account page

## Tech stack

- [Next.js 14](https://nextjs.org/) (Pages Router) and React 18
- [styled-components](https://styled-components.com/) for styling
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- [NextAuth.js](https://next-auth.js.org/) with Google OAuth
- [Stripe](https://stripe.com/) for checkout
- Deployed on [Vercel](https://vercel.com/)

## Running locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root:

   ```
   MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/gamerzone
   SECRET=any-long-random-string
   NEXTAUTH_URL=http://localhost:3000
   NEXT_PUBLIC_URL=http://localhost:3000
   PUBLIC_URL=http://localhost:3000
   GOOGLE_FRONT_ID=your-google-oauth-client-id
   GOOGLE_FRONT_SECRET=your-google-oauth-client-secret
   STRIPE_SK=sk_test_...
   ```

   Use the same `MONGODB_URI` as the admin dashboard so both apps see the same products. In Google Cloud, add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI.

3. Start the dev server:

   ```bash
   npm run dev
   ```

   Then open http://localhost:3000.

Products are added through the admin dashboard. The home page also expects a featured product, which you set on the admin **Settings** page.
