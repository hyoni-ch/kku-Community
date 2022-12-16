var express = require("express");
var router = express.Router();
const multer = require("multer");
const { Cafe } = require("../Model/Cafe.js");
const { Counter } = require("../Model/Counter.js");

router.post("/submit", (req, res) => {
    let temp = {
      name: req.body.name,
      address: req.body.address,
      time: req.body.time,
      phone: req.body.phone,
      other: req.body.other,
      image: req.body.image,
    };
    Counter.findOne({ name: "counter" })
      .exec()
      .then((counter) => {
        temp.cafePostNum = counter.cafePostNum;
        const CafePost = new Cafe(temp);
        CafePost.save().then((doc) => {
            Counter.updateOne({ name: "counter" },{$inc : { cafePostNum : 1 }}).then(() => {
                res.status(200).json({ success : true });
            });
        });
      })
      .catch((err) => {
        res.status(400).json({ success : false });
      });
});


router.post("/list", (req, res) => {
    let sort = {};

    if (req.body.sort === "최신순") {
      sort.cafePostNum = -1;
    } else {
      //리뷰순
      sort.commentNum = -1;
    }
    Cafe.find({
      $or: [
        { name: { $regex: req.body.searchTerm } },
        { address: { $regex: req.body.searchTerm } },
      ],
    })
      .sort(sort)
      .skip(req.body.skip) //0, 5
      .limit(6) //한번에 찾을 doc 숫자
      .exec()
      .then((doc) => {
        res.status(200).json({ success : true, cafePostList: doc});
      })
      .catch((err) => {
        res.status(400).json({ success : false });
      });
  });

  router.post("/detail", (req, res) => {
    Cafe.findOne({cafePostNum : Number(req.body.cafePostNum)})
      .exec()
      .then((doc) => {
        res.status(200).json({ success : true, cafe: doc });
      })
      .catch((err) => {
        res.status(400).json({ success : false });
      });
  });
    
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "cafeImage/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
  })

  const upload = multer({ storage: storage }).single("file");

  router.post("/image/upload", (req, res) => {
    upload(req, res, err => {
      if(err) {
        res.status(400).json({ success: false });  
      } else {
        res.status(200).json({ success: true, filePath: res.req.file.path });
      }
    })
  });
  

module.exports = router;