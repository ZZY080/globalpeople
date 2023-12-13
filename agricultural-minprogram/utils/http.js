import {IP} from "../configs/config.js";
const baseURL = IP; // 你的接口基础地址

// 模拟请求拦截器
const requestInterceptor = async (config) => {
	// 在发送请求前做些什么，例如设置请求头等
	return config;
};

// 模拟响应拦截器
const responseInterceptor = async (response) => {
	// 对响应数据做些什么，例如处理返回的数据
	return response;
};

const request = async (url, method, data = {}) => {
	const config = {
		url: baseURL + url,
		method: method.toUpperCase(),
		data,
		header: {
			'Content-Type': 'application/json',
			// 其他请求头信息
		},
	};

	// 请求拦截器
	const interceptedConfig = await requestInterceptor(config);

	try {
		const res = await new Promise((resolve, reject) => {
			wx.request({
				...interceptedConfig,
				success: (response) => resolve(response),
				fail: (error) => reject(error),
			});
		});

		// 响应拦截器
		const processedResponse = await responseInterceptor(res);
		return processedResponse.data; // 返回响应的数据部分
	} catch (error) {
		throw error;
	}
};

// 封装各种请求方法
export const get = async (url, params = {}) => {
	return await request(url, 'GET', params);
};

export const post = async (url, data = {}) => {
	return await request(url, 'POST', data);
};

export const put = async (url, data = {}) => {
	return await request(url, 'PUT', data);
};

export const del = async (url, data = {}) => {
	return await request(url, 'DELETE', data);
};

