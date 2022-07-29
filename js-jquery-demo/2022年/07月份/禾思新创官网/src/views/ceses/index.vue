<template>
	<div class="cases">
		<div class="banner-title min-w">
			<img src="@/assets/cases/banner.png" />
			<h1 class="wow fadeInLeft">客户案例中心</h1>
		</div>
		<div class="tag-list w-main flex-center-between">
			<div
				v-for="(item, index) in tagList"
				:key="index"
				class="tag"
				:class="{ active: tagIndex === index }"
				@click="onTag(index)"
			>
				{{ item }}
			</div>
		</div>
		<div class="bg-f5f5f5">
			<div class="case-block w-main">
				<div class="list flex-center">
					<div v-for="(item, index) in list" :key="index" class="item">
						<img src="@/assets/cases/case.png" alt="" />
						<div class="content">
							<h4>{{ item.title }}</h4>
							<p>{{ item.desc }}</p>
						</div>
						<p class="text">
							<span v-for="(t, tIndex) in item.text" :key="tIndex">
								{{ t }}
							</span>
						</p>
					</div>
				</div>
				<div class="pagination flex-center-center">
					<el-pagination
						background
						layout="prev, pager, next"
						prev-text="上一页"
						next-text="下一页"
						:total="100"
					></el-pagination>
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
			tagList: [
				'一站式平台',
				'供应链分销',
				'TikTok培训',
				'跨境电商MCN',
				'海外直播运营',
				'数字化AI技术支持',
			],
			tagIndex: 0,
			list: [
				{
					url: '',
					title: '全方位、全过程、优质高效',
					desc: '深圳市鸿羽国际物流有限公司成立于2013年，是一家致力于跨境电子商 务企业和品牌商提供全程物流解决方案的服务商，全面覆盖跨境物流，海外仓储...',
					text: ['深圳', '一件代发', '退货换标', 'FBA中转', '欧洲'],
				},
				{
					url: '',
					title: '全方位、全过程、优质高效',
					desc: '深圳市鸿羽国际物流有限公司成立于2013年，是一家致力于跨境电子商 务企业和品牌商提供全程物流解决方案的服务商，全面覆盖跨境物流，海外仓储...',
					text: ['深圳', '一件代发', '退货换标', 'FBA中转', '欧洲'],
				},
				{
					url: '',
					title: '全方位、全过程、优质高效',
					desc: '深圳市鸿羽国际物流有限公司成立于2013年，是一家致力于跨境电子商 务企业和品牌商提供全程物流解决方案的服务商，全面覆盖跨境物流，海外仓储...',
					text: ['深圳', '一件代发', '退货换标', 'FBA中转', '欧洲'],
				},
				{
					url: '',
					title: '全方位、全过程、优质高效',
					desc: '深圳市鸿羽国际物流有限公司成立于2013年，是一家致力于跨境电子商 务企业和品牌商提供全程物流解决方案的服务商，全面覆盖跨境物流，海外仓储...',
					text: ['深圳', '一件代发', '退货换标', 'FBA中转', '欧洲'],
				},
				{
					url: '',
					title: '全方位、全过程、优质高效',
					desc: '深圳市鸿羽国际物流有限公司成立于2013年，是一家致力于跨境电子商 务企业和品牌商提供全程物流解决方案的服务商，全面覆盖跨境物流，海外仓储...',
					text: ['深圳', '一件代发', '退货换标', 'FBA中转', '欧洲'],
				},
				{
					url: '',
					title: '全方位、全过程、优质高效',
					desc: '深圳市鸿羽国际物流有限公司成立于2013年，是一家致力于跨境电子商 务企业和品牌商提供全程物流解决方案的服务商，全面覆盖跨境物流，海外仓储...',
					text: ['深圳', '一件代发', '退货换标', 'FBA中转', '欧洲'],
				},
			],
			bannerHeight: 800,
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
	},
	methods: {
		onTag(index) {
			this.tagIndex = index;
		},
	},
};
</script>

<style lang="scss" scoped>
.tag-list {
	.tag {
		width: 100%;
		line-height: 80px;
		text-align: center;
		cursor: pointer;
		&.active {
			background: #f4f4f4;
		}
	}
}
.case-block {
	padding-bottom: 50px;
	.list {
		padding: 40px 0 20px;
		flex-flow: row wrap;
		margin-right: -31px;
		.item {
			background: #fff;
			border-radius: 20px;
			overflow: hidden;
			width: 380px;
			margin-right: 30px;
			margin-bottom: 30px;
			box-shadow: 3px 3px 15px #e2e2e2;
			cursor: pointer;
			img {
				width: 100%;
				height: 242px;
				object-fit: cover;
			}
			.content {
				padding: 5px 20px 15px;
			}
			h4 {
				line-height: 40px;
			}
			p {
				line-height: 26px;
				color: #999;
			}
			.text {
				padding: 15px 20px;
				border-top: 1px dashed #eee;
				span {
					margin-right: 10px;
				}
			}
		}
	}
}
::v-deep {
	.btn-prev,
	.btn-next {
		background: #fff !important;
		padding: 0 10px !important;
	}
	.number {
		background: #fff !important;
		&.active {
			background-color: #409eff !important;
			color: #fff !important;
		}
	}
}
</style>
