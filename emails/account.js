const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'ecommerceproducts5@gmail.com',
    subject: 'Thanks for joining us',
    text: `Welcome to the Ecommerce App, ${name}.`,
    html: `<!DOCTYPE html>
        <html lang="en-US">
        
        <head>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <title>Welcome</title>
            <meta name="description" content="Reset Password Email Template." />
            <style type="text/css">
                a:hover {
                    text-decoration: underline !important;
                }
            </style>
        </head>
        
        <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8" leftmargin="0">
            <!--100% body table-->
            <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="
                @import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700);
                font-family: 'Open Sans', sans-serif;
              ">
                <tr>
                    <td>
                        <table style="background-color: #f2f3f8; max-width: 670px; margin: 0 auto" width="100%" border="0"
                            align="center" cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="height: 80px">&nbsp;</td>
                            </tr>
                        
                            <tr>
                                <td style="height: 20px">&nbsp;</td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="
                            max-width: 670px;
                            background: #fff;
                            border-radius: 3px;
                            text-align: center;
                            -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                            -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                            box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                          ">
                                        <tr>
                                            <td style="height: 40px">&nbsp;</td>
                                        </tr>
                                        <tr>
        
                                            
                                            <td style="padding: 0 35px">
                                               
                                            <img style="max-width: 100%; height: auto;"
                                                src="https://static.vecteezy.com/system/resources/previews/004/299/835/original/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg"
                                                title="logo" alt="logo" />
                                               
                                               <h1 style="
                                  color: #1e1e2d;
                                  font-weight: 500;
                                  margin-top: 20px;
                                  font-size: 32px;
                                  font-family: 'Rubik', sans-serif;
                                ">
                                                    Welcome to Ecommerce-app!
                                                </h1>
                                                <span style="
                                  display: inline-block;
                                  vertical-align: middle;
                                  margin-top: 29px;
                                  border-bottom: 1px solid #cecece;
                                  width: 100px;
                                "></span>
        
                                                <h4 style="font-weight: normal;"> Hello ${name}, </h4>
        
                                                <p style="
                                  color: #455056;
                                  font-size: 15px;
                                  line-height: 24px;
                                  margin: 0;
                                  text-align: justify;
                                ">We’re super excited to see you join the Ecommerce-app community. We
                                hope you will be happy with our products, and the service we provide
                                and that you will shop with us again and again. Our goal is to offer
                                the widest range of products in our online store at the highest
                                quality. If you think we should add any items to our store, don’t
                                hesitate to contact us and share your feedback. Until then, enjoy
                                your shopping!
                                <br>              
                                <br />
                                                    Cheers,
                                                    <br>
                                                    E-commerce-app’s Customer Service Team
                                                </p>
                                                <a href="https://shopkart-app.vercel.app/auth/sign-in" target="_blank"
                                                    style="
                                  background: #faa932;
                                  text-decoration: none !important;
                                  font-weight: 500;
                                  margin-top: 35px;
                                  color: #fff;
                                  text-transform: uppercase;
                                  font-size: 14px;
                                  padding: 10px 24px;
                                  display: inline-block;
                                  border-radius: 50px;
                                ">Click to Login</a>
        
                                                
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height: 40px">&nbsp;</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
        
                            <tr>
                                <td style="height: 20px">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="text-align: center">
                                    <p style="
                            font-size: 14px;
                            color: rgba(69, 80, 86, 0.7411764705882353);
                            line-height: 18px;
                            margin: 0 0 0;
                          ">
                                        &copy; <strong>Ecommerce-app</strong>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td style="height: 80px">&nbsp;</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <!--/100% body table-->
        </body>
        
        </html>`
  })
}

const sendResetEmail = (email, name, id) => {
  sgMail.send({
    to: email,
    from: 'ecommerceproducts5@gmail.com',
    subject: 'Password Reset!',
    text: `Welcome to the Ecommerce App, ${name}.`,
    // html: emailTemplate
    html: `<!DOCTYPE html>
        <html lang="en-US">
          <head>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <title>Reset Password</title>
            <meta name="description" content="Reset Password Email Template." />
            <style type="text/css">
              a:hover {
                text-decoration: underline !important;
              }
            </style>
          </head>
        
          <body
            marginheight="0"
            topmargin="0"
            marginwidth="0"
            style="margin: 0px; background-color: #f2f3f8"
            leftmargin="0"
          >
            <!--100% body table-->
            <table
              cellspacing="0"
              border="0"
              cellpadding="0"
              width="100%"
              bgcolor="#f2f3f8"
              style="
                @import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700);
                font-family: 'Open Sans', sans-serif;
              "
            >
              <tr>
                <td>
                  <table
                    style="background-color: #f2f3f8; max-width: 670px; margin: 0 auto"
                    width="100%"
                    border="0"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                  >
                    <tr>
                      <td style="height: 80px">&nbsp;</td>
                    </tr>
                    <tr>
                      <td style="text-align: center">
                        <a
                          href="https://ecommerce-app-rouge.vercel.app/"
                          title="logo"
                          target="_blank"
                        >
                          <img style="max-width: 100%; height: auto;"
                            width="400px"
                            src="https://www.manageengine.com/products/ad-manager/images/admp-pwd-reset.png"
                            title="logo"
                            alt="logo"
                          />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style="height: 20px">&nbsp;</td>
                    </tr>
                    <tr>
                      <td>
                        <table
                          width="95%"
                          border="0"
                          align="center"
                          cellpadding="0"
                          cellspacing="0"
                          style="
                            max-width: 670px;
                            background: #fff;
                            border-radius: 3px;
                            text-align: center;
                            -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                            -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                            box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                          "
                        >
                          <tr>
                            <td style="height: 40px">&nbsp;</td>
                          </tr>
                          <tr>
                            <td style="padding: 0 35px">
                              <h1
                                style="
                                  color: #1e1e2d;
                                  font-weight: 500;
                                  margin: 0;
                                  font-size: 32px;
                                  font-family: 'Rubik', sans-serif;
                                "
                              >
                                You have requested to reset your password
                              </h1>
                                <span
                                style="
                                  display: inline-block;
                                  vertical-align: middle;
                                  margin-top: 29px;
                                  border-bottom: 1px solid #cecece;
                                  width: 100px;
                                "
                              ></span>
                           
                              <h4 style="font-weight: normal;" >Hello ${name}, </h4>
                            
                              <p
                                style="
                                  color: #455056;
                                  font-size: 15px;
                                  line-height: 24px;
                                  margin: 0;
                                  text-align: justify;
                                "
                              >
                                We heard that you lost your Ecommerce-app password.
                                Sorry about that!
                            <br>
                                <br />
                                But don’t worry! You can reset your passsword. To do so,
                                use the following button to reset your password:
                              </p>
                              <a
                                href="https://shopkart-app.vercel.app/auth/reset-password/${id}"
                                target="_blank"
                                style="
                                  background: #4f46e5;
                                  text-decoration: none !important;
                                  font-weight: 500;
                                  margin-top: 10px;
                                  color: #fff;
                                  text-transform: uppercase;
                                  font-size: 14px;
                                  padding: 10px 24px;
                                  display: inline-block;
                                  border-radius: 50px;
                                "
                                >Reset Password</a
                              >
        
                              <p
                                style="
                                  color: #455056;
                                  font-size: 15px;
                                  line-height: 24px;
                                  margin-top: 1rem;
                                  text-align: justify;
                            
                                "
                              >
                                If you don’t use this link within 3 hours, it will
                                expire. To get a new password reset link, visit:
                                <a
                                  href="https://ecommerce-app-rouge.vercel.app/auth/sign-in"
                                  target="_blank"
                                  >https://shopkart-app.vercel.app/auth/reset-password/69</a
                                >
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td style="height: 40px">&nbsp;</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
        
                    <tr>
                      <td style="height: 20px">&nbsp;</td>
                    </tr>
                    <tr>
                      <td style="text-align: center">
                        <p
                          style="
                            font-size: 14px;
                            color: rgba(69, 80, 86, 0.7411764705882353);
                            line-height: 18px;
                            margin: 0 0 0;
                          "
                        >
                          &copy; <strong>Ecommerce-app</strong>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="height: 80px">&nbsp;</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <!--/100% body table-->
          </body>
        </html>
        `
  })
}

module.exports = {
  sendWelcomeEmail,
  sendResetEmail
}