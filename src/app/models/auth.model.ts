// signuprequest
export interface SignupRequest {
    fullName: string;
    email: string;
    password: string;
    role: string;
  }

  export interface VerifyOtpRequest {
    email: string,
    otp: string
  }

  export interface ResendOtpRequest {
    email: string,
  }
  

  //signupresponse