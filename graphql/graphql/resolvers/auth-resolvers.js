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
      return { ...res._doc, password: null }
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
    const token = jwt.sign({ userId: user.id.email, email: user.email }, 'somesupersecretkey', {
      expiresIn: '1h'
    })
    return {
      userId: user.id,
      token: token,
      tokenExpiration: 1
    }
  }
}