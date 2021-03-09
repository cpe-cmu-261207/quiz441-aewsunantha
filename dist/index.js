"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(cors_1.default());
const PORT = process.env.PORT || 3000;
const SECRET = "SIMPLE_SECRET";
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Use username and password to create token.
    if (req.body.username === "sunantha" &&
        req.body.password === "aew")
        return res.status(200).json({
            message: 'Login succesfully',
        });
    else
        return res.status(400).json({
            message: 'Invalid username or password',
        });
});
app.post('/register', (req, res) => {
    const { username, password, firstname, lastname, balance } = req.body;
    var hashPassword = bcrypt_1.default.hashSync(req.body.password, 8);
    var User = require('../user/User');
    User.create({
        username: req.body.username,
        password: hashPassword,
        firstnameme: req.body.firstname,
        lastname: req.body.lastname,
        balance: req.body.balance
    }, function (user, err) {
        if (err)
            return res.status(400).json({
                "message": "Username is already in used"
            });
        else
            return res.status(200).json({
                "message": "Register successfully"
            });
    });
    app.get('/balance', (req, res) => {
        const token = req.query.token;
        try {
            const { username } = jsonwebtoken_1.default.verify(token, SECRET);
        }
        catch (e) {
            //response in case of invalid token
        }
    });
    app.post('/deposit', express_validator_1.body('amount').isInt({ min: 1 }), (req, res) => {
        //Is amount <= 0 ?
        if (!express_validator_1.validationResult(req).isEmpty())
            return res.status(400).json({ message: "Invalid data" });
    });
    app.post('/withdraw', (req, res) => {
    });
    app.delete('/reset', (req, res) => {
        //code your database reset here
        return res.status(200).json({
            message: 'Reset database successfully'
        });
    });
    app.get('/me', (req, res) => {
    });
    app.get('/demo', (req, res) => {
        return res.status(200).json({
            message: 'This message is returned from demo route.'
        });
    });
    app.listen(3000, () => console.log(`Server is running at ${3000}`));
});
