//useless

import { resultType } from "../eg_model";

export class Transform {
  add_param_insert(counter: number, len: number): string {
    let str = "";
    str += "(";
    for (let i = 0; i < len; i++) {
      str = str + `$${counter}` + ",";
      counter = counter + 1;
    }
    str = this.rm_last(str);
    str += ")";
    return str;
  }
  add_param_update(counter: number, arr: string[]): string {
    let str = "";

    for (let k of arr) {
      str = str + `${k}=$${counter}` + ",";
      counter = counter + 1;
    }
    str = this.rm_last(str);

    return str;
  }

  transformer(data: unknown[], method: string): resultType {
    let result: resultType = {
      sql_params: "",
      sql_values: [],
      sql_field: "",
    };

    let counter = 1;
    data.forEach((obj: any) => {
      let len = Object.keys(obj).length;

      for (let val of Object.values(obj)) {
        result.sql_values.push(val);
      }
      if (method === "insert") {
        result.sql_params =
          result.sql_params + `${this.add_param_insert(counter, len)}` + ",";
      } else if (method === "update") {
        result.sql_params =
          result.sql_params +
          `${this.add_param_update(counter, Object.keys(obj))}` +
          ",";
      }

      if (counter === 1) {
        result.sql_field = Object.keys(obj).reduce(
          (acc, cur) => acc + cur + ",",
          ""
        );
      }

      counter = counter + 1;
    });

    result.sql_params = this.rm_last(result.sql_params);
    result.sql_field = this.rm_last(result.sql_field);
    return result;
  }
  rm_last(str: string): string {
    return str.slice(0, -1);
  }
}
