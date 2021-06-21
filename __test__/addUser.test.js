const express = require("express");
const { getSingleUser } = require('../services/userServices');
const bcrypt = require('bcrypt');

jest.mock('../models/index');
jest.mock('bcrypt');

const { db: { models: { user: Users } } } = require('../models/index');

describe('Add user', ()=> {
    test("Add user successfully", async () => {
        const hashedPassword = bcrypt.hashSync('yuriy', 7);
        const userInfo = {
            name: 'Yuriy',
            email: 'yuriy@mail.ru',
            password: hashedPassword
        }

        const addUser = jest.spyOn(Users, 'create');

        const mockedAddUser = new Promise((res) => {
               res(userInfo);
        });

        addUser.mockReturnValue(mockedAddUser);

        const result = await addUser();

        expect(result).toEqual(userInfo);
        expect(result).toHaveProperty('name');
        expect(result).toHaveProperty('email');
        expect(result).toHaveProperty('password');
        expect(Users.create).toHaveBeenCalled();
    });
});
