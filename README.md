# Hotel Management

Video Demo: :point_right: [coming soon...]()

## Technology

## Installation and run

Admin site run at port 3000 [http://localhost:3000](http://localhost:3000)

Top start project, first we setup PostgreSQL database:

```bash
docker compose up -d

npx prisma generate dev && npx prisma db push

# seed data at ./prisma/seed.ts

npm run seed:npx

```

Then, run the development server:

```bash
npm run dev
```
