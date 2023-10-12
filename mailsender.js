#! /usr/bin/env node

import { AUTH_METHODS, SMTPClient } from "emailjs";
import { createTransport } from "nodemailer";
import { config } from "dotenv";

config();

let trans = createTransport({
	host: process.env.SERVER,
	port: process.env.PORT,
	// authMethod: 
	auth: {
		user: process.env.USER,
		pass: process.env.PASS,
	}
});

trans.sendMail(
	{
		from: '"NTI Ugv" nti@ugv.edu.br',
		to: 'ens-kathleensouza@ugv.edu.br',
		subject: 'spoof test',
		text: 'I hope this works',
	},
	(err, message) => {
		console.log(err || message);
	}
);
