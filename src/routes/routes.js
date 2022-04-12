const { Router} = require('express');
const { getUsers } = require('../controllers/userController');
const router = Router();


router.get('/pit', getUsers);


module.exports = router;