const fs = require('fs');
var session = require('express-session');
module.exports = {
    addSmartPage: (req, res) => {
        res.render('add_smart.ejs', {
            title: "Welcome to SRcS | Add a new Smartphone"
            ,message: ''
        });
    },
    addSmart: (req, res) => {
        if(req.session.username){
        let message = '';
        let product_name = req.body.product_name;
        let product_price = req.body.product_price;
        let product_brand = req.body.product_brand;
        let product_image = req.body.product_image;
        let product_model= req.body.product_model;
        let product_status = req.body.product_status;
        let product_ryear = req.body.product_ryear;
        let product_dimension = req.body.product_dimension;
        let product_weight = req.body.product_weight;
        let product_colour = req.body.product_colour;
        let product_material= req.body.product_material;
        let product_sim = req.body.product_sim;
        let product_size = req.body.product_size;
        let product_sctype = req.body.product_sctype;
        let product_reso = req.body.product_reso;
        let product_ppi = req.body.product_ppi;
        let product_speed = req.body.product_speed;
        let product_camnum = req.body.product_camnum;
        let product_camR = req.body.product_camR;
        let product_camF = req.body.product_camF;
        let product_software= req.body.product_software;
        let product_chipset = req.body.product_chipset;
        let product_cpu = req.body.product_cpu;
        let product_gpu = req.body.product_gpu;
        let product_ram= req.body.product_ram;
        let product_storage= req.body.product_storage;
        let product_cslot = req.body.product_cslot;
        let product_battype = req.body.product_battype;
        let product_batcap = req.body.product_batcap;
        let product_battremove = req.body.product_battremove;
        let product_wirelesscharge = req.body.product_wirelesscharge;
        let product_sound = req.body.product_sound;
        let product_sensor = req.body.product_sensor;
        let product_bluetooth = req.body.product_bluetooth;
        let product_gps = req.body.product_gps;
        let product_USB = req.body.product_USB;
        let product_WiFi = req.body.product_WiFi;
        let product_admin = req.session.username;
            console.log(product_admin)

        let usernameQuery = "SELECT * FROM `smartphone` WHERE product_name = '" + product_name + "'";
        
        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Username already exists';
                res.render('add_smart.ejs', {
                    message,
                    title: "Welcome to SRcS | Add a new smartphone"
                });
           }
            else {
                    let query = "INSERT INTO `smartphone` ( `product_name`, `product_price`, `product_brand`, `product_image`, `product_model`, `product_status`, `product_ryear`, `product_dimension`, `product_weight`, `product_colour`, `product_material`, `product_sim`, `product_size`, `product_sctype`, `product_reso`, `product_ppi`, `product_speed`, `product_camnum`, `product_camR`, `product_camF`, `product_software`, `product_chipset`, `product_cpu`, `product_gpu`, `product_ram`, `product_storage`, `product_cslot`, `product_battype`, `product_batcap`, `product_battremove`, `product_wirelesscharge`, `product_sound`, `product_sensor`, `product_bluetooth`, `product_gps`, `product_USB`, `product_WiFi`, `product_admin`) VALUES ( '" + product_name  + "', '" + product_price  + "','" + product_brand  + "','" + product_image  + "', '"  + product_model + "','"  + product_status  + "', '"  + product_ryear  + "', '"  + product_dimension  + "', '"  + product_weight  + "', '"  + product_colour  + "', '"  + product_material  + "', '"  + product_sim  + "', '"  + product_size  + "', '"  + product_sctype + "', '"  + product_reso  + "', '"  + product_ppi  + "', '"  + product_speed  + "', '"  + product_camnum  + "', '"  + product_camR  + "', '"  + product_camF  + "', '"  + product_software  + "', '"  + product_chipset  + "', '"  + product_cpu  + "', '"  + product_gpu  + "', '"  + product_ram  + "', '"  + product_storage  + "', '"  + product_cslot  + "', '"  + product_battype  + "', '"  + product_batcap  + "', '"  + product_battremove  + "', '"  + product_wirelesscharge  + "', '"  + product_sound  + "', '"  + product_sensor  + "', '"  + product_bluetooth  + "', '"  + product_gps  + "', '"  + product_USB + "', '"  + product_WiFi + "','" + product_admin +"')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            else{
                                console.log(result.affectedRows + " record(s) inserted");
                                res.redirect('/admin');
                            }

                        });
                     } });
                }
                   else{
                        res.write('<h1>Please login first.</h1>');
                        res.write('<a href="/">Login</a>');
                        res.end();
                    }
    },
    editSmartPage: (req, res) => {
        let product_id = req.params.id;
        let query = "SELECT * FROM `smartphone` WHERE product_id = " + product_id + " ";
        if(req.session.username){
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit_smart.ejs', {
                title:"Edit Smartphone"
                ,product: result[0]
                ,message: ''
            });
        });
    }
    else {
            res.write('<h1>Please login first.</h1>');
            res.write('<a href="/">Login</a>');
            res.end();}
    },
    editSmart: (req, res) => {
        let product_id = req.params.id;
        let product_name = req.body.product_name;
        let product_price = req.body.product_price;
        let product_brand = req.body.product_brand;
        let product_model= req.body.product_model;
        let product_status = req.body.product_status;
        let product_ryear = req.body.product_ryear;
        let product_dimension = req.body.product_dimension;
        let product_weight = req.body.product_weight;
        let product_colour = req.body.product_colour;
        let product_material= req.body.product_material;
        let product_sim = req.body.product_sim;
        let product_size = req.body.product_size;
        let product_speed = req.body.product_speed;
        let product_sctype = req.body.product_sctype;
        let product_reso = req.body.product_reso;
        let product_ppi = req.body.product_ppi;
        let product_camnum = req.body.product_camnum;
        let product_camR = req.body.product_camR;
        let product_camF = req.body.product_camF;
        let product_software= req.body.product_software;
        let product_chipset = req.body.product_chipset;
        let product_cpu = req.body.product_cpu;
        let product_gpu = req.body.product_gpu;
        let product_ram= req.body.product_ram;
        let product_storage= req.body.product_storage;
        let product_cslot = req.body.product_cslot;
        let product_battype = req.body.product_battype;
        let product_batcap = req.body.product_batcap;
        let product_battremove = req.body.product_battremove;
        let product_wirelesscharge = req.body.product_wirelesscharge;
        let product_sound = req.body.product_sound;
        let product_sensor = req.body.product_sensor;
        let product_bluetooth = req.body.product_bluetooth;
        let product_gps = req.body.product_gps;
        let product_USB = req.body.product_USB;
        let product_WiFi = req.body.product_WiFi;
       console.log(product_id);
        let queryy="UPDATE `smartphone` SET `product_name` = '" + product_name + "',`product_price` = '" + product_price   + "', `product_brand` = '" + product_brand + "', `product_model` = '" + product_model   + "', `product_status` = '" + product_status     + "', `product_ryear` = '" + product_ryear + "', `product_dimension` = '" + product_dimension     + "', `product_weight` = '" + product_weight     + "', `product_colour` = '" + product_colour     + "', `product_material` = '" + product_material     + "', `product_sim` = '" + product_sim     + "', `product_size` = '" + product_size     + "', `product_sctype` = '" + product_sctype    + "', `product_reso` = '" + product_reso     + "', `product_ppi` = '" + product_ppi     + "', `product_speed` = '" + product_speed     + "', `product_camnum` = '" + product_camnum     + "', `product_camR` = '" + product_camR     + "', `product_camF` = '" + product_camF     + "', `product_software` = '" + product_software     + "', `product_chipset` = '" + product_chipset     + "', `product_cpu` = '" + product_cpu     + "', `product_gpu` = '" + product_gpu     + "', `product_ram` = '" + product_ram     + "', `product_storage` = '" + product_storage     + "', `product_cslot` = '" + product_cslot     + "', `product_battype` = '" + product_battype     + "', `product_batcap` = '" + product_batcap     + "', `product_battremove` = '" + product_battremove     + "', `product_wirelesscharge` = '" + product_wirelesscharge     + "', `product_sound` = '" + product_sound     + "', `product_sensor` = '" + product_sensor     + "', `product_bluetooth` = '" + product_bluetooth     + "', `product_gps` = '" + product_gps     + "', `product_USB` = '" + product_USB    + "', `product_WiFi` = '" + product_WiFi + "' WHERE `product_id` = '" + product_id + "'";
        db.query(queryy,function(error, result, fields){
            if (error) {
                return res.status(500).send(err);
            }
            else{
                console.log(result.affectedRows + " record(s) updated");
                res.redirect('/admin');
            }
            
        });
    }, 
    logout: (req, res) => {
        req.session.loggedIn=false;
        if(req.session.loggedIn==false)
            console.log("keluar");
            res.redirect('/');
    },
    AdminHomePage: (req, res) => {
        var user= req.session.username;
        console.log("hello "+user);
        let query = 'SELECT * FROM `smartphone` where product_admin = "' + user + '"';
         db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('adminhome.ejs', {
            title:"Admin Home"
            ,product: result
            
        });
    });
    },
    loginSmartPage: (req, res) => {
        res.render('login_smart.ejs', {
            title: "Welcome to SRcS | Login"
            ,success:'',
            type:'danger'
        });
    },
    loginSmart: (req, res)=>{
        let username = req.body.username;
        let password = req.body.password;
        if (username && password) {
        db.query('SELECT * FROM admin WHERE admin_id = ? AND admin_password = ?', [username, password],function(error, result, fields){
           
            if (result.length > 0) {
				req.session.loggedin = true;
                req.session.username = result[0].admin_id;
                console.log("login"+req.session.username);
                //req.flash('success','Succesfully log in');
                res.redirect('/admin');
                
			} else {
                res.render('login_smart.ejs', {
                    title:"Admin Home"
                    ,success: "Wrong password",
                    type:'danger'
                });
            }
        			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
    },
    homePage1: (req, res)=>{
        var user= req.session.username;
        console.log("home"+ user);
        if(req.session.loggedin){
       let query = 'SELECT * FROM `smartphone` where product_admin = "' + user + '"';
         db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('adminhome.ejs', {
            title:"Admin Home"
            ,product: result
        });
    });
    } else {
    res.write('<h1>Please login first.</h1>');
    res.write('<a href="/">Login</a>');
    res.end();
}
    },
    deleteSmart: (req, res) => {
        let product_id = req.params.id;
        let deleteUserQuery = 'DELETE FROM smartphone WHERE product_id = "' + product_id + '"';
               if(req.session.username){
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    else{
                        console.log(result.affectedRows + " record(s) Deleted");
                        res.redirect('/admin');
                    }
                });
            } 
            else{
                res.write('<h1>Please login first.</h1>');
                res.write('<a href="/">Login</a>');
                res.end();
            }
            },
            regPage: (req, res) => {
                res.render('reg_smart.ejs', {
                    title: "Welcome to SRcS | Registration"
                    ,message: ''
                });
            },
            regSmart: (req, res) => {
                let message = '';
                let admin_id = req.body.admin_id;
                let admin_name = req.body.admin_name;
                let admin_address = req.body.admin_address;
                let admin_birth = req.body.admin_birth;
                let admin_brand =req.body.admin_brand;
                let admin_password = req.body.admin_password;
                let admin_phone = req.body.admin_phone;
                let admin_email = req.body.admin_email;


                        let query = "INSERT INTO `admin` (`admin_id`, `admin_name`, `admin_address`, `admin_birth`, `admin_brand`, `admin_password`, `admin_phone`, `admin_email`) VALUES ('" +
                        admin_id + "', '" + admin_name + "', '" + admin_address + "', '" + admin_birth + "', " + admin_brand + ", '" + admin_password + "', '"+ admin_phone + "', '" + admin_email + "')";
                                db.query(query, (err, result) => {
                                    if (err) {
                                        return res.status(500).send(err);
                                    }
                                    else{
                                        console.log(result.affectedRows + " record(s) inserted");
                                        res.render('login_smart.ejs', {
                                            title:"Login"
                                            ,success: "Successfully Registered",
                                            type:'success'
                                        });
                                    }
        
                                });
                            
            },
            ProfAdminPage: (req, res) => {
                var user= req.session.username;
                let query = 'SELECT * FROM `admin` WHERE admin_id = "' + user + '"';
                if(req.session.username){
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.render('view_profadmin.ejs', {
                        title:"Profile"
                        ,admin: result[0]
                        ,message: 'meow'
                    });
                });
            }
            else {
                    res.write('<h1>Please login first.</h1>');
                    res.write('<a href="/">Login</a>');
                    res.end();}
            },
            ProfEditPage: (req, res) => {
                let user = req.params.id;
                let query = 'SELECT * FROM `admin` WHERE admin_id = "' + user + '"';
                if(req.session.username){
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.render('edit_adminprof.ejs', {
                        title:"Edit Profile"
                        ,admin: result[0]
                        ,message: ''
                    });
                });
            }
            else {
                    res.write('<h1>Please login first.</h1>');
                    res.write('<a href="/">Login</a>');
                    res.end();}
            },
            ProfEdit: (req, res) => {
                let user = req.params.id;
                //let admin_id = req.admin.id;
                let admin_name = req.body.admin_name;
                let admin_address = req.body.admin_address;
                let admin_birth = req.body.admin_birth;
                let admin_brand= req.body.admin_brand;
                let admin_password = req.body.admin_password;
                let admin_phone = req.body.admin_phone;
                let admin_email = req.body.admin_email;
                let queryy= "UPDATE `admin` SET `admin_name` = '" + admin_name + "', `admin_address` = '" + admin_address + "', `admin_birth` = '" + admin_birth + "',`admin_brand` = '" + admin_brand + "',`admin_password` = '" + admin_password + "', `admin_phone` = '" + admin_phone + "',`admin_email` = '" + admin_email + "' WHERE `admin_id` = '" + user + "'";
                db.query(queryy,function(error, result, fields){
                    if (error) {
                        return res.status(500).send(error);
                    }
                    else{
                        console.log(result.affectedRows + " record(s) updated");
                        res.redirect('/profile');
                    }
                    
                });
            },
            
};