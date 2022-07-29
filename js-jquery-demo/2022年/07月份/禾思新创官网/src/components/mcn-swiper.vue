<template>
	<div class="mcn-swiper wow fadeInUp">
		<div class="mcn-swiper-container">
			<div class="swiper-wrapper">
				<div v-for="(item, index) in imgs" :key="index" class="swiper-slide">
					<div class="item">
						<img :src="item" />
					</div>
				</div>
			</div>
			<!-- Add Pagination -->
			<!-- <div class="swiper-pagination"></div> -->
			<div class="swiper-button-prev"></div>
			<!--左箭头。如果放置在swiper外面，需要自定义样式。-->
			<div class="swiper-button-next"></div>
			<!--右箭头。如果放置在swiper外面，需要自定义样式。-->
		</div>
	</div>
</template>
<script>
import tp1 from '@/assets/service/mcn/tp1.png';
import tp2 from '@/assets/service/mcn/tp2.png';
import tp3 from '@/assets/service/mcn/tp3.png';
import tp4 from '@/assets/service/mcn/tp4.png';
import tp5 from '@/assets/service/mcn/tp5.png';
import tp6 from '@/assets/service/mcn/tp6.png';
import tp7 from '@/assets/service/mcn/tp7.png';
import tp8 from '@/assets/service/mcn/tp8.png';
import tp9 from '@/assets/service/mcn/tp9.png';
import tp10 from '@/assets/service/mcn/tp10.png';
import tp11 from '@/assets/service/mcn/tp11.png';
import tp12 from '@/assets/service/mcn/tp12.png';
import tp13 from '@/assets/service/mcn/tp13.png';
import tp14 from '@/assets/service/mcn/tp14.png';
import tp15 from '@/assets/service/mcn/tp15.png';
import tp16 from '@/assets/service/mcn/tp16.png';
import Swiper from 'swiper';
import 'swiper/css/swiper.css';
export default {
	data() {
		return {
			imgs: [
				tp1,
				tp2,
				tp3,
				tp4,
				tp5,
				tp6,
				tp7,
				tp8,
				tp9,
				tp10,
				tp11,
				tp12,
				tp13,
				tp14,
				tp15,
				tp16,
			],
		};
	},
	mounted() {
		this.lecturerSwiper();
	},
	methods: {
		lecturerSwiper() {
			new Swiper('.mcn-swiper-container', {
				pagination: {
					el: '.swiper-pagination',
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
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
.swiper-button-next,
.swiper-button-prev {
	background: #fff;
	width: 60px;
	height: 60px;
	&:after {
		font-size: 30px;
	}
	border-radius: 50%;
	box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
}
.mcn-swiper-container {
	position: relative;
	width: 100%;
	height: 708px;
	--swiper-navigation-color: #999;
	overflow: hidden;
}
.swiper-slide {
	transition: 300ms;
	transform: scale(0.8);
}
.swiper-slide-active,
.swiper-slide-duplicate-active {
	transform: scale(1);
}
.mcn-swiper {
	height: 708px;
	.swiper-slide {
		height: 708px;
	}
	.item {
		img {
			height: 708px;
		}
	}
}
</style>
