const nodeMailer = require('nodemailer')

//status:
//  - Created
//  - Processing
//  - Cancelled
//  - Complete

module.exports = (email, status) => {
  const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'choko.confirmation@gmail.com',
      pass: process.env.GMAILPASS
    }
  })

  let emailBody
  switch (status) {
    case 'Created':
      emailBody = {
        subject: 'Order Received',
        text:
          'Thank you so much for shopping at Choko. We have received your order and appreciate your business. You will receive a confirmation email when we have begun processing your order.'
      }
      break
    case 'Processing':
      emailBody = {
        subject: 'Order Processing',
        text:
          'We are excited to let you know that we are currently processing your order. We will send a confirmation email when your order has shipped.'
      }
      break
    case 'Cancelled':
      emailBody = {
        subject: 'Order Cancelled',
        text:
          'We regret to inform you that a baby got into our stock and ate allllll the chocolate. Please accept promo code OOPSIES as our apology and apply it to your next order to receive 20% off!'
      }
      break
    case 'Completed':
      emailBody = {
        subject: 'Order Shipped',
        text:
          'Your order has just been shipped. Start the countdown to chocolatey nirvana!'
      }
      break
    default:
      emailBody = {}
  }
  const mailOptions = Object.assign(
    {},
    {
      from: '"Choko Hopper" <choko.confirmation@gmail.com>',
      to: email
    },
    emailBody
  )

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error(error)
    }
    console.log('Message sent')
  })
}
