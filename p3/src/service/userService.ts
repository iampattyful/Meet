import { Knex } from "knex"
import { knex } from "../db";
import { checkPassword } from "../hash";

export class UserService {
    constructor(protected knex:Knex){}
    async login(obj:any){
        try{
            const usersRows = await this.knex.select("*").from("users").where("email",obj.email)
            if (usersRows.length == 0){
                return {success:false,err:"User doesn't exist"}
            }
            const checked = await checkPassword(obj.password,usersRows[0].hash_password)
            if (checked){
                return {success:true,user:usersRows}
            }else{
                return {success:false,err:"Wrong Password"}
            }
        }catch(err){
            throw new Error(`${err.message}`)
        }
    }
}
export let userService = new UserService(knex)