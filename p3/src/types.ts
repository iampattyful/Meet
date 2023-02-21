export type Result = {
  data: any;
  isErr: boolean | null;
  errMess: string | null;
};
export type formResult = {
  fields?: any;
  files?: any;
};

export type resultType = {
  sql_params: string;
  sql_values: any[];
  sql_field: string;
};
