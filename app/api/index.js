const express = require('express');
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        res.json({
            "Request":req.body,
            "Response":""
        });
    }catch(e)
    {
        console.log(e);
        res.status(500).send("Server Error!");
    }
})

module.exports = router;