import { IUser } from '../../data-access/model'

export const validUserData: IUser = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@gmail.com',
    password: 'password'
}

export const userWithExistingEmail: IUser = {
    first_name: 'Existing',
    last_name: 'User',
    email: 'existingEmail@gmail.com',
    password: 'password'
}

export const invalidUserData = {
    name: 'John doe',
    email: 'johndoe@gmail.com',
    password: 'password'
}

export const validPartialData = {
    last_name: 'Doe',
    email: 'johndoe@gmail.com',
    password: 'password'
}

export const invalidPartialData = {//password is required
    email: 'johndoe@gmail.com'
}