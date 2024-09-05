const nodeEnv = process.env.NODE_ENV || 'development';
const serverPort = process.env.PORT || 3000;

// NOTE: Mysql config
const mysqlDatabase = process.env.MYSQL_DATABASE;
const mysqlUsername = process.env.MYSQL_USERNAME;
const mysqlPassword = process.env.MYSQL_PASSWORD;

if (!mysqlDatabase) {
  throw new Error('There is no mysql database env. Check please.');
}

if (!mysqlUsername) {
  throw new Error('There is no mysql username env. Check please.');
}

if (!mysqlPassword) {
  throw new Error('There is no mysql password env. Check please.');
}

export const docs = {
  server: {
    port: serverPort,
    nodeEnv: nodeEnv,
  },
  mysql: {
    port: 3306,
    username: mysqlUsername,
    password: mysqlPassword,
  },
};
