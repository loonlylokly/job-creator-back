import UserController from "./controllers/UserController.js";
import DealController from "./controllers/DealController.js";
import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/auth/pipedrive", passport.authenticate("pipedrive"));
router.get(
  "/auth/pipedrive/callback",
  passport.authenticate("pipedrive", {
    session: false,
    failureRedirect: "/",
    successRedirect: "/success",
  })
);
router.get("/success", (req, res) => {
  return res.send("Success");
});
router.get("/getFieldsData", DealController.getDealFields);
router.post("/updateFieldsData", DealController.updateDealFields);
router.post("/user", UserController.create);
router.get("/users", UserController.getAll);
router.get("/users/:id", UserController.getOne);
router.put("/user", UserController.update);
router.delete("/users/:id", UserController.delete);

export default router;
