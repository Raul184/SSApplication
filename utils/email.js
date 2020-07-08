const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');
module.exports = class Email {
  constructor(user,url){
    this.to = user.email
    this.firstName = user.name.split(' ')[0]
    this.url = url
    this.from = `Freaking Tours <${process.env.EMAIL_FROM}>`
  }
  createTransport(){
    if(process.env.NODE_ENV === 'production'){
      // Sengrid

    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async send(template, subject){
    // Html for email
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject
      }
    )
    // mail options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html)
    };
    // create transport & send email
    await this.createTransport().sendMail(mailOptions)
  }

  async sendWelcome(){
    await this.send('welcome', 'Hi adventurer , prepare to discover the world!!')
  }
}