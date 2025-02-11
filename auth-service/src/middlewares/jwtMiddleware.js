import jwt from "jsonwebtoken"
import dotoenv from 'dotenv';

dotoenv.config();

const generateJWTToken = async (payload) => {
    return jwt.sign(
      payload, 
      process.env.JWT_SECRET, 
      { expiresIn: '2h' }
    );
  }

export {
    generateJWTToken
}