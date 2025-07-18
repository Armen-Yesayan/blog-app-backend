'use strict';
const { v4: uuidv4 } = require('uuid');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const [users] = await queryInterface.sequelize.query(
        `SELECT id, email FROM users WHERE email IN ('user1@gmail.com', 'user2@gmail.com')`
    );

    const userMap = {};
    for (const user of users) {
      userMap[user.email] = user.id;
    }

    const posts = [
      {
        id: uuidv4(),
        title: 'Post 1',
        description: 'Description for post 1',
        image: 'https://via.placeholder.com/600x400',
        user_id: userMap['user1@gmail.com'],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        title: 'Post 2',
        description: 'Description for post 2',
        image: 'https://via.placeholder.com/600x400',
        user_id: userMap['user2@gmail.com'],
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('posts', posts, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('posts', null, {});
  }
};
