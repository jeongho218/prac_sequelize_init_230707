const express = require("express");
const { Posts } = require("../models");
const router = express.Router();
const { Op } = require("sequelize");

// 게시글 작성 API
router.post("/posts", async (req, res) => {
  const { title, content, password } = req.body;
  const post = await Posts.create({ title, content, password });

  res.status(201).json({ data: post });
});

// 게시글 목록 조회 API
router.get("/posts", async (req, res) => {
  const posts = await Posts.findAll({
    attributes: ["postId", "title", "createdAt", "updatedAt"],
    // 목록 조회이니 게시글 내용과 패스워드는 제외한다.
  });

  res.status(200).json({ data: posts });
});

// 게시글 상세 조회 API
router.get("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  const post = await Posts.findOne({
    attributes: ["postId", "title", "content", "createdAt", "updatedAt"],
    where: { postId: postId }, // 현재 전달받은 postId 변수값과 일치하는 데이터를 찾아라
  });

  res.status(200).json({ data: post });
});

// 게시글 수정 API
router.put("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  const { title, content, password } = req.body;

  const post = await Posts.findOne({ where: { postId: postId } });

  // 에러 처리
  if (!post) {
    return res.status(404).json({ message: "게시글이 존재하지 않습니다." });
  } else if (post.password !== password) {
    return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
  }

  await Posts.update(
    { title, content }, // 수정할 컬럼이 무엇인가
    {
      where: {
        [Op.and]: [{ postId: postId }, [{ password: password }]],
        // Op.and, sequelize의 연산자 문법. 자바스크립트의 &&와 같은 역할
        // 여기서는 'postId와 password가 모두 일치하는'의 의미이다.
      },
    } // 수정할 대상
  );

  res.status(200).json({ message: "게시글이 수정되었습니다." });
});

// 게시글 삭제 API
router.delete("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  const { password } = req.body;

  const post = await Posts.findOne({ where: { postId: postId } });
  if (!post) {
    return res.status(404).json({ message: "게시글이 존재하지 않습니다." });
  } else if (post.password !== password) {
    return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
  }

  await Posts.destroy({ where: { postId: postId } });

  res.status(200).json({ message: "게시글이 삭제되었습니다." });
});

module.exports = router;
