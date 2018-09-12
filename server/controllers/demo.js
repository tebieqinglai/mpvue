
console.log(123)
module.exports = async (ctx)=>{
  ctx.state.data = {
    msg:'hello 小程序后台1234'
  }
}