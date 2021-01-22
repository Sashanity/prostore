import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'


const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        },
    },
    {
        timestamp: true
    }
)

// check if the password correct when logging in
userSchema.methods.checkPassword = async function (enteredPswd) {
    return await bcrypt.compare(enteredPswd, this.password)
}

// hash the password for new user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})



// create user model using the schema above
const User = mongoose.model('User', userSchema)




export default User