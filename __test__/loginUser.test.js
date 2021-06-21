const express = require("express");
const { loginUser } = require('../services/userServices');
const bcrypt = require('bcrypt');
const generateAccessToken = require('../middleware/generateAccessToken');

jest.mock('../models/index');

const { db: { models: { user: Users } } } = require('../models/index');

describe('Login user by email and password', ()=> {
    test("Login user by email and password successfully", async () => {
        const hashPassword = bcrypt.hashSync('gugo', 7);
        const userInfo = {
            email: 'gugo@mail.ru',
            password: hashPassword
        }

        const loginUserbyEmailAndPassword = jest.spyOn(Users, 'findOne');
        const result = new Promise((res) => {
            res(userInfo);
        });

        loginUserbyEmailAndPassword.mockReturnValue(result);

        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTA3LCJuYW1lIjoiR3VnbyIsImV4cCI6MTYyNDAxMzI0OTIxOCwiaWF0IjoxNjI0MDA5NjQ5fQ.YAaEpQY2DWQpcrSFBKeM1dg0j3tHr4lCXIUzPcYdmHM';
        const generateToken = jest.spyOn(generateAccessToken, 'generateAccessToken');
        const mockedToken = new Promise((res) => {
            res(token);
        });
        generateToken.mockReturnValue(mockedToken);

        const resToken = await loginUser('gugo@mail.ru', 'gugo');

        expect(resToken).toBe(token);
    });
});
