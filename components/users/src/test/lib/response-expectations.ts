import { Response } from "supertest";
import { expect } from "@jest/globals";

export class APIResponseExpectations{
    public expectMethodNotAllowedResponse = (response: Response) =>{
        expect(response.status).toEqual(405)
        expect(response.body.message).toMatch(/not allowed/i)
        expect(response.headers['content-type']).toMatch(/json/i)
    }
    
    public expectBadRequestResponse = (response: Response) =>{
        expect(response.status).toEqual(400)
        expect(response.body.message).toMatch(/invalid/i)
        expect(response.headers['content-type']).toMatch(/json/)
    }
    
    public expectConflictResponse = (response: Response) =>{
        expect(response.status).toEqual(409)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/exists/)
    }

    public expectCreatedResponse = (response: Response) =>{
        expect(response.status).toEqual(201)
        expect(response.body.message).toMatch(/created/i)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.header.location).toMatch(
            /\/[.\w]+\/[a-fA-F0-9]{24}/)
    }

    public expectErrorResponseWithArray = (response: Response) =>{
        expect(response.body).toHaveProperty('errors')
        expect(Array.isArray(response.body.errors)).toBeTruthy()
    }
    
    public expectNotFoundResponse = (response: Response) =>{
        expect(response.status).toEqual(404)
        expect(response.body.message).toMatch(/not found/)
        expect(response.headers['content-type']).toMatch(/json/)
    }
    
    public expectResponseWithUserDocument = (response: Response) =>{
        expect(response.body).toHaveProperty('user')
        expect(response.body.user).toHaveProperty('_id')
        expect(response.body.user).not.toHaveProperty('password')
    }

    public expectResponseWithPaginatedUsersArray = (
        response: Response, limit: number) =>{
            const users = response.body.users

            expect(Array.isArray(users)).toBeTruthy()
            expect(users.length).toEqual(limit)
    }

    public expectSuccessfulDeletionResponse = (
        response: Response) =>{
        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/deleted/i)
    }

    public expectSuccessfullPatchResponse = (response: Response) =>{
        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/modified/i)
        expect(response.header.location).toMatch(
            /^\/[.\w]+\/[a-fA-F0-9]{24}$/)
    }

    public expectSuccessfulResponse = (response: Response) =>{
        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toMatch(/json/)
    }

    public expectUpdatedResponse = (response: Response) => {
        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/updated/i)
        expect(response.header.location).toMatch(
            /^\/[.\w]+\/[a-fA-F0-9]{24}$/)
    }
}

export const expectations = new APIResponseExpectations