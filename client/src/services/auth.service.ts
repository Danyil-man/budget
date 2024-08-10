import { instanceApi } from "../api/axios.api";
import { IUser, IUserDTO, IUserResponse } from "../types/types";

export const AuthService = {
  async registration(userData: IUserDTO): Promise<IUserResponse> {
    const { data } = await instanceApi.post<IUserResponse>("/user", userData);
    return data;
  },
  async login(userData: IUserDTO): Promise<IUser> {
    const { data } = await instanceApi.post<IUser>("/auth/login", userData);
    return data;
  },
  async getMe(): Promise<IUser | undefined> {
    const { data } = await instanceApi.get<IUser>("/auth/profile");
    return data;
  },
};
