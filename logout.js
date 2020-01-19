module.exports =  (req, res) => {
    req.session.auth = null;
    req.session.login = null;
    res.redirect('/login');
};