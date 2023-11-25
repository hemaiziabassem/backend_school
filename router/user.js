const express = require("express");
const {
  loginController,
  registerController,
} = require("../controllers/userController");
const { loginLimiter, registerLimiter } = require("../middlewares/limiter");
const { verifyToken } = require("../middlewares/verifyToken");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstname
 *         - lastname
 *         - email
 *         - password
 *         - birthday
 *         - fathername
 *         - fatherphone
 *       properties:
 *         firstname:
 *           type: string
 *           description: User's first name
 *         lasttname:
 *           type: string
 *           description: User's lastname
 *         email:
 *           type: string
 *           format: email
 *           description: User's email
 *           unique: true
 *         password:
 *           type: string
 *           description: User's password
 *         birthday:
 *           type: string
 *           description: User's birthdate
 *         fathername:
 *           type: string
 *           description: father name
 *         fatherphone:
 *           type: string
 *           description: father phone
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with required parameters for testing.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: User's first name
 *                 example: John
 *               lastname:
 *                 type: string
 *                 description: User's last name
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email
 *                 example: john@example.com
 *                 unique: true  # Note: This is not a valid OpenAPI property
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: password123
 *               birthday:
 *                 type: string  # Date should be a string in JSON
 *                 format: date  # Assuming a specific date format
 *                 description: User's birthdate
 *                 example: "1990-01-01"
 *               fathername:
 *                 type: string
 *                 description: Father's name
 *                 example: Mark Doe
 *               fatherphone:
 *                 type: string
 *                 description: Father's phone number
 *                 example: "+1234567890"
 *     responses:
 *       '201':
 *         description: User successfully registered
 *       '400':
 *         description: Invalid request body
 */

router.post("/register", registerLimiter, registerController);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login for existing user
 *     description: Login for an existing user with required parameters for testing.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's username
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *                 example: password123
 *     responses:
 *       '200':
 *         description: User successfully logged in
 *       '401':
 *         description: Unauthorized, invalid credentials
 */
router.post("/login", loginLimiter, loginController);

module.exports = router;
