/**
 * 公共配置
 */
module.exports = {
	debug: false,
	protocol: "http",
	backend: {
		host: "localhost",
		port: 99
	},
    api: {
        host: 'localhost',
        port: 9090,
        path: '/v1'
    },
	mock: {
		host: "localhost",
		port: 9093
	},
	validationPath: "/v1/validation",
	expire: {
		auth: "3h",
		wap: "7d",
		app: "1m"
	},
	queue: {
		host: "localhost",
		port: 11300
	},
	redis: {
		cache: {
			host: "localhost",
			port: 6380,             // 全内存型，不做持久化
			db: 8
		},
		normal: {
			host: "localhost",
			port: 6379,             // 可持久化
			db: 8
		}
	},
	mail: {
		sender: '淘权科技 <noreply@taoquanw.com>',
		smtp: {
			host: 'smtp.mxhichina.com',
			port: 25,
			secure: false, // upgrade later with STARTTLS
			auth: {
				user: 'noreply@taoquanw.com',
				pass: 'Hu123456'
			}
		}
	},
};