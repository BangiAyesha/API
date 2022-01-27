const express = require("express");
const router = express.Router();
const {
    getData,
    postData,
    updateData,
    deleteData,
    login,
} = require("../controller/empController");
const jwt = require("jsonwebtoken");
const jwtSecret = "vdfvdsf73t7t47t574re";
const { check, validationResult } = require("express-validator");

function autenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token);
    if (token == null) {
        res.json({ err: 1, msg: "Token not matched" });
    } else {
        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                res.json({ err: 1, msg: "Token is invalid" });
            } else {
                next();
            }
        });
    }
}

router.post(
    "/login",
    [check("email").isEmail(), check("password").isLength({ min: 7 })],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let payload = {
            oid: req.body.email,
        };
        const token = jwt.sign(payload, jwtSecret, {
            expiresIn: 1060000,
        });
        console.log(token);
        res.json({ flag: 1, message: "Login Success", token: token });
        login(req.body);
    }
);

router.post("/postdata", (req, res) => {
    console.log(req);
    postData(req.body);
    res.send("Employee data added");
});

router.get("/getdata", async (req, res) => {
    res.send(await getData());
});

// router.get("/getdata", getData.getData);

router.delete("/deletedata/:id", (req, res) => {
    deleteData(req.params.id);
    res.send("Employee data is deleted");
});

router.put("/updatedata/:id", (req, res) => {
    updateData(req.params.id, req.body);
    res.send("Employee data is updated");
});

module.exports = router;
