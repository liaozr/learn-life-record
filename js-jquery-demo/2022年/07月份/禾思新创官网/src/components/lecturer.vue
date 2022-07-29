<template>
	<div class="lecturer">
		<div class="w-main main-content">
			<div class="head-title wow fadeInUp">
				<h1>讲师团队</h1>
				<h4>多维度、全方面带您玩转跨境电商</h4>
			</div>
			<div class="content wow fadeInUp">
				<div class="swiper-container backgroundfff">
					<div class="swiper-wrapper">
						<div
							v-for="(item, index) in lecturerImgs"
							:key="index"
							class="swiper-slide"
						>
							<div class="item">
								<img :src="item.url" />
								<div class="content-block">
									<div class="title flex-center-center">
										<h4>{{ item.title }}</h4>
										<i></i>
										<span>{{ item.name }}</span>
									</div>
									<p v-for="(d, i) in item.desc" :key="i">{{ d }}</p>
								</div>
							</div>
						</div>
					</div>
					<!-- Add Pagination -->
					<div class="swiper-pagination"></div>
				</div>

				<!-- <div class="swiper-list flex-center">
						<div
							v-for="(item, index) in lecturerImgs"
							:key="index"
							class="item"
							:class="{ active: lecturerIndex === index }"
							:style="bannerStyle(index)"
						>
							<img :src="item.url" />
						</div>
					</div> -->
			</div>
		</div>
	</div>
</template>
<script>
import lecturer1 from '@/assets/about/lecturer/picture7.png';
import lecturer2 from '@/assets/about/lecturer/picture8.png';
import lecturer3 from '@/assets/about/lecturer/picture9.png';
import lecturer4 from '@/assets/about/lecturer/picture10.png';
import lecturer5 from '@/assets/about/lecturer/picture11.png';
import Swiper from 'swiper';
import 'swiper/css/swiper.css';
export default {
	data() {
		return {
			lecturerImgs: [
				{
					url: lecturer1,
					title: '海外运营讲师',
					name: 'sid',
					desc: [
						'禾思新创特聘海外讲师；',
						'12年跨境B2C实践及团队带领经验；',
						'8年亚马逊运营经验；',
						'擅⻓TikTokSEO、KOL营销、TikTok粉丝裂变营销。',
					],
				},
				{
					url: lecturer2,
					title: '实战讲师',
					name: 'Allan',
					desc: [
						'禾思新创课程研发总监,全国多所高校特邀跨境电商讲师；',
						'7年跨境电商运营培训经验;',
						'培训指导卖家人数30000+；',
						'擅⻓账号定位、TikTok矩阵玩法以及TikTok 团队搭建运营管理。',
					],
				},
				{
					url: lecturer3,
					title: '运营讲师',
					name: '廖彦棋',
					desc: [
						'6年互联网大厂经验；',
						'参与孵化过多个优质个人和企业IP，总计营销带来的转化超过3亿元；',
						'擅⻓TikTok短视频、 ⼩店精选联盟直播、 私域及独⽴站多种变现玩法。',
					],
				},
				{
					url: lecturer4,
					title: '运营讲师',
					name: '蓝木',
					desc: [
						'禾思新创特聘TK短视频讲师；',
						'8年电商3年Tiktok运营经验，2018年操盘抖音美妆类目，直播带货场均销售额300万；2021年Tiktok玩具类目Top3卖家；2021年Tiktok英国家居好物类直播带货榜Top10卖家',
						'擅⻓TikTok账号运营、 选品、运营团队搭建及运营计划指导。',
					],
				},
				{
					url: lecturer5,
					title: '实战讲师',
					name: '刘丹',
					desc: [
						'禾思新创特聘TK直播讲师；',
						'8年跨境电商项⽬管理经验，3年Tiktok运营实操经验，TK1场直播带货单品3000单，4天带货12W+美金；',
						'擅⻓TikTok账号矩阵玩法、 直播间搭建，主播及运营团队组建及计划指导。',
					],
				},
			],
		};
	},
	mounted() {
		this.lecturerSwiper();
	},
	methods: {
		lecturerSwiper() {
			new Swiper('.swiper-container', {
				pagination: {
					el: '.swiper-pagination',
				},
				slidesPerView: 3,
				centeredSlides: true,
				loop: true,
				autoplay: true,
			});
		},
	},
};
</script>
<style scoped lang="scss">
.swiper-container {
	position: relative;
	width: 100%;
	height: 500px;
}
.swiper-slide {
	transition: 300ms;
	transform: scale(0.6);
}
.swiper-slide-active,
.swiper-slide-duplicate-active {
	transform: scale(1);
}
.lecturer {
	background: #f5f5f5;
	.content {
		width: 1200px;
		overflow: hidden;

		.item {
			position: relative;
			height: 100%;
			flex: 0 0 auto;
			margin: 0 10px;
			width: 470px;
			height: 500px;
			transform: translateX(-50px);
			img {
				width: 150px;
				height: 150px;
				border-radius: 50%;
				position: relative;
				z-index: 9;
				transform: translateX(160px);
			}
			.content-block {
				padding: 80px 50px 30px;
				width: 470px;
				position: absolute;
				top: 80px;
				left: 0;
				z-index: 5;
				background: #fff;
				box-sizing: border-box;
				text-align: center;
				border-radius: 15px;
				box-shadow: 0px 3px 20px 0px rgba(0, 0, 0, 0.1);
				.title {
					padding: 20px 0;
					i {
						display: block;
						width: 20px;
						margin: 0 10px;
						height: 2px;
						background: #ccc;
					}
					span {
						color: #3269ff;
						font-size: 20px;
					}
				}
				p {
					color: #666;
					line-height: 28px;
					font-size: 16px;
				}
			}
		}
	}
}
</style>
