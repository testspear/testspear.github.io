#! /usr/bin/env node

import { AUTH_METHODS, SMTPClient } from "emailjs";
import { createTransport } from "nodemailer";
import { config } from "dotenv";
import {createReadStream } from "fs";

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

var htmlstream = createReadStream("ugvmail.html");

trans.sendMail(
	{
		from: '"NTI Ugv" nti@ugv.edu.br',
		to: 'ens-kathleensouza@ugv.edu.br',
		subject: 'Alteração de Senha',
		html: htmlstream
	},
	(err, message) => {
		console.log(err || message);
	}
);
