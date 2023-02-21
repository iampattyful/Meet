import express from "express";
import {isLoggedInAPI} from '../guard'
class Routes {
    routes:express.Router = express.Router()
}

export abstract class UserRoutes extends Routes{
    constructor(){
        super()
        this.routes.post('/logout',this.logout)
        this.routes.post('/login',this.login)
        this.routes.get('/getCurrentUser',isLoggedInAPI,this.getCurrentUser)
    }

    public abstract logout(req:express.Request,res:express.Response):any
    public abstract login(req:express.Request,res:express.Response):any
    public abstract getCurrentUser(req:express.Request,res:express.Response):any
}
export abstract class MemoRoutes extends Routes{
    constructor(){
        super()
        this.routes.post('/addMemo',isLoggedInAPI,this.addMemo)
        this.routes.delete('/delMemo/:id',isLoggedInAPI,this.delMemo)
        this.routes.post('/likeMemo/:id',isLoggedInAPI,this.likeMemo)
        this.routes.put('/editMemo/:id',isLoggedInAPI,this.editMemo)
        this.routes.get('/getMemo',this.getMemo)
    }

    public abstract addMemo(req:express.Request,res:express.Response):any
    public abstract delMemo(req:express.Request,res:express.Response):any
    public abstract likeMemo(req:express.Request,res:express.Response):any
    public abstract editMemo(req:express.Request,res:express.Response):any
    public abstract getMemo(req:express.Request,res:express.Response):any
}