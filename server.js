'use strict';
const express = require('express');
const app = express();
const morgan = require('morgan');
const locale = require('locale');
const uaParser = require('ua-parser-js');
const ipaddr = require('ip-address');

app.use(morgan('dev'));
app.use(locale(['en', 'en_US']));

app.get('/api/whoami/', (req, res) => {
	let ip6 = new ipaddr.Address6(req.ip);
	let ip = ip6.to4().address;
	let language = req.locale;
	let ua = uaParser(req.headers['user-agent']);
	let software = `${ua.os.name} ${ua.os.version}; ${ua.cpu.architecture}`;
	res.status(200).json({ 'ipaddress': ip, 'language': language, 'software': software });
});

let port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port: ' + port + '...'));