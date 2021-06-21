const express = require("express");
const { deleteUser } = require('../services/userServices');
const ApiError = require('../middleware/ApiError');

jest.mock('../models/index');

const { db: { models: { user: Users } } } = require('../models/index');

describe('Delete user by ID', ()=> {
    test("Delete user by ID successfully", async () => {
        const user = jest.spyOn(Users, 'destroy');
        const mockedDeleteUser = new Promise((res) => {
            res({
                name: 'name',
                email: 'email@mail.ru',
                password: 'password'
            });
        });

        user.mockReturnValue(mockedDeleteUser);

        const result = await deleteUser(105);

        expect(result).toEqual({
            name: 'name',
            email: 'email@mail.ru',
            password: 'password'
        });
        expect(result).toHaveProperty('name');
        expect(result).toHaveProperty('email');
        expect(result).toHaveProperty('password');
    });

    test("User doesn't exist", async ()=> {
        const user = jest.spyOn(Users, 'destroy');
        const mockedDeleteUser = new Promise((res) => {
            res(null);
        });

        user.mockReturnValue(mockedDeleteUser);

        const result = await deleteUser(3005);

        await expect(deleteUser(3005)).resolves.toBeNull();
    })
});
