// import passport from "passport";
// import OAuth2Strategy from "passport-oauth2";

// passport.use(
//   "pipedrive",
//   new OAuth2Strategy(
//     {
//       authorizationURL: "https://oauth.pipedrive.com/oauth/authorize",
//       tokenURL: "https://oauth.pipedrive.com/oauth/token",
//       clientID: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIETN_SECRET,
//       callbackURL: `${process.env.URL}/auth/pipedrive/callback`,
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       User.findOrCreate({ exampleId: profile.id }, function (err, user) {
//         return cb(err, user);
//       });
//     }
//   )
// );
