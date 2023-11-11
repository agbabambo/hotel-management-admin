# Hotel Management

Video Demo: :point_right: [link](https://www.youtube.com/watch?v=rVx5yFdzPZg)

[Client Part](https://github.com/kafkainthevoid/hotel-management-client)

[Admin Part](https://github.com/kafkainthevoid/hotel-management-admin)

## Technology

## Installation and run

Admin site run at port 4000 [http://localhost:3000](http://localhost:3000)
Client site run at port 4000 [http://localhost:4000](http://localhost:4000)

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
