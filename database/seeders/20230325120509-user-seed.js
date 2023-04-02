'use strict';
var bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {   
    const adminPassword = bcrypt.hashSync(process.env.ADMIN_PASS, Number(process.env.HASH_SALT));
    const password = bcrypt.hashSync(process.env.USERS_PASS, Number(process.env.HASH_SALT));

    let users = [];
    users.push({ firstName: 'Admin', lastName: 'Admin', email: 'admin@sap.com', password: adminPassword, active: true, isAdmin: true, createdAt: new Date(), updatedAt: new Date() })
    users.push({ firstName: 'Garry', lastName: 'Kasparov', email: 'gkasparov@sap.com', salary: 300000, bonus: 50000, position: "Software Architect", password: password, active: true, createdAt: new Date(), updatedAt: new Date() })
    users.push({ firstName: 'Magnus', lastName: 'Carlsen', email: 'mcarlsen@sap.com', salary: 250000, bonus: 25000, position: "Software Architect", password: password, active: true, createdAt: new Date(), updatedAt: new Date() })
    users.push({ firstName: 'Hikaru', lastName: 'Nakamura', email: 'hnakamura@sap.com', salary: 100000, bonus: 10000, position: "Software Engineer", password: password, active: true, createdAt: new Date(), updatedAt: new Date() })

    return queryInterface.bulkInsert('Users', users);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
