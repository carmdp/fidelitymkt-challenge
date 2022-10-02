var express = require('express');
const operatorsController = require('../controllers/operatorsControllers');

var router = express.Router();

router.post('/login', operatorsController.ValidateLogIn);
router.post('/operators', operatorsController.GetListOperators);
router.post('/operators/add', operatorsController.SetOperator);
router.get('/operators/get/:id', operatorsController.GetOperator);
router.put('/operators/update', operatorsController.PutOperator);


module.exports = router;
