<template>
	<div class="footers">
		<div class="max-1400">
			<div class="f-line flex-center">
				<div class="tit">友情链接：</div>
				<div v-for="(item, index) in line" :key="index" class="item">
					<a :href="item.url" :alt="item.name">
						{{ item.name }}
					</a>
				</div>
			</div>
			<div class="flex-center-between footer-main">
				<div class="left">
					<img
						class="logo"
						@click="$router.push('/home')"
						src="@/assets/footer/logo2.png"
						alt="logo"
					/>
					<h5>TikTok生态运营专家</h5>
					<p>联系电话：18948792174（微信同号)</p>
					<p>办公时间：09:30~18:30</p>
					<p>地址：深圳市龙华区汇海广场B座21F</p>
				</div>
				<div class="center">
					<h3>报名入口</h3>
					<el-input class="input" placeholder="请输入您的昵称"></el-input>
					<el-input class="input" placeholder="请输入您的号码"></el-input>
					<el-input
						class="input"
						type="textarea"
						:rows="3"
						placeholder="请输入您的备注"
					></el-input>
					<el-button type="primary" class="submit-btn">立即报名</el-button>
				</div>
				<div class="right">
					<div class="qrcode-box flex-center-between">
						<div class="qrcode">
							<img src="@/assets/footer/code1.png" alt="禾思客服微信二维码" />
							<p>禾思客服微信二维码</p>
						</div>
						<div class="qrcode">
							<img src="@/assets/footer/code2.png" alt="禾思公众号二维码" />
							<p>禾思公众号二维码</p>
						</div>
					</div>
					<p>
						禾思新创（深圳）科技有限公司 版权所有
						<a href="https://beian.miit.gov.cn" target="_blank">
							粤ICP备2022086924号-1
						</a>
					</p>
					<p>
						Copyright @ 2008-2020
						<a href="http://www.ttb2c.com" target="_blank">ttb2c.com</a>
						All Rights Reserved
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Footers',
	data() {
		return {
			line: [
				{ name: 'TikTok运营', url: window.location.origin },
				{ name: 'TikTok短视频', url: window.location.origin },
				{ name: 'TikTok培训', url: window.location.origin },
			],
		};
	},
	create() {},
	methods: {
		scrollTop() {
			document.body.scrollTop = document.documentElement.scrollTop = 0;
		},
	},
};
</script>
<style lang="scss" scoped>
.footers {
	background-image: url('../assets/footer/bg.png');
	color: #ccc;
	.max-1400 {
		padding: 50px 0;
		max-width: 1400px;
		min-width: 1200px;
		width: 100%;
		margin: 0 auto;
	}
	.f-line {
		margin-bottom: 60px;
		flex-flow: row wrap;
		.tit {
			color: #fff;
			margin-bottom: 10px;
			line-height: 30px;
		}
		.item {
			margin-left: 30px;
			margin-bottom: 10px;
			line-height: 30px;
			color: #96a0b1;
			cursor: pointer;
		}
	}
	.footer-main {
		flex-flow: row wrap;
	}
	.left {
		.logo {
			width: 142px;
			height: 60px;
		}
		h5 {
			font-size: 24px;
			margin: 30px 0 80px;
		}
		p {
			line-height: 50px;
		}
	}
	.center {
		max-width: 500px;
		width: 100%;
		background: rgba(255, 255, 255, 0.1);
		padding: 0 30px 10px;
		border-radius: 10px;
		h3 {
			text-align: center;
			line-height: 60px;
		}
		.input {
			margin-bottom: 15px;
			::v-deep {
				input {
					background: transparent;
					height: 55px;
					line-height: 55px;
				}
				textarea {
					background: transparent;
				}
			}
		}
		.submit-btn {
			width: 100%;
			margin: 10px 0;
		}
	}
	.right {
		max-width: 420px;
		width: 100%;
		font-size: 14px;
		p {
			line-height: 30px;
			text-align: center;
		}
		.qrcode {
			padding-bottom: 20px;
			img {
				width: 187px;
				height: 188px;
			}
			p {
				line-height: 80px;
			}
		}
	}
}
@media (max-width: 1400px) {
	.footers {
		padding: 0 1rem;
	}
}
@media (max-width: 800px) {
	.f-line {
		display: none;
	}
	.footer-main {
		flex-flow: column wrap !important;
		.left {
			h5 {
				display: none;
			}
		}
	}
}
</style>
