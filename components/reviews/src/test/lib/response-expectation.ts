import { expect } from "@jest/globals"
import { Response } from "supertest"

class APIResponseExpectations{

    public expectMethodNotAllowedResponse = (response: Response) =>{
        
    }

    public expectBadRequestResponse = (response: Response) =>{
        expect(response.status).toEqual(400)
        expect(response.body.message).toMatch(/invalid/)
        expect(response.headers['content-type']).toMatch(/json/)


    }
    public expectResponseWithErrorsArray = (response: Response) =>{

    }
}

export const expectations = new APIResponseExpectations()