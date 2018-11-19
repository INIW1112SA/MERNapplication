const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => res.send({msg:"users works"}));

module.exports = router;