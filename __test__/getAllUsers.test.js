const express = require("express");
const { getUsers } = require('../services/userServices');
const app = require('../userAPI');
const ApiError = require('../middleware/ApiError');

jest.mock('../models/index');

const { db: { models: { user: Users } } } = require('../models/index');

describe('Get all users by ID', ()=> {
    test("Return users with default limit and offset", async () => {
        const count = 20;

        const defaultLimit = 3;
        const defaultOffset = 1;

        const defaultResponse = {
            rows: [
                {
                    name: 'Lilit',
                    email: 'lilit@mail.ru',
                    password: '$2b$07$I0O.h5C9n7gkctamgxD1UOispM0mJbCew.SBSZa85jr7BoThcruIa'
                },
                {
                    name: 'Ashun',
                    email: 'ashun@mail.ru',
                    password: '$2b$07$AF2zXM7lhdSTv6vY0iIJ0eBvuUuUadHrZh20kHpIosRZYsRolS7La'
                },
                {
                    name: 'Arev',
                    email: 'Arev@mail.ru',
                    password: '$2b$07$ypH2qLg/gdQLA/QB9O/1Tu/kZxW2EjsxlmwXmJEUUAvS.7i24IOr2'
                },
            ],
            count: count,
        };

        const getAllUsers = jest.spyOn(Users, 'findAndCountAll');

        const getAllUsersByDefault = new Promise((res) => {
            res(defaultResponse);
        });

        getAllUsers.mockReturnValue(getAllUsersByDefault);

        const result = await getUsers(defaultResponse);

        const { rows: defaultRows } = defaultResponse;

        await expect(getUsers({})).resolves.toEqual({ rows: defaultRows, count });

        const usersFoundDefault = getAllUsers.mock.results[0].value;

        await expect(usersFoundDefault).resolves.toEqual(defaultResponse);
    });

    test("Return empty array", async()=> {
        const emptyResponse = {
            rows: [],
            count: 0,
        };

        const getAllUsers = jest.spyOn(Users, 'findAndCountAll');

        const getEmptyResponse = new Promise((res) => {
            res(emptyResponse);
        });

        getAllUsers.mockReturnValue(getEmptyResponse);

        const { rows: emptyRows } = emptyResponse;

        await expect(getUsers({})).resolves.toEqual({ rows: emptyRows, count: 0 });
    });

    test("Return users with limit and offset", async()=> {
        const count = 20;
        const getAllUsers = jest.spyOn(Users, 'findAndCountAll');

        const limit = 2;
        const offset = 4;

        const response = {
            rows: [
                {
                    name: 'Lilit',
                    email: 'lilit@mail.ru',
                    password: '$2b$07$I0O.h5C9n7gkctamgxD1UOispM0mJbCew.SBSZa85jr7BoThcruIa'
                },
                {
                    name: 'Arev',
                    email: 'Arev@mail.ru',
                    password: '$2b$07$AF2zXM7lhdSTv6vY0iIJ0eBvuUuUadHrZh20kHpIosRZYsRolS7La'
                },
                {
                    name: 'Ashun',
                    email: 'ashun@mail.ru',
                    password: '$2b$07$ypH2qLg/gdQLA/QB9O/1Tu/kZxW2EjsxlmwXmJEUUAvS.7i24IOr2'
                },
                {
                    name: 'fffff',
                    email: 'ffffff@mail.ru',
                    password: '$2b$07$Dtz0Dh.5UAUMxJIYgz/g8ut4n5jumJV9rN36Kv4uKE4jBYW/Bkn0y'
                },
            ],
            count: count,
        };

        const getAllUsersWithLimitOffset = new Promise((res) => {
            res(response);
        });

        getAllUsers.mockReturnValue(getAllUsersWithLimitOffset);

        const result = await getUsers(response);

        const {rows} = response;
        const usersFound = getAllUsers.mock.results[0].value;

        await expect(getUsers({limit, offset})).resolves.toEqual({rows, count});
    });
});

