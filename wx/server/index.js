const db = require('../db');
const theatersCrawler = require('./crawler/theatersCrawler.js');
const saveTheaters = require('./save/saveTheaters');
(async ()=>{
	//连接数据库
	await db;

	const data = await theatersCrawler();

	await saveTheaters(data);
})()