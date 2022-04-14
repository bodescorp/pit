const { Router} = require('express');
const { listAcademic_activities, createAcademic_activities } = require('../controllers/academic_activitiesController');
const { listUsers, createUsers } = require('../controllers/userController');
const router = Router();


router.get('/pit/users', listUsers);
router.post('/pit', createUsers);

router.get('/pit/activities', listAcademic_activities);
router.post('/pit/activities', createAcademic_activities);


module.exports = router;