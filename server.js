// app.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const mongoDBSession = require('connect-mongodb-session')(session);
const app = express();
app.use(express.static('./'));
require('dotenv').config();

const nodemailer = require('nodemailer');

const UserModel = require('./js/users');
const newsModel = require('./js/newsletter');

const mongoURI = process.env.MONGO_URL;
const PORT = process.env.PORT || 2000;

mongoose.connect(mongoURI).then((res) => {
    console.log("mongoDB Connected");
});

const store = new mongoDBSession({
    uri : mongoURI,
    collection: 'mySessions',
});

// Initialize session middleware
app.use(session({
    secret: 'secret session key', // Change this to a more secure secret for production
    resave: false,
    saveUninitialized: false,
    store: store,
}));

app.use(bodyParser.urlencoded({ extended: true }));

    app.post("/login", async (req, res) => {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.redirect('/login');
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch){
            return res.redirect('/login');
        }
    
        req.session.isAuth = true;
        res.redirect('/home');
    });
    
    app.post("/signin", async (req,res) => {
        const {username, email, password} = req.body;
    
        let user = await UserModel.findOne({email});
    
        if(user){
            return res.redirect('/signin');
        }
    
        const hashedPassword = await bcrypt.hash(password, 12);
        user = new UserModel({
            username,
            email,
            password: hashedPassword
        });
    
        await user.save();

        res.redirect('/login');
    });
    
    app.post("/logout", (req, res) => {
        req.session.destroy((err) => {
            if(err) throw err;
            res.redirect('/');
        })
    });

    app.post("/subscribe",async (req, res) => {
        const {email} = req.body;
        let user = await newsModel.findOne({email});
        if(user){
            console.log("user exists");
            res.status(200).redirect('/');
        }
        else{
            user = new newsModel({
                email
            });
        
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_APP_PASS
            }
        });

        let mailOptions = {
            from: 'vanshchaurasiya1557@gmail.com',
            to: email,
            subject: ' Welcome to Cosmic Chronicles: Your Gateway to Space Exploration!',
            html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
             <head>
              <meta charset="UTF-8">
              <meta content="width=device-width, initial-scale=1" name="viewport">
              <meta name="x-apple-disable-message-reformatting">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta content="telephone=no" name="format-detection">
              <title>Welcome to Cosmic Chronicle's Newsletter</title><!--[if (mso 16)]>
                <style type="text/css">
                a {text-decoration: none;}
                </style>
                <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
            <xml>
                <o:OfficeDocumentSettings>
                <o:AllowPNG></o:AllowPNG>
                <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
              <style type="text/css">
            .rollover:hover .rollover-first {
              max-height:0px!important;
              display:none!important;
              }
              .rollover:hover .rollover-second {
              max-height:none!important;
              display:block!important;
              }
              .rollover span {
              font-size:0px;
              }
              u + .body img ~ div div {
              display:none;
              }
              #outlook a {
              padding:0;
              }
              span.MsoHyperlink,
            span.MsoHyperlinkFollowed {
              color:inherit;
              mso-style-priority:99;
              }
              a.es-button {
              mso-style-priority:100!important;
              text-decoration:none!important;
              }
              a[x-apple-data-detectors] {
              color:inherit!important;
              text-decoration:none!important;
              font-size:inherit!important;
              font-family:inherit!important;
              font-weight:inherit!important;
              line-height:inherit!important;
              }
              .es-desk-hidden {
              display:none;
              float:left;
              overflow:hidden;
              width:0;
              max-height:0;
              line-height:0;
              mso-hide:all;
              }
              .es-content-body a:hover {
              color:#1376c8!important;
              }
              .es-button-border:hover > a.es-button {
              color:#ffffff!important;
              }
            @media only screen and (max-width:600px) {*[class="gmail-fix"] { display:none!important } p, a { line-height:150%!important } h1, h1 a { line-height:120%!important } h2, h2 a { line-height:120%!important } h3, h3 a { line-height:120%!important } h4, h4 a { line-height:120%!important } h5, h5 a { line-height:120%!important } h6, h6 a { line-height:120%!important } h1 { font-size:30px!important; text-align:left } h2 { font-size:24px!important; text-align:left } h3 { font-size:20px!important; text-align:left } h4 { font-size:24px!important; text-align:left } h5 { font-size:20px!important; text-align:left } h6 { font-size:16px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px!important } .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px!important } .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px!important } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock a { font-size:12px!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align:right!important } .es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align:justify!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display:inline!important } .es-m-txt-r .rollover span, .es-m-txt-c .rollover span, .es-m-txt-l .rollover span { line-height:0!important; font-size:0!important } .es-spacer { display:inline-table } a.es-button, button.es-button { font-size:18px!important; line-height:120%!important } a.es-button, button.es-button, .es-button-border { display:inline-block!important } .es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display:block!important } .es-m-il, .es-m-il .es-button, .es-social, .es-social td, .es-menu { display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .adapt-img { width:100%!important; height:auto!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } .es-social td { padding-bottom:10px } .h-auto { height:auto!important } }
            @media screen and (max-width:384px) {.mail-message-content { width:414px!important } }
            </style>
             </head>
             <body class="body" style="width:100%;height:100%;padding:0;Margin:0">
              <div dir="ltr" class="es-wrapper-color" lang="en" style="background-color:#F6F6F6"><!--[if gte mso 9]>
                        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                            <v:fill type="tile" color="#f6f6f6"></v:fill>
                        </v:background>
                    <![endif]-->
               <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#F6F6F6">
                 <tr>
                  <td valign="top" style="padding:0;Margin:0">
                   <table class="es-header" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
                     <tr>
                      <td align="center" style="padding:0;Margin:0">
                       <table class="es-header-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                         <tr>
                          <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-right:20px;padding-left:20px">
                           <table cellpadding="0" cellspacing="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                             <tr>
                              <td align="left" style="padding:0;Margin:0;width:560px">
                               <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="center" style="padding:0;Margin:0;font-size:0"><a target="_blank" href="https://cosmic-chronicles.onrender.com" style="mso-line-height-rule:exactly;text-decoration:underline;color:#2CB543;font-size:14px"><img src="https://ehnrnnn.stripocdn.email/content/guids/CABINET_16a498da92bbf003497078307411b22a15746cb233ab50fe82c2ea92363d7e85/images/image_BXu.png" alt="Cosmic Chroncles" width="560" class="adapt-img" title="Cosmic Chroncles" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table>
                   <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
                     <tr>
                      <td align="center" style="padding:0;Margin:0">
                       <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                         <tr>
                          <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-right:20px;padding-left:20px">
                           <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                             <tr>
                              <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                               <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="left" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Dear Subscriber,</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">​</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Welcome aboard Cosmic Chronicles, your portal to the wonders of space exploration! 🚀 We are thrilled to have you join our community of fellow space enthusiasts, where we embark on an exhilarating journey through the cosmos together.</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">​<br>Get ready to dive into a universe of captivating content, featuring everything from the mysteries of distant galaxies to the latest updates on space missions right here in our solar system. Here's a sneak peek of what awaits you:<br>​<br>​</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">🌌 <strong>Exploring the Solar System</strong>: Discover fascinating facts about each planet in our celestial neighborhood, from the scorching surface of Mercury to the icy depths of Neptune.</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">🚀 <strong>Rocket Launches and Space Missions</strong>: Stay up-to-date with the latest launches and missions, as we witness humanity's quest to explore the final frontier.</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">🛰️ <strong>Space Theories and Concepts</strong>: Delve into mind-bending theories and concepts that unravel the mysteries of the cosmos, from black holes to the fabric of spacetime itself.</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">📚 <strong>Engaging Blogs and Articles</strong>: Immerse yourself in thought-provoking articles penned by our team of space enthusiasts, covering a wide range of topics related to space exploration and astronomy.</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">🎮 <strong>Interactive Space Games</strong>: Embark on space-themed adventures with our collection of interactive games, where you can test your knowledge and skills while having a blast!</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">As a valued member of our Cosmic Chronicles community, you'll receive exclusive updates, curated content, and special offers straight to your inbox. We're committed to providing you with a stellar experience and fostering a sense of wonder and curiosity about the cosmos.</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">​</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Thank you for subscribing to Cosmic Chronicles! We can't wait to embark on this cosmic journey with you.</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Reach for the stars!</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Warm regards,</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Vansh Chaurasiya</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Founder, Cosmic Chronicles</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">​</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px"><strong>P.S. Don't forget to follow us on our social handles to stay connected and share your passion for space exploration with our growing community! 🌟</strong></p></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                         <tr>
                          <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-right:20px;padding-left:20px">
                           <table cellpadding="0" cellspacing="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                             <tr>
                              <td align="left" style="padding:0;Margin:0;width:560px">
                               <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="center" style="padding:0;Margin:0;font-size:0">
                                   <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                     <tr>
                                      <td align="center" valign="top" style="padding:0;Margin:0;padding-right:10px"><a target="_blank" href="https://cosmic-chronicles.onrender.com" style="mso-line-height-rule:exactly;text-decoration:underline;color:#2CB543;font-size:14px"><img title="X.com" src="https://ehnrnnn.stripocdn.email/content/assets/img/social-icons/logo-colored/x-logo-colored.png" alt="X" width="41" height="41" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
                                      <td align="center" valign="top" style="padding:0;Margin:0;padding-right:10px"><a target="_blank" href="https://cosmic-chronicles.onrender.com" style="mso-line-height-rule:exactly;text-decoration:underline;color:#2CB543;font-size:14px"><img title="Instagram" src="https://ehnrnnn.stripocdn.email/content/assets/img/social-icons/logo-colored/instagram-logo-colored.png" alt="Ig" width="41" height="41" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
                                      <td align="center" valign="top" style="padding:0;Margin:0"><a target="_blank" href="https://cosmic-chronicles.onrender.com" style="mso-line-height-rule:exactly;text-decoration:underline;color:#2CB543;font-size:14px"><img title="Youtube" src="https://ehnrnnn.stripocdn.email/content/assets/img/social-icons/logo-colored/youtube-logo-colored.png" alt="Yt" width="41" height="41" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
                                     </tr>
                                   </table></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table>
                   <table class="es-footer" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
                     <tr>
                      <td align="center" style="padding:0;Margin:0">
                       <table class="es-footer-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                         <tr>
                          <td align="left" style="Margin:0;padding-top:20px;padding-right:20px;padding-left:20px;padding-bottom:20px"><!--[if mso]><table style="width:560px" cellpadding="0" 
                                    cellspacing="0"><tr><td style="width:270px" valign="top"><![endif]-->
                           <table class="es-left" cellspacing="0" cellpadding="0" align="left" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                             <tr>
                              <td align="left" style="padding:0;Margin:0;width:270px">
                               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="center" style="padding:0;Margin:0;display:none"></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table><!--[if mso]></td><td style="width:20px"></td><td style="width:270px" valign="top"><![endif]-->
                           <table class="es-right" cellspacing="0" cellpadding="0" align="right" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                             <tr>
                              <td align="left" style="padding:0;Margin:0;width:270px">
                               <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="center" style="padding:0;Margin:0;display:none"></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table><!--[if mso]></td></tr></table><![endif]--></td>
                         </tr>
                         <tr>
                          <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-right:20px;padding-left:20px">
                           <table cellpadding="0" cellspacing="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                             <tr>
                              <td align="left" style="padding:0;Margin:0;width:560px">
                               <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="left" style="padding:0;Margin:0"><p align="center" style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Cosmic Chronicles © 2024</p></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
               </table>
              </div>
             </body>
            </html>`,
        };

        transporter.sendMail(mailOptions).then((info) => {
            console.log("Email sent!!");
            return res.status(201).redirect('/');
        }).catch((err) => {
            return res.status(500).json({ msg: err });
        });
            
        await user.save();
        // return res.redirect('/');
   
        }
    });

const myRouterApp = require('./router');

app.use(myRouterApp);

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:2000');
});