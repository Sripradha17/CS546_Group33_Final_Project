
const express = require('express');
const router = express.Router();
const data = require('../data');
const adminData = data.admin;

router.get('/', async (req, res) => {
    try {
        res.render('admin', { title: "Admin" })
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;
