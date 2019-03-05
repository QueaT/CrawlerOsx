const nodemailer = require('nodemailer');
const {app}= require('electron');

//Static folder



const sendEmail =(person,subj,messenge,status)=>{

  let transporter = nodemailer.createTransport({
    host: "smtp.wp.pl",
    port: 465,
    auth: {
        user: 'prebid-test@wp.pl',
        pass: 'Eminem007d'
    },
        tls: {
          rejectUnauthorized: false
        }
      });
   
      let HelperOptions = {
        from: '"Prebid-aktualizacja" <prebid-test@wp.pl',
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
