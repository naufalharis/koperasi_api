Installation & Setup
Install dependencies

npm install
Environment Configuration

Update .env file with your database connection:

DATABASE_URL="postgresql://username:password@host:port/database_name"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="24h"
PORT=3000
NODE_ENV="development"
Database Setup

# Push schema to database (for hosted databases without migration permissions)
npx prisma db push

# OR use migrations (if you have database creation permissions)
npx prisma migrate dev --name initial

# Generate Prisma client
npx prisma generate
Run the application

# Development
npm run start:dev

# Production build
npm run build
npm run start:prod
