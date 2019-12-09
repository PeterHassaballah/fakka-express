var express = require('express');
var router = express.Router();
var transactionController = require('../Controllers/transactionsController');
var transaction = require('../Models/transactionModel')


// router.post("/getAll", transactionController.getAll);

router.post("/sendchange",transactionController.sendMoney);
router.post("/mytransactions",transactionController.getAll);

module.exports = router;