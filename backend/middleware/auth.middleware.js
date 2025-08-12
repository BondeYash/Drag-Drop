import { verifyToken } from '../utils/jwt.utils.js';

export default function authMiddleware(req, res, next){
  try {
    const token = req.cookies?.token || req.header('authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    const decoded = verifyToken(token);
    req.userId = decoded.id;
    next();
  } catch(err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
