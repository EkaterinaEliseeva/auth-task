const m	= require('mongoose');

//
m.Promise = global.Promise;

// подключение к бд
const conn = m.createConnection('mongodb+srv://user:user@cluster0-lwvqu.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true });

// модель пользователя
const UserSchema = new m.Schema({
        "login": {
            "type": "string"
        },
        "password": {
            "type": "string"
        }
    }, {"collection": "users"}
);


const User = conn.model( 'User', UserSchema );

module.exports.User = User;
