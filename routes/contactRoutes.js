const express = require('express')
const {getContacts, createContact, getContact, updateContact, deleteContact} = require("../controllers/contactController");
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();  //to handle routes


router.use(validateToken);
//get contacts & //post contact
router.route('/').get(getContacts).post(createContact);

//get contact & //update contact & //delete contact
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;