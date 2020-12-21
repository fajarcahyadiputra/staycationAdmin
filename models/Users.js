const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const userShema = new mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userShema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
})

module.exports = mongoose.model('Users', userShema);