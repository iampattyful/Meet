export type FormResult = {
  fields?: any;
  files?: any;
};

export type User = {
  username?: string;
  password?: string;
  email?: string;
  user_icon?: string;
  date_of_birth?: Date;
  gender?: string;
};

// FilterForm type is used in filterController.ts
export type FilterForm = {
  gender: string;
  minAge: number;
  maxAge: number;
};

// UserRows type is used in filterService.ts
export type UserRows = {
  username: string;
  user_icon: string;
  date_of_birth: Date;
  gender: string;
  // location?: string;
};
