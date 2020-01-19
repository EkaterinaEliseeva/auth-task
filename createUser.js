const {User} = require('./connection');

module.exports = async (req, res) => {
    // получаем логин, пароль из тела запроса
    const {login, password} = req.body;

    const x  = await User.findOne({login});

    if (x) return res.json('Пользователь с таким логином уже существует!');

    const newUser = new User({login, password});

    try {
        // сохраняем пользователя в бд и возвращаем успешный ответ
        res.status(201).json(await newUser.save());
    } catch (e) {
        await res.status(500).json('Internal Server Error');
    }
};