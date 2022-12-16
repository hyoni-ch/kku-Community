var express = require("express");
var router = express.Router();
const { Cafe } = require("../Model/Cafe.js");
const { Comment } = require("../Model/Comment.js");
const { User } = require("../Model/User.js");

router.post("/submit", (req, res) => {
  let temp = {
    comment: req.body.comment,
    cafePostId: req.body.cafePostId,
  };

  User.findOne({ uid: req.body.uid })
    .exec()
    .then((userInfo) => {
      temp.author = userInfo._id;
      const NewComment = new Comment(temp);
      NewComment.save(() => {
        Cafe.findOneAndUpdate(
          {
            _id: req.body.cafePostId,
          },
          { $inc: { commentNum: 1 } }
        )
          .exec()
          .then(() => {
            return res.status(200).json({ success: true });
          });
      });
    })
    .catch((err) => {
      return res.status(400).json({ success: false });
    });
});

router.post("/getComment", (req, res) => {
  Comment.find({ cafePostId: req.body.cafePostId })
    .populate("author")
    .exec()
    .then((commentInfo) => {
      return res.status(200).json({
        success: true,
        commentList: commentInfo,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
      });
    });
});

router.post("/edit", (req, res) => {
  let temp = {
    cafePostId: req.body.cafePostId,
    comment: req.body.comment,
    uid: req.body.uid,
  };
  Comment.findOneAndUpdate({ _id: req.body.commentId }, { $set: temp })
    .exec()
    .then(() => {
      return res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
      });
    });
});

router.post("/delete", (req, res) => {
  Comment.deleteOne({ _id: req.body.commentId })
    .exec()
    .then(() => {
      Cafe.findOneAndUpdate(
        {
          _id: req.body.cafePostId,
        },
        { $inc: { commentNum: -1 } }
      )
        .exec()
        .then(() => {
          return res.status(200).json({
            success: true,
          });
        });
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
      });
    });
});

module.exports = router;
