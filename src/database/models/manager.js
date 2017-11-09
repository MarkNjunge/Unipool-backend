const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./../../config/')

const ManagerSchema = mongoose.Schema({
    _id: String,
    username: { type: String, unique: true },
    password: String
})

const ManagerModel = mongoose.model('manager', ManagerSchema)

const Manager = {
    schema: ManagerSchema,
    model: ManagerModel,
    register: function(username, password) {
        return new Promise((resolve, reject) => {
            // Check that a user with the same email does not exist
            checkExistence(username, false)
                .then(() => getHashed(password))
                .then(hashed => {
                    const manager = new ManagerModel({
                        _id: mongoose.Types.ObjectId(),
                        username,
                        password: hashed
                    })

                    manager.save(err => {
                        if (err) reject(err.message)

                        resolve(createAuthenticationReturn())
                    })
                })
                .catch(reason => reject(reason))
        })
    },
    login: function(username, password) {
        return new Promise((resolve, reject) => {
            checkExistence(username, true)
                .then(manager => validatePassword(password, manager.password))
                .then(() => resolve(createAuthenticationReturn()))
                .catch(reason => reject(reason))
        })
    }
}

function createAuthenticationReturn() {
    const token = jwt.sign({}, JWT_SECRET, {
        expiresIn: '1y'
    })

    const decoded = jwt.decode(token)

    return {
        token,
        created: decoded.iat,
        expires: decoded.exp
    }
}

function checkExistence(username, shouldExist) {
    return new Promise((resolve, reject) => {
        ManagerModel.findOne({ username }, (err, res) => {
            if (err) {
                reject(err)
            }
            if (shouldExist && res === null) {
                reject('The manager does not exist.')
            } else if (!shouldExist && res !== null) {
                reject('There is already a manager with that username.')
            }
            resolve(res)
        })
    })
}

function getHashed(password) {
    const salt = bcrypt.genSaltSync(12)

    return new Promise((resolve, reject) => {
        bcrypt.hash(password, salt, (err, encrypted) => {
            if (err) {
                reject(err.message)
            } else {
                resolve(encrypted)
            }
        })
    })
}

function validatePassword(input, hashed) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(input, hashed, (err, same) => {
            if (err) {
                reject(err.message)
            } else if (!same) {
                reject('The username or password is incorrect')
            } else {
                resolve()
            }
        })
    })
}

module.exports = Manager
