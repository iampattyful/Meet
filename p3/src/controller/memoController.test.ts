import {Request, Response} from 'express'
import { MemoController } from './memoController'
import { memoService } from '../service/memoService'
import {errorHandler} from '../error'
import {formidable_promise,transfer_formidable_into_obj} from '../helper/helper'
jest.mock('../service/memoService')
jest.mock('../error')
jest.mock('../helper/helper')
describe('MemoController', ()=>{
  let req:Request
  let res:Response

  let memoController:MemoController
  beforeAll(()=>{
    memoController = new MemoController(); 
  })
  beforeEach(()=>{
    req = {} as any
    res = {} as any
    res.json = jest.fn()
  })
  afterEach(()=>{
    jest.resetAllMocks()
  })

  test('getMemo with error',async()=>{
    await (memoService.getMemo as jest.Mock).mockReturnValue([])
    await memoController.getMemo(req as any,res as any)
    expect(errorHandler).toBeCalledTimes(1) 
  })
  test('getMemo', async()=>{
    
    await (memoService.getMemo as jest.Mock).mockReturnValue(['mockVal'])
    await memoController.getMemo(req as any,res as any)
    expect(res.json).toBeCalledWith({
      isErr:false,
      data:['mockVal'],
      errMess:null,
    })
  })
  test('addMemo with error',async()=>{
    await (formidable_promise as jest.Mock).mockReturnValue({})
    await (transfer_formidable_into_obj as jest.Mock).mockReturnValue({})
    await (memoService.addMemo as jest.Mock).mockReturnValue([])
    await memoController.addMemo(req as any, res as any)
    expect(errorHandler).toBeCalledTimes(1) 
  })
  test('addMemo',async()=>{
    let req = {
      params:{},
      body:{},
      session:{userId:1,isLogin:true}
    }
    await (formidable_promise as jest.Mock).mockReturnValue({})
    await (transfer_formidable_into_obj as jest.Mock).mockReturnValue({})
    await (memoService.addMemo as jest.Mock).mockReturnValue(['mockVal'])
    await memoController.addMemo(req as any, res as any)
    expect(res.json).toBeCalledWith({
      data:['mockVal'],
      isErr:false,
      errMess:null
    })
  })

  test('delMemo', async()=>{
    let req = {
      params:{},
      body:{},
      session:{userId:1,isLogin:true}
    }
    await (memoService.delMemo as jest.Mock).mockReturnValue(['mockVal'])
    await memoController.delMemo(req as any, res as any)
    expect(res.json).toBeCalledWith({
      data:null,
      isErr:false,
      errMess:null
    })
  })

  test('likeMemo', async()=>{
    let req = {
      params:{},
      body:{},
      session:{userId:1,isLogin:true}
    }
    await (memoService.likeMemo as jest.Mock).mockReturnValue(['mockVal'])
    await memoController.likeMemo(req as any, res as any)
    expect(res.json).toBeCalledWith({
      data:null,
      isErr:false,
      errMess:null
    })
  })

  test('editMemo', async()=>{
    let req = {
      params:{},
      body:{},
      session:{userId:1,isLogin:true}
    }
    await (formidable_promise as jest.Mock).mockReturnValue({})
    await (transfer_formidable_into_obj as jest.Mock).mockReturnValue({})
    await (memoService.editMemo as jest.Mock).mockReturnValue(['mockVal'])
    await memoController.editMemo(req as any, res as any)
    expect(res.json).toBeCalledWith({
      data:null,
      isErr:false,
      errMess:null
    })
  })
})
