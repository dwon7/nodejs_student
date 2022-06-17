const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');
const  {upload}  = require('../helpers/uploader');

router.get('/',                        studentController.index);
router.post('/import', upload('file'), studentController.import);
router.get('/export',                  studentController.export);

module.exports = router;