const { Router } = require('express');
const {getAllIncidents,addIncident} = require('../controllers/controllers')


const router = Router();

router.get('/', getAllIncidents);
router.post('/',addIncident);


module.exports = router;
 