import nodemailer from "nodemailer";

export class Nodemailer {
  static initiateTransport() {
    return nodemailer.createTransport({
      service: "gmail",
     
      auth: {
        user: "talhafaheem1103@gmail.com",
        pass: 'nagycugbzmpakqcz',
      },

      
        // service:'gmail',

      
    });
  }



  static sendMail(data: {
    to: [string];
    subject: string;
    html: string;
  }): Promise<any> {
    return Nodemailer.initiateTransport().sendMail({
      from: "talhafaheem1103@gmail.com",
      to: data.to,
      subject: data.subject,
      html: data.html,
    });
  }
}