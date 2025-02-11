import axios from "axios";

const loginService = async (email: string, password: string) => {
  try {
    const response = await axios.post("http://localhost:4002/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      if (err.response && err.response.data) {
        throw {
          message: err.response.data.message,
          errors: err.response.data.errors,
        };
      }
    }
    throw new Error("An unexpected error occurred. Please try again.");
  }
};

export default loginService;
