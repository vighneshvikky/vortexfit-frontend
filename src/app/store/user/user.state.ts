
export interface UserState {
    user: {
      name: string;
      email: string;
      role: string;
      _id: string;
    } | null;
    loading: boolean;
    error: string | null;
  }
  
  export const initialState: UserState = {
    user: null,
    loading: false,
    error: null
  };