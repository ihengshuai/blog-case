export interface IUserAddress {
  country?: string;
  province?: string;
  city?: string[];
}
export interface IUser extends IUserAddress {
  id?: number;
  name: string;
  age?: number;
  sex?: "male" | "female";
  friend?: string;
  income?: number;
  /** 爱好 */
  hobbies?: string[];
  /** 出生日期 */
  createTime?: string;
}

export interface IUserResponse extends Omit<IUser, keyof IUserAddress> {
  address?: IUserAddress;
}

/**
 * 登录用户
 */
export interface ILoginUser {
  username: string;
  password: string;
}

/**
 * 用户搜索
 */
export interface IUserListFilter {
  /** 关键字 */
  keywords?: string;
  /** 性别 */
  sex?: "male" | "female";
  /** 出生日期 */
  birthRange?: string;
  /** 爱好 */
  hobbies?: number[];
}
