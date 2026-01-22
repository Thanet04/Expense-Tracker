import { Request, Response, NextFunction } from 'express';

export const validateSignUp = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    res.status(400).json({
      success: false,
      message: 'Email, password, and name are required'
    });
    return;
  }

  // Email validation
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({
      success: false,
      message: 'Please enter a valid email address'
    });
    return;
  }

  // Password validation
  if (password.length < 6) {
    res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters long'
    });
    return;
  }

  // Name validation
  if (name.trim().length < 2) {
    res.status(400).json({
      success: false,
      message: 'Name must be at least 2 characters long'
    });
    return;
  }

  next();
};

export const validateSignIn = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
    return;
  }

  // Email validation
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({
      success: false,
      message: 'Please enter a valid email address'
    });
    return;
  }

  next();
};


export const validateCreateTransaction = (req: Request, res: Response, next: NextFunction): void => {
  const { type, category, title, amount, date } = req.body;
  
  // Validate type
  if (!type || typeof type !== 'string') {
    res.status(400).json({
      success: false,
      message: 'Type is required and must be a string'
    });
    return;
  }

  if (type !== 'expense' && type !== 'income') {
    res.status(400).json({
      success: false,
      message: 'Type must be either "expense" or "income"'
    });
    return;
  }

  // Validate category
  if (!category || typeof category !== 'string' || category.trim().length === 0) {
    res.status(400).json({
      success: false,
      message: 'Category is required and must be a non-empty string'
    });
    return;
  }

  // Validate title
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    res.status(400).json({
      success: false,
      message: 'Title is required and must be a non-empty string'
    });
    return;
  }

  // Validate amount
  if (amount === undefined || amount === null) {
    res.status(400).json({
      success: false,
      message: 'Amount is required'
    });
    return;
  }

  if (typeof amount !== 'number' || isNaN(amount)) {
    res.status(400).json({
      success: false,
      message: 'Amount must be a valid number'
    });
    return;
  }

  if (amount <= 0) {
    res.status(400).json({
      success: false,
      message: 'Amount must be greater than zero'
    });
    return;
  }

  // Validate date if provided
  if (date !== undefined && date !== null) {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      res.status(400).json({
        success: false,
        message: 'Date must be a valid date'
      });
      return;
    }
  }

  next();
};

export const validateUpdateTransaction = (req: Request, res: Response, next: NextFunction): void => {
  const { type, category, title, amount, date } = req.body;

  // If type is provided, validate it
  if (type !== undefined && type !== null) {
    if (typeof type !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Type must be a string'
      });
      return;
    }

    if (type !== 'expense' && type !== 'income') {
      res.status(400).json({
        success: false,
        message: 'Type must be either "expense" or "income"'
      });
      return;
    }
  }

  // If category is provided, validate it
  if (category !== undefined && category !== null) {
    if (typeof category !== 'string' || category.trim().length === 0) {
      res.status(400).json({
        success: false,
        message: 'Category must be a non-empty string'
      });
      return;
    }
  }

  // If title is provided, validate it
  if (title !== undefined && title !== null) {
    if (typeof title !== 'string' || title.trim().length === 0) {
      res.status(400).json({
        success: false,
        message: 'Title must be a non-empty string'
      });
      return;
    }
  }

  // If amount is provided, validate it
  if (amount !== undefined && amount !== null) {
    if (typeof amount !== 'number' || isNaN(amount)) {
      res.status(400).json({
        success: false,
        message: 'Amount must be a valid number'
      });
      return;
    }

    if (amount <= 0) {
      res.status(400).json({
        success: false,
        message: 'Amount must be greater than zero'
      });
      return;
    }
  }

  // Validate date if provided
  if (date !== undefined && date !== null) {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      res.status(400).json({
        success: false,
        message: 'Date must be a valid date'
      });
      return;
    }
  }

  // At least one field must be provided for update
  if (type === undefined && category === undefined && title === undefined && amount === undefined && date === undefined) {
    res.status(400).json({
      success: false,
      message: 'At least one field (type, category, title, amount, or date) must be provided for update'
    });
    return;
  }

  next();
};