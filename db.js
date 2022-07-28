const { Sequelize, DataTypes } = require("sequelize");

// 从环境变量中读取数据库配置
const { MYSQL_USERNAME = "root", MYSQL_PASSWORD = "_Zz2134330", MYSQL_ADDRESS = "host.docker.internal:3306" } = process.env;

const [host, port] = MYSQL_ADDRESS.split(":");
console.log(MYSQL_PASSWORD, ",", MYSQL_USERNAME, ',', MYSQL_ADDRESS)
const sequelize = new Sequelize("node_admin", MYSQL_USERNAME, MYSQL_PASSWORD, {
  host,
  port,
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});


// 定义数据模型
const Counter = sequelize.define("Counter", {
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

// 数据库初始化方法
async function init() {
  await Counter.sync({ alter: true });
}

// 导出初始化方法和模型
module.exports = {
  init,
  Counter,
};
