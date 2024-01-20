export interface IUser {
  id: number;
  last_login: null | string;
  is_superuser: boolean;
  email: string;
  name: string;
  nickname: null | string;
  bio: null | string;
  gender: null | string;
  phone: null | string;
  notifications_enabled: boolean;
  password_reset_token: null | string;
  customer_id: string;
  payment_method_id: null | string;
  subscription_id: null | string;
  current_plan: null | string;
  groups: Number[];
  user_permissions: Number[];
  role: string;
  preferred_name?: string;
  phone_number?: number;
  phone_number_type?: string;
  address?: string;
  city?: string;
  zip_code?: string;
  linkedin?: string;
  state?: string;
  sex?: string;
  sex_orientation?: string;
  latino?: string;
  veteran?: string;
  disability?: string;
  authorized_to_work?: string;
  visa?: string;
  visa_type?: string;
  availability_start?: string;
  preferred_job?: string;
  compensation?: string;
  preferred_industries?: string;
  preferred_job_locations_states?: string;
  preferred_job_locations_countries?: string;
  willing_to_relocate?: string;
  work_location_type?: string;
  experience_level?: string;
  position_level?: string;
  status: string;
  concierge?: string;
  tokens: number;
  requested_tokens: number;
}

export interface IUserData {
  user: IUser;
}

export interface IEditUser {
  role?: string;
  concierge?: string;
  status?: string;
}

export interface IConceirge {
  id: number;
  user: IUser;
}

export interface IConceirgeUsers {
  users: IUser[];
}
