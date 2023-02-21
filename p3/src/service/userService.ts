
import { Knex } from "knex";
import { knex } from "../db";
import {Transform} from "./service"
class UserService extends Transform{
    constructor(protected knex:Knex) {
     super()
    }
    async login(obj:any){
        
        try {
        // let {rows} = await db.query(`
        //         SELECT id,username 
        //         FROM "users"
        //         WHERE "username" = $1 AND "password" = $2`,
        //       [obj.username, obj.password])
        let rows = await this.knex.select("id","username").from("users").where("username",obj.username).andWhere("password",obj.password)
        return rows
        } catch (err) {
            throw new Error(`${err.message}`)
        }
        
        
    }
    async getCurrentUser(userId:number){
        try {
            // let {rows} = await db.query(`
            //     SELECT username 
            //     FROM "users"
            //     WHERE "id" = $1`,
            //   [userId])
            
            let rows = await this.knex.select("username").from("users").where("id",userId)
        
            return rows
        } catch (err) {
            throw new Error(`${err.message}`)
        }
        
    }
}


export const userService = new UserService(knex)