// In your models/customer.js or wherever the Customer model is defined
module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('Customer', {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false, // This makes sure that password can't be null
      },
    });
  
    return Customer;
  };
  