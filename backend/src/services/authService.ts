import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/User';
import { generateToken, JwtPayload } from '../config/jwt';

export interface SignUpData {
  email: string;
  password: string;
  name: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
}

// Sign Up
export const signUp = async (data: SignUpData): Promise<AuthResponse> => {
  const { email, password, name } = data;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const user = new User({
    email,
    password: hashedPassword,
    name
  });

  await user.save();

  // Generate JWT token
  const payload: JwtPayload = {
    userId: user._id.toString(),
    email: user.email
  };
  const token = generateToken(payload);

  return {
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name
    },
    token
  };
};

// Sign In
export const signIn = async (data: SignInData): Promise<AuthResponse> => {
  const { email, password } = data;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Generate JWT token
  const payload: JwtPayload = {
    userId: user._id.toString(),
    email: user.email
  };
  const token = generateToken(payload);

  return {
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name
    },
    token
  };
};

// Get user by ID
export const getUserById = async (userId: string): Promise<IUser | null> => {
  const user = await User.findById(userId);
  if (!user) {
    return null;
  }
  const userObj = user.toObject();
  delete (userObj as any).password;
  return userObj as IUser;
};
