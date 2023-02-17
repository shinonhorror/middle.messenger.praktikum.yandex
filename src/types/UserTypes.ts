export interface UserType {
  avatar: string;
  display_name: string;
  email: string;
  first_name: string;
  id: string;
  login: string;
  phone:string;
  second_name: string;
}
export interface UserUpdateType {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}
export interface UserSign {
  id?: number;
  first_name?: string;
  second_name?: string;
  login: string;
  email?: string;
  password: string;
  phone?: string;
  avatar?: string;
}
