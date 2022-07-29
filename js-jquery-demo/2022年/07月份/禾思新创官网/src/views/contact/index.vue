<template>
	<div class="contact">
		<div class="banner-title min-w">
			<img src="@/assets/contact/banner.png" />
			<div class="title flex-center-center">
				<div class="wow fadeInLeft">
					<h2>您的满意</h2>
					<h2>就是我们前进的动力</h2>
				</div>
			</div>
		</div>
		<div class="page-content w-main">
			<div class="map">
				<baidu-map
					class="map"
					:center="map.center"
					:zoom="map.zoom"
					@ready="handler"
				>
					<!--缩放-->
					<bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
					<!--定位-->
					<bm-geolocation
						anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
						:show-address-bar="true"
						:auto-location="true"
					></bm-geolocation>
					<!--点-->
					<bm-marker
						:position="map.center"
						:dragging="map.dragging"
						animation="BMAP_ANIMATION_DROP"
					>
						<!--提示信息-->
						<bm-info-window :show="map.show">
							<div class="phone flex-center">
								<img class="map-icon" src="@/assets/contact/llws.png" />
								18948792174
							</div>
							<div class="address flex-center">
								<img class="map-icon" src="@/assets/contact/sj.png" />
								深圳市龙华区汇海广场B座21F
							</div>
						</bm-info-window>
					</bm-marker>
				</baidu-map>
			</div>
			<div class="contact-me">
				<div class="list flex-center-between">
					<div class="item">
						<img src="@/assets/contact/dizhi.png" />
						<p>深圳市龙华区汇海广场B座21F</p>
					</div>
					<div class="item">
						<img src="@/assets/contact/claccback.png" />
						<p>18948792174</p>
					</div>
					<div class="item">
						<img src="@/assets/contact/weixin.png" />
						<p>18948792174</p>
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
			bannerHeight: 800,
			map: {
				center: { lng: 114.034137, lat: 22.663333 },
				zoom: 18,
				show: true,
				dragging: true,
			},
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
	padding-top: 80px;
	.contact-me {
		padding: 50px;
		.item {
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			img {
				width: 128px;
				height: 128px;
				border-radius: 50%;
			}
			p {
				font-size: 18px;
				color: #666;
				line-height: 1.6;
				padding: 25px 0;
			}
		}
	}
}
.map {
	width: 100%;
	height: 500px;
	.map-icon {
		width: 18px;
		margin-right: 10px;
	}
	.phone {
		.map-icon {
			width: 20px;
			margin-right: 7px;
		}
	}
	.phone,
	.address {
		line-height: 1.8;
	}
}
</style>
