import express from "express";
import passport from "passport";
import OAuth2Strategy from "passport-oauth2";
import UserService from "./services/UserService.js";
import router from "./router.js";
import "./passportConfig.js";

const PORT = process.env.PORT;
const URL = process.env.URL;
const app = express();

passport.use(
  "pipedrive",
  new OAuth2Strategy(
    {
      authorizationURL: "https://oauth.pipedrive.com/oauth/authorize",
      tokenURL: "https://oauth.pipedrive.com/oauth/token",
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIETN_SECRET,
      callbackURL: `${process.env.URL}/auth/pipedrive/callback`,
    },
    async function (accessToken, refreshToken, profile, cb) {
      const user = await UserService.addUser(accessToken, refreshToken);
      cb(null, { newUser: user });
    }
  )
);

app.use(express.json());
app.use(passport.initialize());
app.use("", router);

app.get("/", (req, res) => {
  return res.redirect("/auth/pipedrive");
});

app.listen(PORT, () => {
  console.log(`Server running on ${URL}`);
});
