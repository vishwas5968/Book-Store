import jwt from 'jsonwebtoken';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
export const generateJwt = async (id, emailAddress) => {
  const payload = {
    id,
    emailAddress
  };
  jwt.sign(payload, process.env.SECRET);
};
export async function sendEmail(email) {
  const OAuth2 = google.auth.OAuth2;
  const Oauth_client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
  );
  Oauth_client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
  const accessToken = Oauth_client.getAccessToken();
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    port: 587,
    secure: false,
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken
    },
    debug: true
  });
  let msg = {
    from: 'v14052000@gmail.com',
    to: `${email}`,
    subject: 'Hello',
    text: 'Hello World',
    // eslint-disable-next-line max-len
    html: '<a href=http://localhost:3000/api/bookstore_user//verification/:token">Click here to register </a>'
  };
  transporter.sendMail(msg, (err, result) => {
    console.log(result);
    if (err) throw new Error(err);
  });
}
