import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function initializeDatabase() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1); 
  }
}

export { initializeDatabase };