const router = require('express').Router();
const { body, check, validationResult } = require('express-validator');
const { registerUser } = require('../controllers/registerController');
const { loginUser } = require('../controllers/loginController');
const { getUser } = require('../controllers/getUserController');
const { updateUser } = require('../controllers/updateController.js');
const { deleteUser } = require('../controllers/deleteController');
const {upload} = require("../controllers/file.controller");

router.post(
	'/register',
	[
		body('name', '').escape().trim(),
		check('name', 'Name should be not empty').notEmpty(),
		check('name', 'Name should be in characters').matches(/^[A-Za-z ]+$/),
		check('name', 'Name Length must be 5 to 25 characters long').isLength({min: 3, max:20}),
		

		body('email', '').escape().trim(),
		check('email', 'Email should be not empty').notEmpty(),
		check('email', 'Email is not valid').isEmail(),

		body('phone','').escape().trim(),
		check('phone','Phone number should be not empty').notEmpty(),
		check('phone','Phone nuber is not valid').matches(/^[0-9]{10}$/),

		body('password', '').trim(),
		check('password', 'Password length must be 6 to 16').isLength({ min: 6, max:16 }),
		check('password', 'Password should be not empty').notEmpty(),
		check('password', 'Password should be Minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character:').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{6,}$/),
	],
	registerUser
);

router.post(
	'/login',
	[
		body('email', 'Invalid email address').notEmpty().escape().trim().isEmail(),
		body('password', 'The Password must be of minimum 4 characters length').notEmpty().trim().isLength({ min: 4 })
	],
	loginUser
);

router.get('/getuser/:id', getUser);

router.patch('/update/:id', updateUser);

router.delete('/delete/:id', deleteUser);

// file uploading


  router.post("/upload", upload);
//   router.get("/files", controller.getListFiles);
//   router.get("/files/:name", controller.download);





module.exports = router;
