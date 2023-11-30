import { Response } from "supertest";
import { expect } from "@jest/globals";

export class ResponseAssertion{

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
    
    public respondsWithValidationErrors = (response: Response) =>{
        expect(response.body).toHaveProperty('errors')
        expect(Array.isArray(response.body.errors)).toBeTruthy()
    }
    
    public respondsWithCreatedResource = (response: Response) =>{
        expect(response.status).toEqual(201)
        expect(response.body.message).toMatch(/created/i)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.header.location).toMatch(
            /\/[.\w]+\/[a-fA-F0-9]{24}/)
    }

    public respondsWithNotFound = (response: Response) =>{
        expect(response.status).toEqual(404)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/not found/i)
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

    public respondsWithModifedResource = (response: Response) =>{
        expect(response.body.message).toMatch(/modified/i)
        expect(response.header.location).toMatch(
            /^\/[.\w]+\/[a-fA-F0-9]{24}$/)
    }
    
    public respondsWithUpdatedResource = (response: Response) => {
        expect(response.body.message).toMatch(/updated/i)
        expect(response.header.location).toMatch(
            /^\/[.\w]+\/[a-fA-F0-9]{24}$/)
    }

    public respondsWithSuccess = (response: Response) =>{
        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toMatch(/json/)
    }

    public respondsWithDeletedResource = (response: Response) =>{
        expect(response.body.id).toMatch(/^[a-fA-F0-9]{24}$/)
        expect(response.body.message).toMatch(/deleted/i)
    }
}

export const assert = new ResponseAssertion