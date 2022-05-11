const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("../schemas/UserSchema.js");

router.get("/", (req, res, next) => {

	var payload = {
		pageTitle: "Post",
		userLoggedIn: req.session.user,
		userLoggedInJs: JSON.stringify(req.session.user),
        postId: req.params.id
	};

	res.status(200).render("post",);
});


module.exports = router;
