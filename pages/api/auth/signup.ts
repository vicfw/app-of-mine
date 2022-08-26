import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/User';
import dbConnect from '../../../src/utils/dbConnect';
import bcrypt from 'bcryptjs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      const { email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      try {
        const newUser = await User.create({
          email,
          password: hashedPassword,
        });

        res.status(201).json({ success: true, data: { email: newUser.email } });
      } catch (e: any) {
        if (e.message.includes('duplicate')) {
          res.status(400).json({
            success: false,
            error: 'email already in use',
            field: 'email',
          });
        }

        if (e.message.includes('Please enter a valid email')) {
          res.status(400).json({
            success: false,
            error: 'Please enter a valid email',
            field: 'email',
          });
        }

        if (e.message.includes('password cant be lower than 6 characters')) {
          res.status(400).json({
            success: false,
            error: 'password cant be lower than 6 characters',
            field: 'password',
          });
        }

        if (e.message.includes('Path `email` is required.')) {
          res.status(400).json({
            success: false,
            error: 'email cant be empty',
            field: 'email',
          });
        }

        if (e.message.includes('Path `password` is required.')) {
          res.status(400).json({
            success: false,
            error: 'password cant be empty',
            field: 'password',
          });
        }
      }

      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
