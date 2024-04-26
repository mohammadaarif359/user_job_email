const ejs = require("ejs");
const path = require("path");
const transporter = require("./transporter");

const sendEmailCreationEmail = async ({ name, email }) => {
  const requiredPath = path.join(__dirname, "../views/AccountCreated.ejs");

  const data = await ejs.renderFile(requiredPath, {
    name: name,
  });

  var mainOptions = {
    from: process.env.MAIL_FROM,
    to: email,
    subject: "Account Activated",
    html: data,
  };

  await transporter.sendMail(mainOptions);
};

module.exports = sendEmailCreationEmail;
