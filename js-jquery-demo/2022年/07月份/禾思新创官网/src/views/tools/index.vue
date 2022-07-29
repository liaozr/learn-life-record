<template>
	<div class="tools">
		<div class="banner-title min-w">
			<img src="@/assets/tools/banner.png" />
		</div>
		<div class="page-content w-main">
			<div
				v-for="(item, index) in toolsList"
				:key="index"
				class="list-box wow fadeInUp"
			>
				<div class="title">{{ item.title }}</div>
				<div class="list flex-center">
					<div
						v-for="(itemSub, indexSub) in item.list"
						:key="indexSub"
						class="item flex-column-center"
					>
						<div class="img-hover">
							<img
								:src="require('@/assets/tools/logo' + itemSub.img + '.png')"
							/>
						</div>
						<h5>{{ itemSub.titleSub }}</h5>
						<p>{{ itemSub.text }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import { WOW } from 'wowjs';
export default {
	name: 'Home',
	data() {
		return {
			toolsList: [
				{
					title: '常用工具',
					list: [
						{
							img: '1',
							titleSub: 'TikTok账号交易平台（非官方）',
							text: '该平台同时也支持Instagram以及Youtube的账号交易',
						},
						{
							img: '2',
							titleSub: 'IP检测平台',
							text: '用于检测IP所在地及经纬度，确保伪装的IP在目标国家',
						},
						{
							img: '3',
							titleSub: '虎克',
							text: '用户在下载注册TikTok时，可在平台购买苹果ID和邮箱',
						},
						{
							img: '4',
							titleSub: 'NaturalReader',
							text: '比较专业的语音转换网站，部分需要收费',
						},
						{
							img: '5',
							titleSub: '飞书深诺',
							text: '目前Tiktok国内的广告代理开户平台之一',
						},
						{
							img: '6',
							titleSub: 'AppGrowing',
							text: '广告分析平台，含app推广排行',
						},
					],
				},
				{
					title: '素材下载平台',
					list: [
						{
							img: '7',
							titleSub: 'bilibili视频下载平台',
							text: '支持YouTube、facebook、视频号等视频下载',
						},
						{
							img: '8',
							titleSub: '哼哼猫去水印',
							text: '批量下载视频的网站，部分需要收费',
						},
						{
							img: '9',
							titleSub: 'Brust',
							text: 'Burst提供免费，美丽的仓储摄影，适合需要图片做加入视频剪辑的时候使用',
						},
						{
							img: '10',
							titleSub: 'pexels',
							text: '免费的高清图片下载，同时也提供免费的高清视频',
						},
						{
							img: '11',
							titleSub: '站长素材',
							text: '无版权音乐下载，可根据适用的场景，音乐类型等进行选择。',
						},
						{
							img: '12',
							titleSub: 'mixkit',
							text: '无版权音乐下载，可根据适用的场景，音乐类型等进行选择。',
						},
						{
							img: '13',
							titleSub: 'videvo',
							text: '提供免费的视频素材，音乐轨道和声音音效',
						},
					],
				},
				{
					title: '剪辑工具',
					list: [
						{
							img: '14',
							titleSub: '剪映',
							text: '抖音旗下的视频剪辑工作，手机端、电脑端都有，基本能满足日常90%的剪辑需求',
						},
						{
							img: '14',
							titleSub: 'Capcut',
							text: '海外版TIKTOK，简称海外版剪映，目前只有手机版，功能一样很齐全',
						},
						{
							img: '15',
							titleSub: '万兴瞄影',
							text: '万兴喵影是一款很实用的剪辑软件，海外英文名是wondershare filmora，',
						},
					],
				},
			],
		};
	},
	mounted() {
		this.$nextTick(() => {
			const wow = new WOW({
				live: false,
			});
			wow.init();
		});
	},
	methods: {
		onTag(index) {
			this.tagIndex = index;
		},
		handler({ map }) {
			// 鼠标缩放
			map.enableScrollWheelZoom(true);
			// 点击事件获取经纬度
			map.addEventListener('click', function (e) {
				console.log(e.point.lng, e.point.lat);
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.tools {
	background: #f5f5f5;
}
.banner-title {
	line-height: 160px;
	position: relative;
	.title {
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;
		h2 {
			color: #fff;
			font-size: 110px;
		}
	}
}
.page-content {
	padding-bottom: 80px;
	.list-box {
		margin-top: 20px;
		.title {
			font-size: 24px;
			font-weight: bold;
			line-height: 80px;
		}
		.list {
			flex-flow: row wrap;
			margin-right: -40px;
			.item {
				margin-right: 30px;
				width: 277px;
				height: 280px;
				padding: 30px;
				background: #fff;
				border-radius: 10px;
				margin-bottom: 30px;
				box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1);
				.img-hover {
					width: 160px;
					height: 60px;
				}
				h5 {
					font-size: 14px;
					font-weight: bold;
					line-height: 40px;
					margin: 20px 0;
				}
				p {
					color: #666;
					line-height: 1.6;
				}
				&:hover {
					background: #fcfcfc;
					img {
						transform: scale(1.1);
					}
				}
			}
		}
	}
}
</style>
