class SiteController {

    home (req, res, next){
        res.render('home')
    };

    login (req, res) {
        res.render('login')
    };

    register (req, res) {
        res.render('register');
    };
}

module.exports = new SiteController;
