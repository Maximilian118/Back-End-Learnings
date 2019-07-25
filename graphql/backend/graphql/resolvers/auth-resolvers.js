const User = require('../../models/user-schema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
  createUser: async args => { // Mutation
    try {
      const userEmail = await User.findOne({ email: args.userInput.email })
      if (userEmail) {
        throw new Error('User already exists!')
      }
      const hashedPass = await bcrypt.hash(args.userInput.password, 12)
      const user = new User({
        email: args.userInput.email,
        password: hashedPass,
      })
      const res = await user.save()
      console.log(`[app.js] createUser... \n ${res}`)

      const newUser = await User.findOne({ email: args.userInput.email })
      const token = jwt.sign({ userId: newUser._id, email: newUser.email }, 'somesupersecretkey', {
        expiresIn: '1h'
      })

      return {
        ...res._doc,
        password: null,
        userId: newUser._id,
        token: token,
        tokenExpiration: 1,
        userEmail: newUser.email
      }
    } catch (err) { throw err }
  },
  login: async args => {
    const user = await User.findOne({ email: args.email })
    if (!user) {
      throw new Error("Email doesn't exist!")
    }
    const isEqual = await bcrypt.compare(args.password, user.password)
    if (!isEqual) {
      throw new Error("Wrong Password!")
    }
    const token = jwt.sign({ userId: user._id, email: user.email }, 'somesupersecretkey', {
      expiresIn: '1h'
    })
    return {
      userId: user._id,
      token: token,
      tokenExpiration: 1,
      userEmail: user.email
    }
  }
}