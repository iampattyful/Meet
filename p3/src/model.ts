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

export type UserInformation = {
  username?: string;
  user_icon?: string;
  date_of_birth?: Date;
  gender?: string;
};

// FilterForm type is used in filterController.ts
export type FilterForm = {
  gender: string[];
  minAge: number;
  maxAge: number;
  userId?: number;
};

// UserRows type is used in filterService.ts
export type UserRows = {
  id: number;
  username: string;
  user_icon: string;
  date_of_birth: Date;
  gender: string;
  // location?: string;
};

export type EditProfile = {
  //user
  username?: string;
  about_me?: string;
  password?: string;
  //////user icon maybe s3///////
  user_icon?: string;
  ///////////////////////////
  location?: string;

  //personal_information
  education_level?: string;
  job?: string;
  nationality?: string;
  height?: number;
  weight?: number;
  pet?: boolean;
  fitness?: boolean;
  smoke?: boolean;
  drink?: boolean;

  //tag
  tag_name?: string;

  // image
  image: string;
};
