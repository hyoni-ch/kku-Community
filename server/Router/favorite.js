var express = require("express");
var router = express.Router();
const { Favorite } = require("../Model/Favorite.js");


router.post("/favoriteNumber", (req, res) => {
    Favorite.find({ cafePostId: req.body.cafePostId })
      .exec((err, info) => {
        if (err) return res.status(400).send(err)

        res.status(200).json({success: true, FavoriteNumber: info.length})
      })
});


router.post("/favorited", (req, res) => {
    
  Favorite.find({ cafePostId: req.body.cafePostId, userFrom: req.body.userFrom })
    .exec((err, info) => {
        if (err) return res.status(400).send(err)

        let result = false;
        if (info.length !== 0) {
            result = true;
        }

        res.status(200).json({success: true, Favorited: result})
      })
});
  
router.post("/removeFromFavorite", (req, res) => {
  Favorite.findOneAndDelete({ "cafePostId": req.body.cafePostId, "userFrom": req.body.userFrom })
    .exec((err, doc) => {
      if(err) return res.status(400).send(err);
      res.status(200).json({ success: true, doc });
    })
});

router.post("/addToFavorite", (req, res) => {
  const favorite = new Favorite(req.body);
  favorite.save((err, doc) => {
    if(err) return res.status(400).send(err);
    return res.status(200).json({success: true});
  })
});

router.post("/getFavoriteCafe", (req, res) => {
  Favorite.find({ "userFrom": req.body.userFrom })
    .exec((err, favorites) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({success: true, favorites})
    })
});


module.exports = router;