import jwt from 'jsonwebtoken';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

export const generateJwt = async (email, userRole) => {
  const payload = {
    email,
    userRole
  };
  return 'Bearer ' + (await jwt.sign(payload, process.env.SECRET));
};

export async function sendEmail(email, jwt) {
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
    from: process.env.EMAIL,
    to: `${email}`,
    subject: 'User Verification',
    text: `Please click on the link below within 5 minutes to complete your verification http://localhost:3000/api/bookstore_user/verification/${jwt}`
  };
  transporter.sendMail(msg, (err, result) => {
    console.log(result);
    if (err) throw new Error(err);
  });
}

export const setUserRole = (req, res, next) => {
  req.body.userRole = 'USER';
  next();
};

export const setAdminRole = (req, res, next) => {
  req.body.userRole = 'ADMIN';
  next();
};
