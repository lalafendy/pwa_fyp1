module.exports = {
    getHomePage: (req, res) => {
        req.session.loggedin =false;
        //if(req.session.loggedin ==false)
		db.query('SELECT * FROM first ', function(error,results, fields){
            if (error) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "Welcome to SRcS | View Smartrphone"
                ,product: results
            });
        });
    },
    viewSmart: (req, res) => {
        let product_id = req.params.id;
            let query = 'SELECT * FROM `first` where product_id = "' + product_id + '"';
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.render('view_smart.ejs', {
                    title:"Home"
                    ,product: result
                });
            });
        
    },
};