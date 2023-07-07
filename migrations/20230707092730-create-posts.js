"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Posts", {
      postId: {
        allowNull: false, // null 값을 허용하지 않음
        autoIncrement: true, // 데이터 삽입 시 해당 컬럼에 아무런 값을 입력하지 않아도 1씩 증가하여 고유한 값을 유치한다.
        primaryKey: true, // 기본키
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        // 데이터가 생성된 시간
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"), // defaultValue 아무런 값을 입력하지 않았을 때, 기본값을 어떤 것으로 설정할 것인가?
      },
      updatedAt: {
        // 데이터가 수정된 시간
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Posts");
  },
};
