const router = require("express").Router();

router.use("/user", require("./user.js"));
router.use("/userProfile", require("./userProfile.js"));
router.use("/deck", require("./deck"));
router.use("/card", require("./card"));
router.use("/cardList", require("./cardList"));
router.use("/studySession", require("./studySession"));
router.use("/tag", require("./tag"));

module.exports = router