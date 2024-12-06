module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    });
  
    return Order;
  };
  