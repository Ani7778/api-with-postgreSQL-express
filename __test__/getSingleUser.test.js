const express = require("express");
const { getSingleUser } = require('../services/userServices');
const app = require('../userAPI');
const ApiError = require('../middleware/ApiError');

jest.mock('../models/index');

const { db: { models: { user: Users } } } = require('../models/index');

describe('Get user by ID', ()=> {
    test("Get user by ID successfully", async () => {
        const getUser = jest.spyOn(Users, 'findByPk');
        const mockedGetUser = new Promise((res) => {
            res({
                name: 'Yuriy',
                email: 'yuriy@mail.ru',
                password: 'yuriy'
            });
        });

        getUser.mockReturnValue(mockedGetUser);

        const user = await getSingleUser(105);
        expect(user).toEqual({
            name: 'Yuriy',
            email: 'yuriy@mail.ru',
            password: 'yuriy'
        });
        expect(user).toHaveProperty('name');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('password');
    });

    test("User doesn't exist", async ()=> {
        const user = await getSingleUser(1005);

        const getUser = jest.spyOn(Users, 'findByPk');
        const mockedGetUser = new Promise((res) => {
            res(null);
        });
        getUser.mockReturnValue(mockedGetUser);

        await expect(getSingleUser(1005)).rejects.toThrow(ApiError);
     })
});
