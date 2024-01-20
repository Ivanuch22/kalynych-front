export interface ILoginFormValues {
  email: string;
  password: string;
}

export interface IRegistrationFormValues {
  name: string;
  email: string;
  password: string;
}

export interface IForgotFormValues {
  email: string;
}

export interface HttpErrorResponse {
  message: string;
}
