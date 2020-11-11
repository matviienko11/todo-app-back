module.exports = {
    up: async function  (queryInterface, Sequelize) {
        await queryInterface.addColumn(
            'users',
            'role',
            {
                type: Sequelize.STRING,
                allowNull: true
            }
        )
    },

    down: async function (queryInterface, Sequelize) {
        await queryInterface.removeColumn(
            'users',
            'role'
        )
    }
}
