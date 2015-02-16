// server/smtp.js
Meteor.startup(function () {
  Meteor.absoluteUrl.defaultOptions.rootUrl = "http://talentincubator.eu";

  smtp = {
    username: 'info@talentincubator.eu',   // eg: server@gentlenode.com
    password: 'talentincubator2014',   // eg: 3eeP1gtizk5eziohfervU
    server:   'smtp.zoho.com',  // eg: mail.gandi.net
    port: 587
  };

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;



  // METEOR ACCOUNT CONFIGURATION.

  // By default, the email is sent from no-reply@meteor.com. If you wish to receive email from users asking for help with their account, be sure to set this to an email address that you can receive email at.
  Accounts.emailTemplates.from = 'info@talentincubator.eu';

  // The public name of your application. Defaults to the DNS name of the application (eg: awesome.meteor.com).
  Accounts.emailTemplates.siteName = 'Talent Incubator School';

  // A Function that takes a user object and returns a String for the subject line of the email.
  Accounts.urls.verifyEmail = function(token) {
  return Meteor.absoluteUrl('#/verify-email/' + token);
  };

  Accounts.emailTemplates.verifyEmail = {
   subject: function(user) {
      return "Talent Incubator Coding Bootcamp - Confirm Your Email Address";
   },
   text: function(user, url) {
       var greeting = (user.profile && user.profile.name) ?
           ("Hello " + user.profile.name + ",") : "Hello,";
       return greeting + "\n"+
               "\n"+
               "To verify your account email, simply click the link below.\n"+
                "\n"+
               url + "\n"+
               "\n"+
               "Thanks.\n";
   }
};

//SEND A VERIFICATION EMAIL
  Accounts.onCreateUser(function(options, user) {
    user.profile = options.profile;
    user.profile.role= "viewer";
    user.profile.ActiveStudent= false;
    user.profile.EnrolledClass= null;
    // we wait for Meteor to create the user before sending an email
    Meteor.setTimeout(function() {
      Accounts.sendVerificationEmail(user._id);
    }, 2 * 1000);

    return user;
  });

 });
// var template = "\
// <center>\
//             <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;background-color: #F2F2F2;height: 100% !important;width: 100% !important;">\
//                 <tbody><tr>\
//                     <td align="center" valign="top" id="bodyCell" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 20px;border-top: 0;height: 100% !important;width: 100% !important;">
//                         <!-- BEGIN TEMPLATE // -->
//                         <table border="0" cellpadding="0" cellspacing="0" width="600" id="templateContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;border: 0;">
//                             <tbody><tr>
//                                 <td align="center" valign="top" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
//                                     <!-- BEGIN PREHEADER // -->
//                                     <table border="0" cellpadding="0" cellspacing="0" width="600" id="templatePreheader" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #FFFFFF;border-top: 0;border-bottom: 0;">
//                                         <tbody><tr>
//                                         	<td valign="top" class="preheaderContainer" style="padding-top: 9px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"></td>
//                                         </tr>
//                                     </tbody></table>
//                                     <!-- // END PREHEADER -->
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td align="center" valign="top" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
//                                     <!-- BEGIN HEADER // -->
//                                     <table border="0" cellpadding="0" cellspacing="0" width="600" id="templateHeader" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #FFFFFF;border-top: 0;border-bottom: 0;">
//                                         <tbody><tr>
//                                             <td valign="top" class="headerContainer" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
//     <tbody class="mcnImageBlockOuter">
//             <tr>
//                 <td valign="top" style="padding: 9px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnImageBlockInner">
//                     <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
//                         <tbody><tr>
//                             <td class="mcnImageContent" valign="top" style="padding-right: 9px;padding-left: 9px;padding-top: 0;padding-bottom: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                
                                    
//                                         <img align="left" alt="" src="https://gallery.mailchimp.com/39f11f360c81f67211a8c45b5/images/42f43f28-4f5e-47ef-95bd-def9dc9c9f51.png" width="564" style="max-width: 1130px;padding-bottom: 0;display: inline !important;vertical-align: bottom;border: 0;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;" class="mcnImage">
                                    
                                
//                             </td>
//                         </tr>
//                     </tbody></table>
//                 </td>
//             </tr>
//     </tbody>
// </table></td>
//                                         </tr>
//                                     </tbody></table>
//                                     <!-- // END HEADER -->
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td align="center" valign="top" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
//                                     <!-- BEGIN BODY // -->
//                                     <table border="0" cellpadding="0" cellspacing="0" width="600" id="templateBody" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #FFFFFF;border-top: 0;border-bottom: 0;">
//                                         <tbody><tr>
//                                             <td valign="top" class="bodyContainer" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
//     <tbody class="mcnTextBlockOuter">
//         <tr>
//             <td valign="top" class="mcnTextBlockInner" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                
//                 <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
//                     <tbody><tr>
                        
//                         <td valign="top" class="mcnTextContent" style="padding-top: 9px;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #606060;font-family: Helvetica;font-size: 15px;line-height: 150%;text-align: left;">
                        
//                             <h1 style="margin: 0;padding: 0;display: block;font-family: Helvetica;font-size: 40px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: -1px;text-align: left;color: #606060 !important;"><span style="font-size:18px">Σας ευχαριστούμε, που την εγγραφή σας.</span></h1>

// <p style="margin: 1em 0;padding: 0;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #606060;font-family: Helvetica;font-size: 15px;line-height: 150%;text-align: left;"><span style="line-height:1.6em">Παρακαλούμε επιβεβαιώστε το email σας ακολουθώντας το παρακάτω link.&nbsp;</span></p>

//                         </td>
//                     </tr>
//                 </tbody></table>
                
//             </td>
//         </tr>
//     </tbody>
// </table></td>
//                                         </tr>
//                                     </tbody></table>
//                                     <!-- // END BODY -->
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td align="center" valign="top" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
//                                     <!-- BEGIN FOOTER // -->
//                                     <table border="0" cellpadding="0" cellspacing="0" width="600" id="templateFooter" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #FFFFFF;border-top: 0;border-bottom: 0;">
//                                         <tbody><tr>
//                                             <td valign="top" class="footerContainer" style="padding-bottom: 9px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"></td>
//                                         </tr>
//                                     </tbody></table>
//                                     <!-- // END FOOTER -->
//                                 </td>
//                             </tr>
//                         </tbody></table>
//                         <!-- // END TEMPLATE -->
//                     </td>
//                 </tr>
//             </tbody></table>
//         </center>
//         ";


