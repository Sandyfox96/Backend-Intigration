module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Customers', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Customers', 'password', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
