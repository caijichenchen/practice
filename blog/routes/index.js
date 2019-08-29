
/*-- -------------查找页面------------ --*/
const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
	console.log(req.userInfo);
	res.render('main/index',{
		userInfo:req.userInfo
	})
})

module.exports = router