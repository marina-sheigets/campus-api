import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	// @ts-ignore

	service: 'gmail',
	// @ts-ignore
	host: process.env.SMTP_HOST,
	port: process.env.SMTP_PORT,
	secure: false,
	auth: {
		user: process.env.SMTP_USER,

		pass: process.env.SMTP_PASSWORD,
	},
});
class MailService {
	async sendMail(to: string, password: string) {
		await transporter.sendMail({
			from: process.env.SMTP_USER,
			to,
			subject: 'You were successfully registered in Electronic Campus !',
			text: '',
			html: `<div>
			<p> Your email is <b>${to}</b> </p>
			<p> Your password is <b>${password}</b> </p>
			To sign in, click the link below :
			<p><a src="www.electronic.campus.com"}></a></p>
			</div>`,
		});
	}
	async sendNewPassword(to: string, password: string) {
		await transporter.sendMail({
			from: process.env.SMTP_USER,
			to,
			subject: 'You got a new password !',
			text: '',
			html: `<div>
			<p> Your email is <b>${to}</b> </p>
			<p> Your new password is <b>${password}</b> </p>
			</div>`,
		});
	}
}

export default new MailService();
