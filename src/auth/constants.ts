export const jwtConstants: { secret: string; expiresIn: string | number } = {
  secret: process.env.JWT_SECRET || 'dev_secret_change_me',
  expiresIn: process.env.JWT_EXPIRES?.trim() || '1d', // <-- sanitize
};
