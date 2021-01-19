import bcrypt from 'bcryptjs'
const users = [
    {
        name: 'Admin',
        email: 'admin@test.com',
        password: bcrypt.hash('1234', 10),
        isAdmin: true
    },
    {
        name: 'Sasha',
        email: 'sasha@test.com',
        password: bcrypt.hash('1234', 10),
        isAdmin: false
    },
    {
        name: 'Panda',
        email: 'panda@test.com',
        password: bcrypt.hash('1234', 10)
    }
]
export default users