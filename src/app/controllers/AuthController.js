const User = require('../models/Use');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

let refreshTokens = [];

class AuthController {
    async registerUser(req, res) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            //create new user
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
            });
            //SAVE to DB 
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async loginUser(req, res) {
        try {
            const user = await User.findOne({ username: req.body.username });
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!user) {
                res.status(404).json('wrong username');
            } else if (!validPassword) {
                res.status(404).json('wrong password');
            } else {
                const accessToken = await jwt.sign({
                    id: user._id,
                    admin: user.admin,
                },
                    process.env.JWT_ACCESS_KEY,
                    { expiresIn: "1d" });

                const refreshToken = await jwt.sign({
                    id: user._id,
                    admin: user.admin,
                },
                    process.env.JWT_REFRESH_KEY,
                    { expiresIn: "365d" });

                refreshTokens.push(refreshToken);

                const { password, ...other } = user._doc;
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: "false",
                    path: "/",
                    smaeSite: "strict",
                })
                res.status(200).json({ ...other, accessToken });
            }

        } catch (err) {
            res.status(500).json(err);
        }
    }

    requestRefreshToken(req, res) {

        try {
            //Take refresh token for user
            const refreshToken = req.cookie.refreshToken;
            if (!refreshToken) {
                return res.status(401).json("You're not authentication");
            }
            if(!refreshTokens.includes(refreshToken)){
                return res.status(403).json("refresh token is not valid")
            }
            jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
                if (err) {
                    console.log(err);
                }
                refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

                //Create new accesstoken, refresh token
                const newAccessToken = jwt.sign({
                    id: user._id,
                    admin: user.admin,
                },
                    process.env.JWT_ACCESS_KEY,
                    { expiresIn: "1d" });

                const newRefreshToken = jwt.sign({
                    id: user._id,
                    admin: user.admin,
                },process.env.JWT_ACCESS_KEY,
                { expiresIn: "365d" });
                refreshTokens.push(newRefreshToken)
                res.cookie("refreshToken", newRefreshToken, {
                    httpOnly: true,
                    secure: "false",
                    path: "/",
                    smaeSite: "strict",
                });

                res.status(200).json({ accessToken: newAccessToken });
            })
        } catch (err) {
            res.status(500).json(err);
        }
    }

    //LOGOUT
    async userLogout(req, res) {
        res.clerCookie("refreshToken");
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
        res.status(200).json("Logout!");
    }
}

module.exports = new AuthController();