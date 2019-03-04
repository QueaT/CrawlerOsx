const nodemailer = require('nodemailer');
const {app}= require('electron');

//Static folder



const sendEmail =(person,subj,messenge,status)=>{

    let transporter = nodemailer.createTransport({
        host: "smtp.poczta.onet.pl",
        port: 587,
        auth: {
            user: 'kuba007d@vp.pl',
            pass: '2012end'
        },
        tls: {
          rejectUnauthorized: false
        }
      });
   
      let HelperOptions = {
        from: '"Prebid-aktualizacja" <kuba007d@vp.pl',
        to: `${person}`,
        subject: `${subj}`,
        text: `${messenge}`
      };
      if(status){
        transporter.sendMail(HelperOptions, (error, info) => {
          if (error) {
  
            if(fun){
              fun(JSON.stringify(error));
            }
            return console.log(error);
          }
          console.log("The message was sent!");
  
        });
      }
      else{
        app.quit()
      }
     

}


module.exports.sendEmail = sendEmail;
