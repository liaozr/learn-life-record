<template>
	<div class="cases">
		<div class="banner-title min-w">
			<img src="@/assets/service/banner.png" />
			<h1 class="wow fadeInLeft">TikTok生态服务中心</h1>
		</div>
		<div class="model">
			<div class="w-main main-content">
				<div class="head-title wow fadeInUp">
					<h1>六大服务模块</h1>
				</div>
				<div class="content">
					<div class="top item flex-center">
						<div class="left wow fadeInLeft">
							<img src="@/assets/service/model/tp1.png" />
						</div>
						<div class="right wow fadeInRight flex-column-start">
							<img src="@/assets/service/model/1.png" />
							<h1>一站式平台</h1>
							<p>
								禾思一站式服务平台
								涵盖TikTok运营培训、工具、数据分析、供应链、视频剪辑、网红达人、仓储物流、支付收款、账号注册等多个版块，能够为TikTok新手运营提供一站式导航，轻松解决TikTok运营过程中多个难题。
							</p>
						</div>
					</div>
					<div class="bottom item flex-center-between">
						<div class="right wow fadeInLeft flex-column-start">
							<img src="@/assets/service/model/2.png" />
							<h1>供应链分销</h1>
							<p>
								禾思供应链分销平台
								自建30000+供应链商品分销平台，可供全球TikTok玩家进行一键分销，并提供分销链接创建、一键代发、分销返佣、视频源下载等多个功能版块，致力于打造TikTok
								shop全网最佳分销平台，让人人享受海外短视频带货红利。
							</p>
						</div>
						<div class="left wow fadeInRight">
							<img src="@/assets/service/model/tp2.png" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="train bg-f5f5f5">
			<div class="w-main main-content">
				<div class="head-title wow fadeInUp">
					<h1>Tiktok培训</h1>
					<h4>
						禾思新创为品牌出海提供最专业的服务，成为跨境电商"人""货""场"综合解决方案服务专家
					</h4>
				</div>
				<div class="content flex-center-between wow fadeInUp">
					<div class="item">
						<img src="@/assets/service/train/tb1.png" />
						<h4>TikTok短视频基础课程</h4>
					</div>
					<div class="item">
						<img src="@/assets/service/train/tb2.png" />
						<h4>TikTok短视频运营课程</h4>
					</div>
					<div class="item">
						<img src="@/assets/service/train/tb3.png" />
						<h4>TikTok直播课程</h4>
					</div>
					<div class="item">
						<img src="@/assets/service/train/tb4.png" />
						<h4>TikTok短视频带货课程</h4>
					</div>
					<div class="item">
						<img src="@/assets/service/train/tb5.png" />
						<h4>TikTok独立站建设课程</h4>
					</div>
					<div class="item">
						<img src="@/assets/service/train/tb6.png" />
						<h4>TikTok短视频分销课程</h4>
					</div>
					<div class="item">
						<img src="@/assets/service/train/tb7.png" />
						<h4>跨境电商海外IP打造课程</h4>
					</div>
					<div class="item">
						<img src="@/assets/service/train/tb8.png" />
						<h4>跨境电商品牌出海课程</h4>
					</div>
				</div>
			</div>
		</div>
		<div class="mcn">
			<div class="w-main main-content">
				<div class="head-title wow fadeInUp">
					<h1>跨境电商MCN</h1>
				</div>
				<div class="content">
					<div class="statistics flex-center-between">
						<div class="item flex-column-center">
							<div class="title flex-end">
								<h1>100</h1>
								<h4>个</h4>
							</div>
							<p>MCN百万粉丝账号</p>
						</div>
						<div class="item flex-column-center">
							<div class="title flex-end">
								<h1>2.5</h1>
								<h4>亿</h4>
							</div>
							<p>单个视频播放量</p>
						</div>
						<div class="item flex-column-center">
							<div class="title flex-end">
								<h1>2000</h1>
								<h4>万</h4>
							</div>
							<p>单个视频获赞量</p>
						</div>
						<div class="item flex-column-center">
							<div class="title flex-end">
								<h1>760</h1>
								<h4>万</h4>
							</div>
							<p>单个账号粉丝量</p>
						</div>
					</div>
					<mcn-swiper></mcn-swiper>
				</div>
			</div>
		</div>
		<div class="overseas">
			<div class="w-main main-content">
				<div class="head-title wow fadeInUp">
					<h1>海外直播运营</h1>
					<h3>
						<span>20多个行业，200+垂直化网红资源，</span>
						以短视频和直播的形式为跨境卖家提供海外
					</h3>
					<h3>短视频内容策划、品牌推广、直播带货等多个合作模式</h3>
				</div>
			</div>
			<div class="content">
				<div class="preview-image-box">
					<div class="w-main preview-image">
						<img
							class="phone-bg"
							src="@/assets/service/overseas/phone-bg.png"
							alt=""
						/>
						<div class="img-list">
							<div
								class="item flex-center"
								:style="overseasStyle()"
								@mouseover="mouseOverOversea"
								@mouseleave="mouseLeaveOversea"
							>
								<img src="@/assets/service/overseas/tp1.png" alt="" />
								<img src="@/assets/service/overseas/tp2.png" alt="" />
								<img src="@/assets/service/overseas/tp3.png" alt="" />
								<img src="@/assets/service/overseas/tp4.png" alt="" />
								<img src="@/assets/service/overseas/tp5.png" alt="" />
							</div>
						</div>
					</div>
				</div>
				<div class="w-main thumbnail flex-center-between">
					<div
						v-for="(item, index) in overseasImage"
						:key="index"
						class="item"
						@click="onOverseas(index)"
						@mouseover="mouseOverOversea"
						@mouseleave="onOverseas(index)"
					>
						<img :src="item.url" :alt="item.title" />
						<div class="title">
							{{ item.title }}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="ai flex-center-center">
			<div class="ai-content main-content">
				<div class="head-title wow fadeInUp">
					<h1>数字化AI技术支持</h1>
					<h4>
						从运营⼯具到数据分析平台再到精品库系统，禾思新创为跨境卖家提供全⽅位的⽀持！
					</h4>
				</div>
				<div class="content flex-center-between wow fadeInUp">
					<div class="item">
						<h4>数据分析平台</h4>
						<p>⼤数据追踪TikTok流量趋势，提供热⻔视频、爆款商品</p>
					</div>
					<div class="item block-w">
						<h4>网络IP</h4>
						<p>便利店铺日常运营，一键采集、上传、管理商品</p>
					</div>
					<div class="item">
						<h4>ERP系统</h4>
						<p>便利店铺日常运营，一键采集、上传、管理商品</p>
					</div>
					<div class="item block-w">
						<h4>Ai换脸</h4>
						<p>快速导⼊素材，给素材换脸；解决主播地域化痛点</p>
					</div>
					<div class="item">
						<h4>精品库系统</h4>
						<p>一手货源，类目齐全，每日上新精品，月上新数可达1000+</p>
					</div>
					<div class="item block-w">
						<h4>去水印软件</h4>
						<p>批量去⽔印系统，批量剪辑导出视频</p>
					</div>
				</div>
			</div>
		</div>
		<!-- 讲师团队 -->
		<lecturer></lecturer>
		<div class="partner">
			<div class="w-main main-content">
				<div class="head-title wow fadeInUp">
					<h1>合作伙伴</h1>
					<h4>
						帮助各类型企业迅速开拓海外市场，⽬前服务的客⼾涵盖互联⽹、
						化妆品、服饰、快消食品、3C数码等多个⾏业。
					</h4>
				</div>
				<div class="content flex-center-between wow fadeInUp">
					<div class="item img-hover">
						<img src="@/assets/service/partner/logo2.png" alt="" />
					</div>
					<div class="item img-hover">
						<img src="@/assets/service/partner/logo1.png" alt="" />
					</div>
					<div class="item img-hover">
						<img src="@/assets/service/partner/logo3.png" alt="" />
					</div>
					<div class="item img-hover">
						<img src="@/assets/service/partner/logo4.png" alt="" />
					</div>
					<div class="item img-hover">
						<img src="@/assets/service/partner/logo5.png" alt="" />
					</div>
					<div class="item img-hover">
						<img src="@/assets/service/partner/logo6.png" alt="" />
					</div>
					<div class="item img-hover">
						<img src="@/assets/service/partner/logo7.png" alt="" />
					</div>
					<div class="item img-hover">
						<img src="@/assets/service/partner/logo8.png" alt="" />
					</div>
					<div class="item img-hover">
						<img src="@/assets/service/partner/logo9.png" alt="" />
					</div>
					<div class="item img-hover">
						<img src="@/assets/service/partner/logo10.png" alt="" />
					</div>
					<div class="item img-hover">
						<img src="@/assets/service/partner/logo11.png" alt="" />
					</div>
					<div class="item img-hover">
						<img src="@/assets/service/partner/logo12.png" alt="" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import { WOW } from 'wowjs';
import lecturer from '@/components/lecturer.vue';
import mcnSwiper from '@/components/mcn-swiper.vue';
import overseas1 from '@/assets/service/overseas/tp6.png';
import overseas2 from '@/assets/service/overseas/tp7.png';
import overseas3 from '@/assets/service/overseas/tp8.png';
import overseas4 from '@/assets/service/overseas/tp9.png';
import overseas5 from '@/assets/service/overseas/tp10.png';
export default {
	name: 'Home',
	components: { lecturer, mcnSwiper },
	data() {
		return {
			bannerHeight: 800,
			overseasImage: [
				{ title: '摄影', url: overseas1 },
				{ title: '美食', url: overseas2 },
				{ title: '美妆', url: overseas3 },
				{ title: '旅行', url: overseas4 },
				{ title: '家电', url: overseas5 },
			],
			overseasIndex: 0,
			overseasTime: null,
		};
	},
	mounted() {
		this.bannerHeight = (document.body.clientWidth / 1920) * 800;
		this.$nextTick(() => {
			const wow = new WOW({
				live: false,
			});
			wow.init();
		});
		this.onOverseasTime();
	},
	methods: {
		onTag(index) {
			this.tagIndex = index;
		},
		onOverseas(i) {
			this.overseasIndex = i;
		},
		onOverseasTime() {
			this.clearOverseasTime();
			this.overseasTime = setInterval(() => {
				if (this.overseasIndex > 3) {
					this.overseasIndex = 0;
				} else {
					this.overseasIndex += 1;
				}
			}, 3000);
		},
		clearOverseasTime() {
			this.overseasTime && clearInterval(this.overseasTime);
		},
		overseasStyle() {
			const overseasIndex = this.overseasIndex;
			const base = 561;
			let val = 0;
			val = overseasIndex * base;
			return `transform: translateX(-${val}px)`;
		},
		// 鼠标移出
		mouseLeaveOversea() {
			this.onOverseasTime();
		},
		// 鼠标移入
		mouseOverOversea() {
			this.clearOverseasTime();
		},
	},
};
</script>

<style lang="scss" scoped>
.banner-title {
	position: relative;
	h1 {
		font-size: 120px;
	}
	// .title {
	// 	position: absolute;
	// 	left: 0;
	// 	top: 0;
	// 	height: 100%;
	// 	width: 100%;
	// 	.font {
	// 		transform: translateX(50%);
	// 	}
	// 	h2 {
	// 		color: #fff;
	// 		font-size: 130px;
	// 		line-height: 200px;
	// 		font-weight: 800;
	// 		text-shadow: 5px 3px 0px #3269ff;
	// 	}
	// 	.banner-title-tag {
	// 		margin: 30px 0;
	// 		p {
	// 			color: #fff;
	// 			font-size: 50px;
	// 		}
	// 		i {
	// 			width: 12px;
	// 			height: 11px;
	// 			background: #ffffff;
	// 			border-radius: 50%;
	// 			margin: 0 30px;
	// 		}
	// 	}
	// }
}
.model {
	.content {
		padding: 80px 0;
		.item {
			.right {
				position: relative;
				height: 334px;
				justify-content: center;
				img {
					position: absolute;
					top: 0;
					left: 0;
				}
				h1 {
					line-height: 1.6;
					padding: 20px 0;
				}
				p {
					font-size: 16px;
					line-height: 1.6;
				}
			}
		}
		.top {
			.left {
				img {
					width: 705px;
					height: 423px;
				}
			}
			.right {
				margin-left: 30px;
				padding-top: 100px;
			}
		}
		.bottom {
			margin-top: 60px;
			.left {
				margin-left: 30px;
				img {
					width: 512px;
					height: 654px;
				}
			}
			.right {
				width: 500px;
				padding-top: 200px;
			}
		}
	}
}
.train {
	.content {
		flex-flow: row wrap;
		margin-bottom: -40px;
		.item {
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			justify-content: center;
			background: #fff;
			border-radius: 7px;
			padding: 30px;
			width: 270px;
			height: 240px;
			margin-bottom: 40px;
			cursor: pointer;
			&:hover {
				background: #e5ecff;
			}
			img {
				width: 96px;
				height: 96px;
			}
			h4 {
				line-height: 1.6;
				padding-top: 30px;
			}
		}
	}
}
.mcn {
	.statistics {
		padding: 60px 0;
		h1 {
			color: #3269ff;
			font-weight: 500;
			font-size: 70px;
		}
		h4 {
			line-height: 55px;
		}
		p {
			font-size: 20px;
			padding: 20px 0;
		}
	}
}
.overseas {
	background-image: url('../../assets/service/overseas/bg.png');
	background-repeat: no-repeat;
	background-position: left;
	.main-content {
		padding: 80px 0 0;
	}
	.head-title {
		color: #fff;
		h1 {
			margin-bottom: 30px;
		}
		h3 {
			font-size: 26px;
			line-height: 50px;
			span {
				color: #3269ff;
			}
		}
	}
	.content {
		padding-bottom: 70px;
		padding-top: 80px;
		.preview-image {
			position: relative;
			width: 654px;
			height: 397px;
			z-index: 9;
			.phone-bg {
				width: 654px;
				height: 397px;
			}
			.img-list {
				position: absolute;
				top: 60px;
				left: 48px;
				z-index: 8;
				width: 561px;
				height: 337px;
				overflow: hidden;
			}
			.item {
				flex: 0 0 auto;
				transition: 0.3s;
				img {
					width: 561px;
					height: 337px;
				}
			}
		}
		.preview-image-box {
			border-bottom: 1px solid rgba(255, 255, 255, 0.2);
		}
		.thumbnail {
			padding-top: 80px;
			.item {
				width: 100%;
				flex: 0 0 auto;
				width: 220px;
				height: 132px;
				cursor: pointer;
				position: relative;
				overflow: hidden;
				img {
					width: 100%;
					height: 100%;
				}
				.title {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
					background: rgba(0, 0, 0, 0.5);
					line-height: 132px;
					color: #fff;
					text-align: center;
					font-size: 30px;
					transition: 0.3s;
				}
				&:hover {
					.title {
						top: 132px;
					}
				}
			}
		}
	}
}
.ai {
	background-image: url('../../assets/service/ai/tp1.png');
	background-repeat: no-repeat;
	background-position: left;
	padding: 70px 0;
	.main-content {
		padding: 60px 0;
	}
	.ai-content {
		background: #ffffff;
		width: 930px;
		box-shadow: 0px 9px 40px 0px rgba(0, 0, 0, 0.1);
		transform: translateX(25%);
		.content {
			padding: 0 50px;
			flex-flow: row wrap;
			margin-top: -20px;
			.item {
				cursor: pointer;
				margin-top: 50px;
				h4 {
					line-height: 40px;
				}
				p {
					font-size: 16px;
					line-height: 40px;
					color: #666;
				}
				&:hover {
					h4 {
						color: #3269ff;
					}
				}
			}
			.block-w {
				width: 360px;
			}
		}
	}
}
.partner {
	background-image: url('../../assets/service/partner/bg.png');
	background-repeat: no-repeat;
	background-position: center;
	.content {
		flex-flow: row wrap;
		padding: 20px;
		.item {
			width: 260px;
			height: 150px;
			background: #ffffff;
			box-shadow: 0px 5px 18px 0px rgba(0, 0, 0, 0.1);
			margin-bottom: 40px;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>
