const mysqlUsername = process.env.MYSQL_USERNAME;
if (!mysqlUsername) {
  throw new Error('There is no mysql username env. Check please.');
}

const mysqlPassword = process.env.MYSQL_PASSWORD;
if (!mysqlPassword) {
  throw new Error('There is no mysql password env. Check please.');
}

const mysqlDatabase = process.env.MYSQL_DATABASE;
if (!mysqlDatabase) {
  throw new Error('There is no mysql database env. Check please');
}

export const docs = {
  server: {
    port: process.env.PORT || 3000,
  },
  mysql: {
    port: 3306,
    username: mysqlUsername,
    password: mysqlPassword,
    database: mysqlDatabase,
  },
};
