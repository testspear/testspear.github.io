#! /usr/bin/env node

import { createTransport } from "nodemailer";
import { config } from "dotenv";
import {createReadStream, readFileSync } from "fs";
import CsvReadableStream, {  } from "csv-reader";

// carregar varaiveis de ambiente em .env 
config();

// configurar lib de email
let trans = createTransport({
	host: process.env.SERVER,
	port: process.env.PORT,
	// authMethod: 
	auth: {
		user: process.env.USER,
		pass: process.env.PASS,
	}
});

// contador de pessoas/email
var i = 0;

// ler arquivo de pessoas .csv
var mails = createReadStream("sample.csv", {encoding: "utf-8"})
	// passar pelo leitor csv
	.pipe(new CsvReadableStream({trim: true}))
	// quando der error loggar
	.on('error', (err) => console.log(err))
	// na leitura de cad alinha
	.on('data', function (row) {
		
		// aumentar contador
		i++;

		// ((1 minuto +- 5 segundos) * contador)
		var tempo = ((Math.random() * 10000 - 5000) + 10000) * i;

		// criar retardo de tempo
		setTimeout(function(){
			// ler html do email de uma vez so como string
			var html = readFileSync("ugvmail.html").toString("utf-8");
			// substituir nome da pessoa
			html = html.replace('{PESSOA}', row[0]);
			html = html.replace('{UUID}', row[2]);
	
			// enviar email para pessoas
			trans.sendMail(
				{
					from: '"NTI Ugv" nti@ugv.edu.br',
					to: row[1],
					subject: 'Alteração de Senha',
					html: html
				},
				(err, message) => {
					console.log(err || message);
				}
			);
		}, tempo); 
	});

