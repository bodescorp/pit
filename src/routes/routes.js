const { Router} = require('express');
const { listAcademic_activities, createAcademic_activities, deleteAcademic_activities } = require('../controllers/academic_activitiesController');
const { listProfile_academic_activities } = require('../controllers/profileController');
const { login } = require('../controllers/sessionController');
const { listUsers, createUsers, deleteUsers } = require('../controllers/userController');
const router = Router();


router.get('/pit/users', listUsers);
router.post('/pit/create', createUsers);
router.delete('/pit/delete/:id', deleteUsers);

router.get('/pit/profile', listProfile_academic_activities);

router.post('/pit/sessions', login);

router.get('/pit/activities', listAcademic_activities);
router.post('/pit/activities', createAcademic_activities);
router.delete('/pit/activities/delete/:id', deleteAcademic_activities);


module.exports = router;