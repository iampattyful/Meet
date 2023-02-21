import { Knex } from "knex"

import { knex } from "../db"
import { Transform } from "./service"


interface memo{
    id:number
    content:string
    image:string
    users_id:number
    like_count:number
}

export class MemoService extends Transform {
    constructor(protected knex:Knex) {
        super()
    }
    async rollback(txn:Knex.Transaction){
        await txn.rollback();
    }
    async commit(txn:Knex.Transaction){
        await txn.commit();
    }
    private async selectAllMemo(txn:Knex.Transaction):Promise<memo[]>{
        
        return await txn("memo").select("id","content","image","users_id","like_count").orderBy("created_at","asc")
        
    }
    async getMemo():Promise<memo[]>{
        const txn = await this.knex.transaction()
        try{
            // let query_result = await this.db.query(`SELECT * FROM memo ORDER BY created_at`)
            let query_result = await this.selectAllMemo(txn)
            await this.commit(txn);
            return query_result
        }catch(err){
            await this.rollback(txn)
            throw new Error(`${err.message}`)
        }
    }
    async addMemo(obj: any, userId: number):Promise<memo[]> {
        const txn = await this.knex.transaction()
        try{
            obj = Object.assign(obj, { users_id: userId, like_count: 0 })
            // let sql_obj = super.transformer([obj], 'insert')

            // await this.db.query(`INSERT INTO memo (${sql_obj.sql_field}) values ${sql_obj.sql_params}`,
            // sql_obj.sql_values)
            await txn.insert([obj]).into("memo")
            
            // let query_result = await this.db.query(`SELECT * FROM memo ORDER BY created_at`)
            let query_result = await this.selectAllMemo(txn)
            await this.commit(txn);
            return query_result
        }catch(err){
            await this.rollback(txn)
            throw new Error(`${err.message}`)
        }
        
    }
    async delMemo(id: number, userId: number) {
        const txn = await this.knex.transaction()
        try{
            // await this.db.query(`DELETE FROM like_memo WHERE memo_id=$1`,
            // [id])
            await txn("like_memo").where("memo_id",id).del()
            // await this.db.query(`DELETE FROM memo WHERE id=$1 AND users_id=$2`,
            // [id, userId])
            await txn("memo").where("id",id).andWhere("users_id",userId).del()
            await this.commit(txn);
            return
        }catch(err){
            await this.rollback(txn)
            throw new Error(`${err.message}`)
        }
        
    }
    async editMemo(obj: any, id: number, userId: number):Promise<void> {
        const txn = await this.knex.transaction()
        try{
            // let counter = Object.keys(obj).length + 1

            // let sql_obj = super.transformer([obj], 'update')

            // sql_obj.sql_values.push(id)
            // sql_obj.sql_values.push(userId)
            
            // this.db.query(`UPDATE memo SET ${sql_obj.sql_params} WHERE id=$${counter} AND users_id=$${counter + 1}`,
            //     sql_obj.sql_values)
            await txn("memo").update(obj).where("id",id).andWhere("users_id",userId);
            await this.commit(txn);
            return
        }catch(err){
            await this.rollback(txn)
            throw new Error(`${err.message}`)
        }
        
    }
    async likeMemo(id: number, userId: number):Promise<void> {
        const txn = await this.knex.transaction();
            try {
                
                // let s = await txn.raw(/*sql*/`UPDATE memo SET like_count=like_count+1 WHERE id=? AND users_id!=? AND id NOT IN (SELECT memo_id FROM like_memo WHERE users_id = ?) RETURNING id`,
                // [id,userId,userId])
                let [q]:{like_count:number}[] = await txn.select("like_count").from("memo").where("id",id)        
                console.log(q,'qqq')
                if(!q){
                    
                    throw new Error("Not exist this memo")
                }
                //  let s = await this.db.query(`UPDATE memo SET like_count=like_count+1 WHERE id=$1 AND users_id!=$2 AND id NOT IN (SELECT memo_id FROM like_memo WHERE users_id = $3)`,
                //  [id, userId, userId])
                let s = await txn("memo").update({"like_count":q.like_count+1})
                .whereNotIn("id",function(){this.select("memo_id").from("like_memo").where("users_id",userId)})
                .andWhere("id",id).andWhereNot("users_id",userId)
                .returning("id")
                console.log(s,'sssss')
                if(s.length > 0){
                // let sql_obj = await super.transformer([{ 'users_id': userId, 'memo_id': id }], 'insert')
                // await db.query(`INSERT INTO like_memo (${sql_obj.sql_field}) VALUES ${sql_obj.sql_params}`, sql_obj.sql_values)
                    await txn.insert([{'users_id':userId,'memo_id':id}]).into("like_memo")
                    await this.commit(txn);
                    return
                }else{
                    
                    throw new Error("Cannot like this memo")
            
                }    
            } catch (err) {
                await this.rollback(txn)
                throw new Error(`${err.message}`)
                
            }
        
    }
    
    
}

export const memoService = new MemoService(knex)