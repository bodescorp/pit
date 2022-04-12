const { Router} = require('express');
const { getUsers } = require('../controllers/userController');
const router = Router();


const connection = require('../database/connection');


router.get('/pit', getUsers);


module.exports = router;