import { Response, Request, NextFunction } from "express"
import { HydratedDocument } from "mongoose"

export class BaseController{

    public respondWithMethodNotAllowed = (req: Request, res: Response) =>{
        res.status(405).json({ message: 'Method not allowed' })
    }

    public respondWithConflict = (res: Response) =>{
        res.status(409).json({message: 'Cart already exists'})
    }

    public respondWithCreatedResource = (resourceId: string, res: Response) =>{
        res.location(`/carts/${resourceId}`)
        res.status(201).json({ message: 'Created'})
    }

    public respondWithFoundResource = (
        resource: HydratedDocument<any>[]| HydratedDocument<any>, 
        res: Response
        ) =>{
            res.status(200).json({ resource })
    }

    public paginate = (req: Request): Paginator =>{
        const paginator = {
            skipDocs: 0,
            limit: 10
        }

        const page = Math.abs(Number(req.query.page))
        const limit = Math.abs(Number(req.query.limit))

        if(page && limit){
            paginator.skipDocs = (page - 1) * limit
            paginator.limit = limit
        }

        return paginator
    }

    public respondWithNotFound = (res: Response) =>{
        res.status(404).json({ message: 'Resource not Found'})
    }

    public respondWithModifiedResource = (resourceId: string, res: Response) =>{
        res.location(`/carts/${resourceId}`)
        res.status(200).json({ message: 'Modified' })
    } 

    public respondWithUpdatedResource = (resourceId: string, res: Response) =>{
        res.location(`/carts/${resourceId}`)
        res.status(200).json({ message: 'Updated' })
    }

    public respondWithDeletedResource = (id: string, res: Response) =>{
        res.status(200).json({ message: 'Deleted',id })
    }

    public handleUnknownUrls = ( req: Request, res: Response, next: NextFunction ) =>{
        this.respondWithNotFound(res)
        
    }

    public handleServerErrors = ( 
        err:Error, req: Request, res: Response, next: NextFunction) =>{
            if(err){
                res.status(500).json({ message : 'Unexpected server error.'})
                console.log(err.message)
            }
    }
}

export interface Paginator{
    skipDocs: number,
    limit: number
}