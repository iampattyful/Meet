import { errorHandler } from './error';
import { Request,Response } from "express";
describe('Error handler', () => {
    let req: Request
    let res: Response
    beforeEach(() => {
        req = {} as any
        res = {} as any
        res.json = jest.fn()
    })
    afterEach(() => {
        jest.resetAllMocks()
    });

    test('test error handler', async () =>{
        let errObj = {message:'error'}
        req = {route:{path:'mockRoute'}} as any
        errorHandler(errObj, req as any,res as any)
        expect(res.json).toBeCalledWith(
        {
            isErr:true,
            errMess:errObj.message + ' - ' + req.route.path,
            data:null
        }
        )  
    })

})  