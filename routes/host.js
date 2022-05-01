const express = require('express');
const path = require("path");
const router = express.Router();
const data = require('../data');
const showData = data.host;
const formidable = require('formidable');

router.get('/', async (req, res) => {

    try {

        res.render('host1', { title: "Host", userLoggedIn: true })

    } catch (e) {
        res.sendStatus(500);
    }
});


router.post('/createPost', async (req, res) => {
    let userLogin = null;
    // if (req.session) {
    //     if (req.session.userId)
    //         userLogin = await userData.getUserById(req.session.userId);
    // }
    console.log("hhhhh")
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../', 'public', 'images');
    form.keepExtensions = true;//保留后缀名
    form.parse(req, async (err, fields, files) => {
        
        try {
            if (!fields)
                throw "need data to create post";
            if (!fields.topic)//标题
                throw "need topic to create post "
            if (!fields.content)//文本内容
                throw "need content to create post"
            if (!fields.tagArr)//标签数组
                throw "need a tagArr String to create post";
            let tagArr = JSON.parse(fields.tagArr);
            if (!Array.isArray(tagArr))
                throw "need a tagArr to create post";
            let photoArr = [];

            if (files.photo0)
                photoArr.push("http://localhost:3000/public/images/" + files.photo0.path.split('images\\')[1]);
            if (files.photo1)
                photoArr.push("http://localhost:3000/public/images/" + files.photo1.path.split('images\\')[1]);
            if (files.photo2)
                photoArr.push("http://localhost:3000/public/images/" + files.photo2.path.split('images\\')[1]);
            
            let newPost = await showData.createPost(
                fields.topic,
                req.session.userId,
                fields.content,
                photoArr,
                tagArr
            )

            res.send(newPost);
        } catch (error) {
            res.status(404).send(error);
        }
    })
});


router.post('/createPost1', async (req, res) => {


    // if (!!req.session.user) {
    //     res.redirect('/user/private')
    // }
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../', 'public', 'images');
    form.keepExtensions = true;

    // const userid = req.session.userId;
    // const sportname = req.body['sportname'];
    // const adress = req.body['adress'];
    // const date = req.body['date'];
    // const slot = req.body['slot'];
    // const detail = req.body['detail'];

    form.parse(req, async (err, fields, files) => {



        try {
            //     if (!fields)
            //     throw "need data to create post";
            // if (!fields.topic)//标题
            //     throw "need topic to create post "
            // if (!fields.content)//文本内容
            //     throw "need content to create post"
            // if (!fields.tagArr)//标签数组
            //     throw "need a tagArr String to create post";
            // let tagArr = JSON.parse(fields.tagArr);
            // if (!Array.isArray(tagArr))
            //     throw "need a tagArr to create post";

            const sportname = fields.sportname;
            const adress = fields.adress;
            const date = fields.date;
            const slot = fields.slot;
            const detail = fields.detail;
            // const img = "http://localhost:4000/public/images/" + files.photo0.path.split('images\\')[1];
            let photoArr = [];

            if (files.photo0)
                photoArr.push("http://localhost:3000/public/images/" + files.photo0.path.split('images\\')[1]);
            if (files.photo1)
                photoArr.push("http://localhost:3000/public/images/" + files.photo1.path.split('images\\')[1]);
            if (files.photo2)
                photoArr.push("http://localhost:3000/public/images/" + files.photo2.path.split('images\\')[1]);

            console.log(photoArr)

            let userInfo = await showData.createHost(userid, sportname, adress, date, slot, detail, photoArr);

            res.send(userInfo);
            // if (userInfo.userInserted) {
            //     res.status(400);
            //     res.render('host', { title: "Host", userLoggedIn: true })
            // } else {
            //     res.status(500);
            //     res.render('signup', { title: "Error", error: "Internal Server Error" })
            // }
        } catch (error) {
            res.status(404).send(error);
        }

    })
});





module.exports = router;