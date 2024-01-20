import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMutation } from "react-query";
import axios from "axios";

import { localStorageManager } from "@/services";

import { REFRESH_TOKEN, ROLE, TOKEN } from "@/constants";

import routes from "@/routes";

import {
  HttpErrorResponse,
  IForgotFormValues,
  ILoginFormValues,
  IRegistrationFormValues,
} from "@/interfaces/auth.interfaces";

type RegistrationType = {
  message: string;
};

type ForgotPasswordType = {
  detail: string;
};

type LoginType = {
  access: string;
  refresh: string;
};

interface UserDataInterface {
  createdAt: string;
  email: string;
  id: string;
  password: string;
  role: string;
  updatedAt: string;
  _id: string;
  name: string;
  avatar?: string;
  oldAvatar?: string;
  avatarPublicId?: string;
}

interface AuthContextInterface {
  isInitializing: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  userData: UserDataInterface | null;
  signUp: (userData: IRegistrationFormValues) => Promise<RegistrationType>;
  login: (userData: ILoginFormValues) => Promise<LoginType>;
  forgotPassword: (userData: IForgotFormValues) => Promise<ForgotPasswordType>;
  logout: () => void;
  role: string;
  handleAuth: (
    access_token: string,
    refresh_token: string,
    rememberMe: boolean
  ) => void;
}

const authAPI = axios.create({
  baseURL: routes.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

authAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    throw new Error(error.response.data.message);
  }
);

const signUpMutation = (userData: IRegistrationFormValues) =>
  authAPI.post(routes.registration, userData).then((res) => res.data);

const loginMutation = (userData: ILoginFormValues) =>
  authAPI.post(routes.getTokens, userData).then((res) => res.data);

const forgotPasswordMutation = (userData: IForgotFormValues) =>
  authAPI.post(routes.forgotPassword, userData).then((res) => res.data);

export const AuthContext = createContext<AuthContextInterface | null>(null);

export const useAuth = () => useContext(AuthContext) as AuthContextInterface;

export const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("");
  const [token, setAuthToken] = useState(() => {
    return localStorageManager.getItem(TOKEN) || "";
  });

  const [refreshToken, setAuthRefreshToken] = useState(() => {
    return localStorageManager.getItem(REFRESH_TOKEN) || "";
  });

  const { mutateAsync: loginRequestMutation } = useMutation(
    "loginMutation",
    (values: ILoginFormValues) => loginMutation(values)
  );

  const { mutateAsync: signUpRequestMutation } = useMutation(
    "signUpMutation",
    (values: IRegistrationFormValues) => signUpMutation(values)
  );

  const { mutateAsync: forgotRequestMutation } = useMutation(
    "forgotPasswordMutation",
    (values: IForgotFormValues) => forgotPasswordMutation(values)
  );

  const signUp = async (userData: IRegistrationFormValues) => {
    try {
      const data = await signUpRequestMutation(userData);
      return data;
    } catch (e) {
      throw new Error((e as HttpErrorResponse).message);
    }
  };

  const login = async (userData: ILoginFormValues) => {
    try {
      const data = await loginRequestMutation(userData);
      const { access, refresh, role } = data;

      const localRole = localStorageManager.getItem(ROLE);

      if (role) {
        if (role !== localRole) {
          localStorageManager.setItem(ROLE, role);
          setRole(role);
        } else if (localRole !== null) {
          setRole(localRole);
        }
      }

      access && refresh && setToken(access, refresh);

      return data;
    } catch (e) {
      throw new Error((e as HttpErrorResponse).message);
    }
  };

  const forgotPassword = async (userData: IForgotFormValues) => {
    try {
      const data = await forgotRequestMutation(userData);
      return data;
    } catch (e) {
      throw new Error((e as HttpErrorResponse).message);
    }
  };

  const resetToken = async () => {
    localStorageManager.removeItem(TOKEN);
    localStorageManager.removeItem(REFRESH_TOKEN);
  };

  const setToken = (access_token: string, refresh_token: string) => {
    localStorageManager.setItem<typeof access_token>(TOKEN, access_token);
    localStorageManager.setItem<typeof refresh_token>(
      REFRESH_TOKEN,
      refresh_token
    );
    setAuthToken(access_token);
    setAuthRefreshToken(refresh_token);
  };

  const handleAuth = (access_token: string, refresh_token: string) => {
    setToken(access_token, refresh_token);
  };

  const logout = () => {
    resetToken();
    localStorageManager.removeUser();
    setAuthToken("");
    setAuthRefreshToken("");
  };

  useEffect(() => {
    token && refreshToken ? handleAuth(token, refreshToken) : logout();
  }, []);

  useEffect(() => {
    const localRole = localStorageManager.getItem(ROLE);
    if (localRole) {
      setRole(localRole);
    }
  }, []);

  const isInitializing = !!token;

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        isInitializing,
        isAuthenticated,
        userData,
        role,
        isLoading,
        signUp,
        login,
        handleAuth,
        forgotPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
