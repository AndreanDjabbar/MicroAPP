import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'
import { generateJWTToken } from '../middlewares/jwtMiddleware.js';

const prisma = new PrismaClient();

const getUserByUsername = async (username) => {
  const user = await prisma.users.findUnique({
    where: { username: username },
  });
  return user || null;
};

const getUserByEmail = async (email) => {
    const user = await prisma.users.findFirst({
        where: {
          email: {
            equals: email,
            mode: 'insensitive'
          }
        }
      });
  return user || null;
};

const isPasswordMatch = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const getAllUsers = async () => {
    const users = await prisma.users.findMany();
    return users;
  };
  

const registerUser = async (userData) => {
  const { username, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);


  const newUser = await prisma.users.create({
    data: {
      username: username,
      email: email,
      password: hashedPassword,
      registered_time: new Date(),
    },
  });
  
  return newUser;
};

const loginUser = async(userData) => {
    try {
      const getUser = await getUserByEmail(userData.email);
      const user = {
        email: getUser.email,
      }
      const token = await generateJWTToken(user);
      return token;
    } catch(error) {
      throw new Error(error);
    }
  };

export { getUserByUsername, getUserByEmail, registerUser, isPasswordMatch, loginUser };