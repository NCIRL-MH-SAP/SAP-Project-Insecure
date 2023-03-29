'use strict';
// var bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const adminPassword = 'admin'
    const password = '12345'

    // const adminPasswordHashed = bcrypt.hashSync(adminPassword, 8);
    // const passwordHashed = bcrypt.hashSync(password, 8);

    let users = [];
    users.push({ firstName: 'Admin', lastName: 'Admin', email: 'admin@sap.com', password: adminPassword, active: true, isAdmin: true, createdAt: new Date(), updatedAt: new Date() })
    users.push({ firstName: 'Garry', lastName: 'Kasparov', email: 'gkasparov@sap.com', salary: 300000, bonus: 50000, position: "Software Architect",password: password, active: true, createdAt: new Date(), updatedAt: new Date() })
    users.push({ firstName: 'Magnus', lastName: 'Carlsen', email: 'mcarlsen@sap.com', salary: 250000, bonus: 25000, position: "Software Architect",password: password, active: true, createdAt: new Date(), updatedAt: new Date() })
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
