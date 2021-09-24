const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl.js");
const auth = require("../middleware/auth.js");

router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);
router.get("/logout", userCtrl.logout);

router.get("/refresh_token", userCtrl.refreshToken);

router.get("/info", auth, userCtrl.getUser);

router.patch('/addcart',auth,userCtrl.addCart)

router.get('/history',auth,userCtrl.history)

module.exports = router;
