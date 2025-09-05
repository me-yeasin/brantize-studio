This is a [Next.js](https://nextjs.org) project for Brandtize Studio, a creative agency specializing in brand identity and digital marketing.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Setup

Copy the `.env.local.example` file to `.env.local` and update it with your credentials:

```bash
cp .env.local.example .env.local
```

### Email Configuration (EmailJS)

The contact form uses EmailJS to send emails. Follow these steps to set it up:

1. Create a free account at [EmailJS](https://www.emailjs.com/)
2. Create a new email service (Gmail, Outlook, etc.)
3. Create a new email template with the following variables:
   - `{{name}}` - The sender's name
   - `{{email}}` - The sender's email
   - `{{company}}` - The sender's company
   - `{{message}}` - The message content
4. Get your Service ID, Template ID, and Public Key
5. Update your `.env.local` file with these values:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
