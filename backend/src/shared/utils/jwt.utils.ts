import { sign } from 'jsonwebtoken';

export const generateToken = (user: any): string => {
  return sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' },
  );
};
