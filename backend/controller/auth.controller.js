import User from '../model/User.js';
import { signToken } from '../utils/jwt.utils.js'; 

export const loginOrRegister = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email required' });

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email });
      await user.save();
    }

    const token = signToken({ id: user._id });

    // Store token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // true if using https
      sameSite: 'lax',
      maxAge: 7 * 24 * 3600 * 1000 // 7 days
    });

    // Send user + token to frontend
    res.status(200).json({
      message: 'Login successful',
      user,
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
