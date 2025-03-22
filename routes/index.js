const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
    res.render("index", { error: [] }); // ✅ Empty array bhejna best practice hai
});

module.exports = router