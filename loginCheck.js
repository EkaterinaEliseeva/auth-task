const {User} = require('./connection');

module.exports = async	(req, res)	=> {
    const {login, password} = req.body;
    const user = await User.findOne({login});
    if (user) {
        if (user.password === password)	{
            req.session.auth = 'ok';
            req.session.login = login;
            res.json('ok');
        } else {
            res.json('Неверный	пароль!');
        }
    } else {
        res.json('Пользователь не существует!');
    }
};