const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../schemas/UserSchema.js");
const Post = require("../../schemas/PostSchema.js");


app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {

});

router.post("/", async (req, res, next) => {
    if(!req.body.content){
        console.log("params not sent");
        res.sendStatus(400);
        return;
    }

    var postData = {
        content: req.body.content,
        postedBy: req.session.user
    };

    Post.create(postData)
    .then(async newPost => {
        newPost = await User.populate(newPost, {path: "postedBy"});
        res.status(200).send(newPost);
    })
    .catch(error => {
        console.log(errror);
        res.sendStatus(400);
    });

});

module.exports = router;
