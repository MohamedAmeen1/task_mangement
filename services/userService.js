bcrypt = require('bcryptjs')
saltRounds=10;
const jwt=require('jsonwebtoken');
module.exports.encrypt_password = async function (plain_text) {
    let h=0;
    await bcrypt
    .genSalt(saltRounds)
    .then(salt => {
        return bcrypt.hash(plain_text, salt);
    })
    .then(hash => {
        h=hash
        return
    })
    .catch(err => console.error(err.message));
    return h
    

}


module.exports.genrate_token = function (user) {
    let random_key = Math.random().toString(36).substring(7);
    return jwt.sign({ id: user.id, key: random_key }, process.env.user_private_key || 'test')
}
