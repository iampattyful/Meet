import path from 'path'
import {Knex as KnexType} from 'knex'
import Knex from 'knex'
import { MemoService } from './memoService'
describe('MemoService Integration Test without transaction', () => {
    let service: MemoService
    let knex:KnexType
    beforeAll(async () => {
        const p = path.join(__dirname, '../migrations')
        const p2 = path.join(__dirname, '../seeds')
        const knexConfigs = require('../knexfile');
        knex = Knex(knexConfigs['test'])
        await knex.migrate.rollback({ directory: p }, true)
        await knex.migrate.latest({ directory: p })
        await knex.seed.run({ directory: p2 })
            
    })
    beforeEach(() => {
        service = new MemoService(knex)
    })
    it('getMemo', async () => {
        let result = await service.getMemo()
        expect(result).toEqual([
            { "content": "memo2_jim", "id": 2, "image": null, "like_count": 0, "users_id": 1 },
            { "content": "memo1_alex", "id": 3, "image": null, "like_count": 0, "users_id": 2 },
            { "content": "memo1_leo", "id": 4, "image": null, "like_count": 0, "users_id": 3 },
            { "content": "memo1_jim", "id": 1, "image": null, "like_count": 1, "users_id": 1 }
        ])
    })
    it('addMemo', async ()=>{
        
        let userId = 1
        let obj = {"content":"memo3_jim"}
        let result = await service.addMemo(obj,userId)
        expect(result).toEqual([
            { "content": "memo2_jim", "id": 2, "image": null, "like_count": 0, "users_id": 1 },
            { "content": "memo1_alex", "id": 3, "image": null, "like_count": 0, "users_id": 2 },
            { "content": "memo1_leo", "id": 4, "image": null, "like_count": 0, "users_id": 3 },
            { "content": "memo1_jim", "id": 1, "image": null, "like_count": 1, "users_id": 1 },
            { "content": "memo3_jim", "id": 5, "image": null, "like_count": 0, "users_id": 1 },
        ])
    })
    it('editMemo', async ()=>{
        let id = 5
        let userId = 1
        let obj = {"content":"memo3_edit_jim"}
        let result = await service.editMemo(obj,id,userId)
        expect(result).toEqual(undefined)
    })
    it('likeMemo', async ()=>{
        let id = 5
        let userId = 2
        let result = await service.likeMemo(id,userId)
        expect(result).toEqual(undefined)
    })
    it('delMemo',async ()=>{
        let id = 5
        let userId = 1
        let result = await service.delMemo(id,userId)
        expect(result).toEqual(undefined)
    })

})    


describe('MemoService Integration Test with transaction and error', () => {
    let service: MemoService
    let knex:KnexType
    beforeAll(async () => {
        const p = path.join(__dirname, '../migrations')
        const p2 = path.join(__dirname, '../seeds')
        const knexConfigs = require('../knexfile');
        knex = Knex(knexConfigs['test'])
        await knex.migrate.rollback({ directory: p }, true)
        await knex.migrate.latest({ directory: p })
        await knex.seed.run({ directory: p2 })
            
    })
    beforeEach(() => {
        service = new MemoService(knex)
    })
    it('getMemo commit', async ()=>{
        service.commit = jest.fn()
        try {
            await service.getMemo()
            expect(service.commit).toBeCalled()
        } catch (error) {
            
        }
    })
    it('addMemo commit', async ()=>{
        service.commit = jest.fn()
        let userId = 1
        let obj = {"content":"memo3_jim"}
        try {
            await service.addMemo(obj,userId)
            expect(service.commit).toBeCalled()
        } catch (error) {
            
        }
    })
    it('addMemo rollback', async ()=>{
        service.rollback = jest.fn()
        let userId = 10
        let obj = {"content":"memo3_jim"}
        try {
            await service.addMemo(obj,userId)
            
        } catch (error) {
            expect(service.rollback).toBeCalled()
        }
    })
    it('addMemo error mess', async ()=>{
        
        let userId = 1
        let obj = {"cont":"memo3_jim"}
        try {
            await service.addMemo(obj,userId)
            
        } catch (err) {
            expect(err.message).toContain('cont')
        }
    })

    it('edit memo commit', async ()=>{
        let id = 5
        let userId = 1
        let obj = {"content":"memo3_edit_jim"}
        service.commit = jest.fn()
        try {
            await service.editMemo(obj,id,userId)
            expect(service.commit).toBeCalled()
        } catch (error) {
            
        }
        
    })
    it('editMemo rollback',async()=>{
        let id = 20
        let userId = 1
        let obj = {"content":"memo3_edit_jim"}
        service.rollback = jest.fn()
        try {
            await service.editMemo(obj,id,userId)
        } catch (error) {
            expect(service.rollback).toBeCalled()
        }
    })
    it('editMemo errMess', async()=>{
        let id = 20
        let userId = 1
        let obj = {"cont":"memo3_edit_jim"}
        try{
            await service.editMemo(obj,id,userId)
        }catch(err){
            expect(err.message).toContain('cont')
        }
    })
    it('likeMemo errMess - Not exist this memo', async ()=>{
        let id = 10;
        let userId = 2
        try {
            await service.likeMemo(id,userId)
        } catch (err) {
            expect(err.message).toEqual('Not exist this memo')
        }
    })
    it('likeMemo errMess - Cannot like this memo', async ()=>{
        let id = 1;
        let userId = 2
        try {
            await service.likeMemo(id,userId)
        } catch (err) {
            expect(err.message).toEqual('Cannot like this memo')
        }
    })
    it('likeMemo commit',async ()=>{
        let id = 5
        let userId = 2
        service.commit = jest.fn()
        try {
            await service.likeMemo(id,userId)
            expect(service.commit).toBeCalled()    
        } catch (err) {
            
        }
        
    })
    it('likeMemo rollback',async ()=>{
        let id = 10
        let userId = 2
        service.rollback = jest.fn()
        try {
            await service.likeMemo(id,userId)
            
        } catch (err) {
            expect(service.rollback).toBeCalled()    
        }
        
    })

    it('delMemo commit',async()=>{
        let id = 5
        let userId = 1
        service.commit = jest.fn()
        try {
            await service.delMemo(id,userId)
            expect(service.commit).toBeCalled()    
        } catch (error) {
            
        }
        
    })
    it('delMemo rollback',async()=>{
        let id = 10
        let userId = 1
        service.rollback = jest.fn()
        try {
            await service.delMemo(id,userId)
            
        } catch (error) {
            expect(service.rollback).toBeCalled()    
        }
        
    })


})    