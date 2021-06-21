const express = require("express");
const { updateUser } = require('../services/userServices');

jest.mock('../models/index');

const { db: { models: { user: Users } } } = require('../models/index');

describe('Get user by ID', ()=> {
    test("Get user by ID successfully", async () => {
        const user = jest.spyOn(Users, 'update');
        const mockedUser = new Promise((res) => {
            res({
                name: 'alo',
                email: 'alo@mail.ru',
                password: 'alo'
            });
        });

        user.mockReturnValue(mockedUser);

        const result = await updateUser(105);
        expect(result).toEqual({
            name: 'alo',
            email: 'alo@mail.ru',
            password: 'alo'
        });
        expect(result).toHaveProperty('name');
        expect(result).toHaveProperty('email');
        expect(result).toHaveProperty('password');
        expect(Users.update).toHaveBeenCalled();
    });
});
