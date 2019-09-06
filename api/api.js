import request from '../untils/request/index.js'
let newRequest =new request()
export default{
	getData(data){
		return newRequest.get({
			url:'https://unidemo.dcloud.net.cn/api/news',
			data:data
		})
	}
}