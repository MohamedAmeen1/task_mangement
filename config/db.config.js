module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "mysqlpassword@20",
    DB: "task_mangement_db",
    dialect: "mysql", 
    pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
    }
    };