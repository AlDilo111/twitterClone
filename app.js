const express = require("express");
const app = express();
const port = 3000;
const middleware = require("./middleware");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("./database");
const jquery = require("jquery");
const session = require("express-session");

const server = app.listen(port, () =>
	console.log("Server lisstening on port " + port)
);

app.set("view engine", "pug");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
	session({
		secret: "Swag",
		resave: true,
		saveUninitialized: true,
	})
);

//ROUTES
const loginRoute = require("./routes/loginRoutes");
const registerRoute = require("./routes/registerRoutes");
const logoutRoute = require("./routes/logout");
const postPageRoute = require("./routes/postRoutes");


//API ROUTS
const postAPIRoute = require("./routes/api/posts");
const { json } = require("body-parser");

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/logout", logoutRoute);
app.use("/posts", middleware.requireLogin, postPageRoute);

app.use("/api/posts", postAPIRoute);

app.get("/", middleware.requireLogin, (req, res, next) => {
	var payload = {
		pageTitle: "Home",
		userLoggedIn: req.session.user,
		userLoggedInJs: JSON.stringify(req.session.user)
	};

	res.status(200).render("home", payload);
});
