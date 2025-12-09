const express = require("express");
const {
    updateForm,
    subscribeToNewsletter
} = require("../controllers/userController");

const router = express.Router();

router.post("/form/user", updateForm);
router.post("/subscriber", subscribeToNewsletter);



module.exports = router;
