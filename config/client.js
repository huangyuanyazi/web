/**
 * 浏览器端配置
 */
module.exports = {
	client: {
        api: {
            host: 'api.taoquanw.com',
            port: 80,
            path: '/v1'
        },
        mock: {
            host: 'mock.taoquanw.com',
            port: 80
        },
        site: {
            host: 'www.taoquanw.com',
            port: 80
        },
        admin: {
            host: 'admin.taoquanw.com',
            port: 80
        },
        patent: {
            host: 'zl.taoquanw.com',
            port: 80
        },
        mobile: {
            host: 'm.taoquanw.com',
            port: 80
        },
        socket: {
            host: 'taoquanw.com',
            port: 3000
        },
        img: {
            host: 'img.taoquanw.com',
            port: 80
        }
	}
};