import { Response } from "supertest";
import { expect } from "@jest/globals";

export class APIResponseExpectations{
    public respondsWithMethodNotAllowed = (response: Response) =>{
        expect(response.status).toEqual(405)
        expect(response.body.message).toMatch(/not allowed/i)
        expect(response.headers['content-type']).toMatch(/json/i)
    }
    
    public respondsWithBadRequest = (response: Response) =>{
        expect(response.status).toEqual(400)
        expect(response.body.message).toMatch(/invalid/i)
        expect(response.headers['content-type']).toMatch(/json/)
    }
    
    public respondsWithConflict = (response: Response) =>{
        expect(response.status).toEqual(409)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/exists/)
    }

    public respondsWithCreatedResource = (response: Response) =>{
        expect(response.status).toEqual(201)
        expect(response.body.message).toMatch(/created/i)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.header.location).toMatch(
            /\/[.\w]+\/[a-fA-F0-9]{24}/)
    }

    public respondsWithValidationErrorsArray = (response: Response) =>{
        expect(response.body).toHaveProperty('errors')
        expect(Array.isArray(response.body.errors)).toBeTruthy()
    }
    
    public respondsWithNotFoundError = (response: Response) =>{
        expect(response.status).toEqual(404)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/not found/)
    }
    
    public respondsWithFoundResource = (response: Response) =>{
        expect(response.body).toHaveProperty('resource')
        expect(response.body.resource).toHaveProperty('_id')
    }

    public respondsWithPaginatedResource = (
        response: Response, limit: number) =>{

            expect(response.body).toHaveProperty('resource')

            const resource = response.body.resource
            expect(Array.isArray(resource)).toBeTruthy()
            expect(resource.length).toEqual(limit)
    }

    public respondsWithDeletedResource = (response: Response) =>{
        expect(response.body.id).toMatch(/^[a-fA-F0-9]{24}$/)
        expect(response.body.message).toMatch(/deleted/i)
    }

    public respondsWithModifedResource = (response: Response) =>{
        expect(response.body.message).toMatch(/modified/i)
        expect(response.header.location).toMatch(
            /^\/[.\w]+\/[a-fA-F0-9]{24}$/)
    }

    public respondsWithSuccess = (response: Response) =>{
        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toMatch(/json/)
    }

    public respondsWithUpdatedResource = (response: Response) => {
        expect(response.body.message).toMatch(/updated/i)
        expect(response.header.location).toMatch(
            /^\/[.\w]+\/[a-fA-F0-9]{24}$/)
    }
}

export const expectations = new APIResponseExpectations