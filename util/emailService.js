import sgMail from "@sendgrid/mail";

export default (email) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: "tags@gmail.com",
    subject: "Welcome to Tags",
    text: "Welcome to Tags, Manage your dashboard",
    html: "<strong>Welcome to Tags,  Manage your dashboard</strong>",
  };
  sgMail
    .send(msg)
    .then(() => {
      // console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
