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
// 设备接口信息
export default  {
	// 获取气象站信息
	UserMeteorology(params?: object) {
		return request({
			url: `http://10.167.1.36:48080/admin-api/test/diver-weather-currweatherstation/page`,
            method: 'get',
            params,
            headers: {
                Authorization: 'Bearer test1',
            },
		})
	},

}
