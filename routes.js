const express = require('express');
const cors = require('cors');
const router = express.Router();

const findUsers = require('./findUsers');
const createUser = require('./createUser');
const loginCheck = require('./loginCheck');
const logout = require('./logout');

const checkAuth = (req, res, next) => {
    if (req.session.auth === 'ok') {
        next();
    } else {
        res.redirect('/login');
    }
};

const checkLogin = (req, res, next) => {
    if (req.session.auth === 'ok') {
        res.redirect('/');
    } else {
        next();
    }
};

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


// если пользователь авторизован по маршруту / выполнить findUsers
router.get('/', checkAuth, findUsers);

// разлогинивание
router
    .route('/logout')
    .get(logout);


// для добавления нового пользователя
router.get('/adduser', checkLogin, async (req,res) => {
    await res.sendFile('./public/adduser.html', {root: __dirname })
});

router
    .route('/adduser')
    .post(createUser);

// отдает html файл со страницей login
router
    .get('/login', checkLogin, async (req, res) => {
        await res.sendFile('./public/index.html', {root: __dirname })
    });

    // для проверки логина-пароля в бд
router
    .route('/login')
    .post(loginCheck);


module.exports = router;
