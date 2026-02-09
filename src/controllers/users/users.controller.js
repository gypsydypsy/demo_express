const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const userRepository = require("../../models/sequelize/user/user.repository");
const userRepository = require("../../models/mongoDb/user/user.repository");
const { broadcastNotification } = require("../../socket/socket");

async function httpCreateUser(req, res) {
    try {
        const { password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = await userRepository.create({
            ...req.body,
            password: hashedPassword,
        });

        broadcastNotification('new_user', {
            message: "A new user was created", 
            user: data
        })

        res.status(201).json({ ...data, created: "ok" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function httpGetSingleUser(req, res) {
    try {
        const data = await userRepository.findById(req.params.id);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function httpGetAllUsers(req, res) {
    try {
        const data = await userRepository.getAll(req.query);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function httpUpdateUser(req, res) {
    try {
        await userRepository.update(req.params.id, req.body);
        const data = userRepository.findById(req.params.id);
        res.status(200).json({ ...data, updated: "ok" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function httpDeleteUser(req, res) {
    try {
        await userRepository.delete(req.params.id);
        res.status(200).json({ deleted: "ok" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function httpLoginUser(req, res) {
    try {
        const user = await userRepository.findByEmail(req.body.email);

        if (!user) {
            return res
                .status(401)
                .json({ message: "user or password is incorrect 1" });
        }

        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            user.password,
        );

        if (!isPasswordValid) {
            return res
                .status(401)
                .json({ message: "user or password is incorrect 2" });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" },
        );

        res.status(200).json({ token, userId: user.id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function httpGetUserSubscriptions(req, res) {
    try {
        const data = await userRepository.getSubscriptions(req.params.id);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    httpCreateUser,
    httpGetSingleUser,
    httpGetAllUsers,
    httpUpdateUser,
    httpDeleteUser,
    httpLoginUser,
    httpGetUserSubscriptions,
};
