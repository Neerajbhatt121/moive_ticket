import bcrypt, { compare } from "bcrypt";

// for hashing the passwor for security
export const hashedpassword = async (password) => {
  try {
    const hashRound = 10;
    const hashedPassword = await bcrypt.hash(password, hashRound);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

// for comparing the password
export const comparedPassword = async (password, hashedPassword) => {
    return compare(password, hashedPassword);
};
