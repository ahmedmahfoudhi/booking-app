import bcrypt from 'bcryptjs'


// hash password
export const hashPassword = async (plainPassword) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(plainPassword,salt)
    return hashedPassword
}


// compare passwords
export const comparePasswords = (plainPassword, hashedPassword) => {
    return bcrypt.compareSync(plainPassword,hashedPassword)
}