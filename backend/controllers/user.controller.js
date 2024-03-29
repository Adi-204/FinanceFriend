import asyncHandler from "express-async-handler";
import { db } from "../db/postgres.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 

const generateAccessToken = (userData) => {
    return jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
}

const generateRefreshToken = (userData) => {
    return jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1h' });
}

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, email, lastName, password } = req.body;

    if ([firstName, email, lastName, password].some((field) => !field || field.trim() === "")) {
        return res.status(401).send("All fields are required");
    }

    const existedUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (existedUser.rowCount > 0) {
        return res.status(401).send("User with email already exists");
    }

    const encryptPassword = await bcrypt.hash(password, 10);

    await db.query('INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4)', [firstName, lastName, email, encryptPassword]);

    const findUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    const payload = {
        id: findUser.rows[0].id,
        email: email
    }

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await db.query('UPDATE users SET refreshToken = $1 WHERE id = $2', 
    [refreshToken, findUser.rows[0].id]);

    return res
        .status(200)
        .cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000
        })
        .send({accessToken});
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
        return res.status(401).send("All fields are required");
    }

    const user = await db.query("SELECT id, email, password FROM users WHERE email = $1", [email]);

    if (user.rowCount === 0) {
        return res.status(401).send("User does not exist. Please sign up first");
    }

    const hashPassword = user.rows[0].password.toString();

    if (await bcrypt.compare(password, hashPassword)) {
        const payload = {
            id: user.rows[0].id,
            email: email
        }

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        await db.query('UPDATE users SET refreshToken = $1 WHERE id = $2', 
        [refreshToken, user.rows[0].id]);

        return res
            .status(200)
            .cookie("jwt", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 24 * 60 * 60 * 1000
            })
            .send({accessToken});
    } else {
        return res.status(401).send("Incorrect password");
    }
});

const logoutUser = asyncHandler(async (req, res) => {

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    const foundUser = await db.query('SELECT * FROM users WHERE refreshToken = $1', [refreshToken]);

    if (!foundUser.rowCount) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    await db.query('UPDATE users SET refreshToken = NULL WHERE id = $1', [foundUser.rows[0].id]);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

    res.sendStatus(204);
});

const refreshToken = asyncHandler(async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await db.query('SELECT * FROM users WHERE refreshToken = $1', [refreshToken]);

    
    if (!foundUser.rowCount) return res.sendStatus(403);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }
            const payload = { 
                id: foundUser.rows[0].id, 
                email: foundUser.rows[0].email 
            }
            const accessToken = generateAccessToken(payload);
            res.send({accessToken});
        }
    );
});

export { registerUser, loginUser, logoutUser, refreshToken };

