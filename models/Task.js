// let { DataTypes } = require('@sequelize/core');
let { User } = require('./index')

module.exports = (sequelize, Sequelize) => {
    let Task = sequelize.define("Task", {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        due_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        status: {
            type: Sequelize.ENUM('pending', 'inprogress', 'completed'),
            defaultValue: 'pending',
            allowNull: false,
            
        },
    },{
        indexes: [
            {
                unique: true,
                fields: ['UserId', 'title']
            }
        ]
    });

    Task.associate = models => {
        Task.belongsTo(models.User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
    }

    return Task;
};