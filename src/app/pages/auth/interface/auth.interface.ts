export interface LoginResponse {
    message: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
    loggedIn: boolean;
  }
  