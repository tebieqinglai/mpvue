const {mysql} = require('../qcloud')

module.exports = async (ctx)=>{

	const top = await mysql('books')
						.select('id','title','count','image')
						.orderBy('count','desc')
						.limit(6)
	ctx.state.data={
		list:top
	}
}