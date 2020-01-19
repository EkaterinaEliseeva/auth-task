const {User} = require('./connection');

module.exports = async (req, res) => {

    const login = req.session.login ? req.session.login : null;

    // ищем всех пользователей
    const result = await User.find();

    // отправляем список users
    res.render('users', {users: result, login});

};