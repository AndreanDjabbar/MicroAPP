import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function initializeDatabase() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully!');
  } catch (error) {
    console.error('❌ Error connecting to the database:', error);
    process.exit(1); 
  }
}

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('🛑 Database connection closed.');
  process.exit(0);
});

export { initializeDatabase, prisma };
