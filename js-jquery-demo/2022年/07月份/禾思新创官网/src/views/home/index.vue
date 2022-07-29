<template>
	<div class="home min-w">
		<div class="banner">
			<el-carousel
				trigger="hover"
				:height="bannerHeight + 'px'"
				arrow="never"
				:interval="5000"
			>
				<el-carousel-item>
					<img src="@/assets/home/banner1.png" />
				</el-carousel-item>
				<el-carousel-item>
					<img src="@/assets/home/banner1.png" />
				</el-carousel-item>
				<el-carousel-item>
					<img src="@/assets/home/banner1.png" />
				</el-carousel-item>
			</el-carousel>
		</div>
		<div class="advantage">
			<div class="w-main flex-center-center wow fadeInUp">
				<div class="item">
					<img src="@/assets/home/icon/icon1.png" />
					<div class="info">
						<h5>8年</h5>
						<p>跨境电商卖家经验</p>
					</div>
				</div>
				<div class="item">
					<img src="@/assets/home/icon/icon2.png" />
					<div class="info">
						<h5>5年</h5>
						<p>跨境电商服务商经验</p>
					</div>
				</div>
				<div class="item">
					<img src="@/assets/home/icon/icon3.png" />
					<div class="info">
						<h5>2年</h5>
						<p>TikTok运营孵化</p>
					</div>
				</div>
				<div class="item">
					<img src="@/assets/home/icon/icon4.png" />
					<div class="info">
						<h5>10亿+</h5>
						<p>平台卖家年销售额</p>
					</div>
				</div>
				<div class="item">
					<img src="@/assets/home/icon/icon5.png" />
					<div class="info">
						<h5>5W+</h5>
						<p>服务跨境卖家</p>
					</div>
				</div>
			</div>
		</div>
		<div class="company w-main flex-center-between">
			<div class="left wow fadeInLeft">
				<p class="herse">HERSE SHOP</p>
				<h2>禾思新创（深圳）科技有限公司</h2>
				<p>
					禾思新创（深圳）科技有限公司是一家集一站式平台、供应链分销、TikTok培训、跨境电商MCN、海外直播运营、数字化AI技术于一体的跨境电商服务公司。由创始人深跨协人才标准委员会秘书长「杨柳」与跨境电商独立站B2C全球知名品牌「雷特科技」联合成立。
				</p>
				<p>
					目前，公司布局全球跨境电商行业，主要集中服务于北美、欧洲、日本和中东等发达国家和地区站点，拥有5000+跨境电商店铺。禾思新创立足跨境电商行业8年，具备5年跨境电商服务商经验及2年TikTok运营孵化经验，致力打造TiKTok跨境生态一站式综合服务平台。
				</p>
			</div>
			<div class="right wow fadeInRight">
				<div class="content flex-center-end">
					<p class="herse">HERSE SHOP</p>
					<img src="@/assets/home/company.png" />
				</div>
			</div>
		</div>
		<div class="service">
			<div class="w-main main-content">
				<div class="head-title wow fadeInUp">
					<h1>服务项目</h1>
					<h4>全行业跨境运营营销解决方案，助您高效实现业务目标</h4>
				</div>
				<div class="prod flex-center wow fadeInUp">
					<div
						v-for="(item, index) in servicePro"
						:key="index"
						class="item"
						:class="{ active: serviceProIndex === index }"
						@mouseenter="serviceProIndex = index"
					>
						<p class="flex-center-center">{{ item.title }}</p>
						<div class="mark flex-column-center-center">
							<h4>{{ item.title }}</h4>
							{{ item.text }}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="cases">
			<div class="w-main main-content">
				<div class="head-title wow fadeInUp">
					<h1>客户案例</h1>
					<h4>行业优质案例展示，打造生态运营专家</h4>
				</div>
				<div class="list flex-center-between wow fadeInUp">
					<div class="item flex-center">
						<div class="img-hover">
							<img src="@/assets/home/cases/tp1.png" />
						</div>
						<div class="info">
							<h4>健身瑜伽类案例</h4>
							<p>一站式平台账号</p>
							<p>
								<span>30</span>
								个成长之路学习节点
							</p>
							<p>
								<span>180</span>
								天线上运营指导
							</p>
							<p>
								<span>1对1</span>
								远程教学
								<span>（40分钟/节，5节课）</span>
							</p>
							<p>
								<span>5</span>
								次TikTok账号诊断服务
							</p>
						</div>
					</div>
					<div class="item flex-center">
						<div class="img-hover">
							<img src="@/assets/home/cases/tp2.png" />
						</div>
						<div class="info">
							<h4>时尚美妆类案例</h4>
							<p>一站式平台账号</p>
							<p>
								<span>30</span>
								个成长之路学习节点
							</p>
							<p>
								<span>180</span>
								天线上运营指导
							</p>
							<p>
								<span>1对1</span>
								远程教学
								<span>（40分钟/节，5节课）</span>
							</p>
							<p>
								<span>5</span>
								次TikTok账号诊断服务
							</p>
						</div>
					</div>
					<div class="item flex-center">
						<div class="img-hover">
							<img src="@/assets/home/cases/tp3.png" />
						</div>
						<div class="info">
							<h4>服饰箱包类案例</h4>
							<p>一站式平台账号</p>
							<p>
								<span>30</span>
								个成长之路学习节点
							</p>
							<p>
								<span>180</span>
								天线上运营指导
							</p>
							<p>
								<span>1对1</span>
								远程教学
								<span>（40分钟/节，5节课）</span>
							</p>
							<p>
								<span>5</span>
								次TikTok账号诊断服务
							</p>
						</div>
					</div>
					<div class="item flex-center">
						<div class="img-hover">
							<img src="@/assets/home/cases/tp4.png" />
						</div>
						<div class="info">
							<h4>手机配件类案例</h4>
							<p>一站式平台账号</p>
							<p>
								<span>30</span>
								个成长之路学习节点
							</p>
							<p>
								<span>180</span>
								天线上运营指导
							</p>
							<p>
								<span>1对1</span>
								远程教学
								<span>（40分钟/节，5节课）</span>
							</p>
							<p>
								<span>5</span>
								次TikTok账号诊断服务
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="news">
			<div class="w-main main-content">
				<div class="head-title wow fadeInUp">
					<h1>跨境资讯</h1>
					<h4>第一时间掌握跨境电商行业动态，分享亚马逊实用运营工具</h4>
				</div>
				<div class="news-content wow fadeInUp">
					<div class="news-main-list flex-center-between">
						<div
							v-for="(item, index) in newsTopList"
							:key="index"
							class="item"
							@click="toDetail(item)"
						>
							<div class="content">
								<div class="img-hover">
									<img :src="item.path" />
								</div>
								<p class="ellipsis">{{ item.contentTitle }}</p>
							</div>
							<div class="info">
								<p class="ellipsis-col2">{{ item.contentDescription }}</p>
							</div>
						</div>
					</div>
					<div class="list flex-center-between">
						<div
							v-for="(item, index) in newsList"
							:key="index"
							class="item flex-center-between"
							@click="toDetail(item)"
						>
							<h5 class="ellipsis">{{ item.contentTitle }}</h5>
							<p>{{ item.times }}</p>
						</div>
					</div>
					<div class="more flex-center">
						<p @click="$router.push({ path: '/news/list', query: { tag: 0 } })">
							查看更多
							<i class="el-icon-d-arrow-right"></i>
						</p>
						<p @click="$router.push({ path: '/news/list', query: { tag: 1 } })">
							查看更多
							<i class="el-icon-d-arrow-right"></i>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import { WOW } from 'wowjs';
import { getNewsList } from '@/api/news.js';
import { fileUrl } from '@/utils';
export default {
	name: 'Home',
	data() {
		return {
			bannerHeight: 800,
			serviceProIndex: 0,
			servicePro: [
				{
					title: '一站式平台',
					text: '禾思新创海外直播深入20多个行业，具备200+垂直化⽹红资源，以短视频和直播的形式为跨境卖家提供海外短视频内容策划、品牌推广、直播带货等多个合作模式，提升客户产品销量，助力客户品牌出海。',
				},
				{
					title: '供应链分销',
					text: '禾思供应链分销平台自建30000+供应链商品分销平台，可供全球TikTok玩家进行一键分销，并提供分销链接创建、一键代发、分销返佣、视频源下载等多个功能版块，致力于打造TikTok shop全网最佳分销平台，让人人享受海外短视频带货红利。',
				},
				{
					title: 'TikTok培训',
					text: 'TikTok培训课程包含短视频基础课程、短视频运营课程、直播课程、短视频带货课程、短视频分销课程、短视频建设课程、跨境电商海外IP打造课程、跨境电商海外品牌出海课程等等。',
				},
				{
					title: '跨境电商MCN',
					text: '禾思新创有着100个MCN百万粉丝账号，单个账号粉丝量达760万，单个视频获赞量达2000万，单个视频播放量达2.5亿，以专业的网红经济运作模式，保障客户内容的持续输出，从而帮助商家实现稳定变现。',
				},
				{
					title: '海外直播运营',
					text: '禾思新创海外直播深入20多个行业，具备200+垂直化⽹红资源，以短视频和直播的形式为跨境卖家提供海外短视频内容策划、品牌推广、直播带货等多个合作模式，提升客户产品销量，助力客户品牌出海。',
				},
				{
					title: '数字化AI技术支持',
					text: '禾思新创利用数据分析平台、精品库系统、ERP系统、AI换脸、网络IP、去水印软件，从运营⼯具到数据分析平台为跨境卖家提供全⽅位的技术⽀持！',
				},
			],
			newsList: [],
			newsTopList: [],
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
		this.getNewsList();
	},
	methods: {
		toDetail(item) {
			this.$router.push({
				name: 'newsDetail',
				params: {
					id: item.id,
				},
			});
		},
		async getNewsList() {
			try {
				const res = await getNewsList({
					pageNo: 1,
					pageSize: 4,
					contentCategoryId: 186,
				});
				let data = this.newsData(res.data.data.rows);
				const res1 = await getNewsList({
					pageNo: 1,
					pageSize: 4,
					contentCategoryId: 187,
				});
				let data1 = this.newsData(res1.data.data.rows);
				let listTop = [data[0], data1[0]];
				this.newsTopList = listTop;
				let list = [data[1], data1[1], data[2], data1[2], data[3], data1[3]];
				this.newsList = list;
			} catch {
				//
			}
		},
		newsData(data) {
			data.forEach(item => {
				if (!item.imgUrl) {
					item.path = fileUrl + JSON.parse(item.contentImg)[0].path;
				}
				if (!item.times) {
					let times = item.createDate.slice(0, 10);
					item.times = times;
				}
			});
			return data;
		},
	},
};
</script>

<style lang="scss" scoped>
::v-deep {
	.el-carousel__button {
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}
	.is-active {
		.el-carousel__button {
			background-color: $primary;
		}
	}
}
.home {
}
.banner {
	img {
		width: 100%;
		height: auto;
		display: inline-block;
	}
}
.advantage {
	background: #ecf4fe;
	flex-flow: row wrap;
	.item {
		display: flex;
		align-items: center;
		padding: 50px 20px;
		&:hover {
			background: #fff;
		}
		img {
			width: 76px;
			height: 76px;
			object-fit: contain;
			margin-right: 10px;
		}
		h5 {
			color: #3269ff;
			line-height: 2;
		}
		p {
			font-size: 14px;
			color: #666;
		}
	}
}
.company {
	padding: 50px 0;
	.herse {
		font-size: 16px;
		line-height: 50px;
		color: #999;
		letter-spacing: 13px;
		font-weight: 300;
	}
	& > div {
		width: 50%;
	}
	.left {
		width: 500px;
		padding-bottom: 70px;
		h2 {
			color: #3269ff;
			line-height: 60px;
		}
		p {
			margin-top: 50px;
			line-height: 1.8;
		}
	}
	.right {
		position: relative;
		padding-right: 20px;
		padding-bottom: 20px;
		.herse {
			writing-mode: tb-rl;
		}
		.content {
			position: relative;
			z-index: 2;
		}
		img {
			width: 500px;
			height: 334px;
			flex: 0 0 auto;
		}
		&::after {
			content: '';
			display: block;
			position: absolute;
			z-index: 1;
			right: 0;
			bottom: 0;
			width: 440px;
			height: 290px;
			background: #3269ff;
		}
	}
}
.service {
	background-image: url('../../assets/home/service/bg.png');
	background-repeat: no-repeat;
	background-position: center;
	.main-content {
		padding: 70px 0;
	}
	.prod {
		.item {
			width: 160px;
			height: 360px;
			margin-right: 5px;
			position: relative;
			overflow: hidden;
			transition: 0.3s;
			background-repeat: no-repeat;
			background-position: center;
			&:nth-child(1) {
				background-image: url('../../assets/home/service/tp1.png');
			}
			&:nth-child(2) {
				background-image: url('../../assets/home/service/tp2.png');
			}
			&:nth-child(3) {
				background-image: url('../../assets/home/service/tp3.png');
			}
			&:nth-child(4) {
				background-image: url('../../assets/home/service/tp4.png');
			}
			&:nth-child(5) {
				background-image: url('../../assets/home/service/tp5.png');
			}
			&:nth-child(6) {
				background-image: url('../../assets/home/service/tp6.png');
			}
			&:last-child {
				margin-right: 0;
			}
			// img {
			// 	width: 160px;
			// 	height: 360px;
			// 	// object-fit: cover;
			// }
			p {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, 0.3);
				color: #fff;
				text-align: center;
				transition: 0.3s;
			}
			.mark {
				position: absolute;
				top: 360px;
				left: 0;
				width: 375px;
				height: 100%;
				background-color: rgba(#0032bc, 0.7);
				color: #eee;
				text-align: center;
				line-height: 1.8;
				padding: 50px;
				transition: 0.3s;
				h4 {
					margin-bottom: 20px;
					color: #fff;
				}
			}
			&.active {
				width: 375px;
				p {
					top: 360px;
				}
				.mark {
					top: 0;
				}
			}
		}
	}
}
.cases {
	background-image: url('../../assets/home/cases/bg.png');
	background-repeat: no-repeat;
	background-position: center;
	.main-content {
		padding: 70px 0;
	}
	.head-title {
		color: #fff;
		h4 {
			color: #eee;
		}
	}
	.list {
		flex-flow: row wrap;
		margin-bottom: -20px;
		.item {
			width: 48%;
			background: #f5f5f5;
			margin-bottom: 40px;
			padding: 1.5%;
			.img-hover {
				width: 240px;
				height: 180px;
				overflow: hidden;
				margin-right: 20px;
			}
			.info {
				h4 {
					font-weight: bold;
					margin-bottom: 0.8em;
				}
				p {
					margin-bottom: 0.5em;
					span {
						color: #3269ff;
					}
				}
			}
			&:hover {
				background: #fff;
			}
		}
	}
}
.news {
	background-image: url('../../assets/home/news/bg.png');
	background-repeat: no-repeat;
	background-position: center;
	.news-content {
		background: #fff;
		padding: 30px;
		box-shadow: 3px 3px 15px #ccc;
		.news-main-list {
			.item {
				width: 49%;
				.content {
					position: relative;
					width: 100%;
					height: 318px;
					cursor: pointer;
					p {
						font-size: 18px;
						color: #fff;
						line-height: 50px;
						background: rgba(0, 0, 0, 0.5);
						padding: 0 20px;
						position: absolute;
						bottom: 0;
						left: 0;
						width: 100%;
					}
				}
				.info {
					background: #dae4ff;
					padding: 20px;
					line-height: 1.8;
					color: #666;
				}
			}
		}
		.list {
			flex-flow: row wrap;
			.item {
				width: 49%;
				margin-top: 1em;
				line-height: 2em;
				cursor: pointer;
				h5 {
					width: 70%;
					padding-left: 20px;
					position: relative;
					&::before {
						content: '';
						display: block;
						width: 11px;
						height: 11px;
						border: 1px solid #999;
						border-radius: 50%;
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
					}
					&:hover {
						color: #3269ff;
						&::before {
							border-color: #3269ff;
						}
					}
				}
				p {
					font-size: 16px;
					color: #999;
				}
			}
		}
		.more {
			p {
				width: 50%;
				text-align: right;
				line-height: 40px;
				color: #666;
				padding-right: 10px;
				cursor: pointer;
				&:hover {
					color: $primary;
				}
			}
		}
	}
}
</style>
