import "dotenv/config";

const getEnv = (variable: string) => {
  const result = process.env[variable];
  if (!result) {
    throw new Error(`Env variable not set: ${variable}`);
  }
  return result;
};

const PORT = Number(process.env.PORT) || 5000;

const JWT_SECRET = getEnv("JWT_SECRET");

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

const DATABASE_URL = getEnv("DATABASE_URL");

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

export const env = {
  PORT,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  DATABASE_URL,
  CLIENT_URL,
};
