module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('todos', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            name: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            },
            isCompleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            isInProgress: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Companies');
    }
};
