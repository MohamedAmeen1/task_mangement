module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        email: {
            type: Sequelize.STRING,
            isUnique :true,
            allowNull:false,
            validate:{
                isEmail : true
            }
        },
        phone: {
            type: Sequelize.STRING,
            allowNull:false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull:false,
        },
    });
    return User;
};