export type FormResult = {
    fields?: any;
    files?: any;
  };

export type User = {
    username?:string;
    password?:string;
    email?:string;
    user_icon?:string;
    date_of_birth?:Date;
    gender?:string;
}