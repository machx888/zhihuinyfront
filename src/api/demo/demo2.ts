import request from '/@/utils/request';

export default{
    useDataApi(params?: object) {
		return request({
			url: `/admin-api/test/diver-weather-currweatherstation/page`,
            method: 'get',
            params,
            headers: {
                Authorization: 'Bearer test1',
            },
		})
	},
}