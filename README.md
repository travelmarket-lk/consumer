# Consumer Platform

Production-oriented Next.js foundation using the App Router, TypeScript, MySQL, and an external REST API integration layer.

## Structure

```text
src/app/                 Pages, layouts, and HTTP Route Handlers
src/modules/             Domain modules (service + repository + types)
src/lib/config/          Validated server configuration
src/lib/db/              MySQL pool and connection health
src/lib/http/            Consistent API responses and errors
src/lib/integrations/    External REST API client
db/schema.sql            Snapshot of the existing database schema
```

## Local setup

1. Copy `.env.example` to `.env.local` and set the MySQL and external API values.
2. The existing database schema is documented in `db/schema.sql`; do not run it against the production database.
3. Install and run the app:

```bash
npm install
npm run dev
```

The API is available under `/api/v1`. `GET /api/health` is a lightweight liveness check, while `GET /api/ready` validates the MySQL connection.

## API examples

```bash
curl http://localhost:3000/api/v1/users
curl -X POST http://localhost:3000/api/v1/users \
  -H 'content-type: application/json' \
  -d '{"username":"ada","email":"ada@example.com","firstName":"Ada","lastName":"Lovelace"}'
curl http://localhost:3000/api/v1/integrations/example
```

The external integration is intentionally configured through environment variables so credentials remain server-only. Replace the example path in `src/app/api/v1/integrations/example/route.ts` with the upstream resource your product needs.

The users API maps the existing `users` table and intentionally excludes `password` and `otp` from responses. The schema snapshot includes the existing administration and API-permission tables and their foreign-key relationships.

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
