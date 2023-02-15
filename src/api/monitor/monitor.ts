import request from '/@/utils/request';

/**
 * 以下为模拟接口地址，gitee 的不通，就换自己的真实接口地址
 *
 * （不建议写成 request.post(xxx)，因为这样 post 时，无法 params 与 data 同时传参）
 *
 * 后端控制菜单模拟json，路径在 https://gitee.com/lyt-top/vue-next-admin-images/tree/master/menu
 * 后端控制路由，isRequestRoutes 为 true，则开启后端控制路由
 * @method getAdminUser 获取后端动态路由菜单(admin)
 * @method getTestMenu 获取后端动态路由菜单(test)
 */
export default  {
	// 获取监控信息
	useMonitorApi(params?: object) {
		return request({
			url: `http://10.167.1.36:48080/admin-api/test/diver-camera/page`,
            method: 'get',
            params,
            headers: {
                Authorization: 'Bearer test1',
            
            },
		})
	},
	// // 修改基地信息
	// updatajidiApi(params?: object){
	// 	return request({
	// 		url: `http://10.167.1.36:48080/admin-api/test/base-info/update`,
	// 		method: 'post',
	// 		params:{
	// 			id:1
	// 		},
	// 		headers: {
	// 			Authorization: 'Bearer test1',
	// 		},
	// 	});
	// },

	// // 获取地块信息
    //     getMassifApi(params?: object){
	// 		return request({
	// 			url: `http://10.167.1.36:48080/admin-api/test/parcel-info/page`,
	// 			method: 'get',
	// 			params,
	// 			headers: {
	// 				Authorization: 'Bearer test1',
	// 			},
	// 		});
	// 	}
}
