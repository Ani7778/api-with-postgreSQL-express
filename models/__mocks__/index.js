const ModelMock = require('../../utils/mocks/modelMock');

const Sequelize = null;
const sequelize = {
    models: {},
};

sequelize.models.user = new ModelMock();

module.exports.Sequelize = Sequelize;
module.exports.db = sequelize;
