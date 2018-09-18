const { mysql } = require('../qcloud')

module.exports = async (ctx)=>{
	const books = await mysql('books')
						.select('books.*','cSessionInfo.user_Info')
						.join('cSessionInfo','books.openid','cSessionInfo.open_id')
						.orderBy('books.id','desc')
	ctx.state.data = {
		list:books.map((v)=>{
			const info = JSON.parse(v.user_Info)
			return Object.assign({},v,{
				user_Info:{
					nickName:info.nickName
				}
			})
		})
	}
}