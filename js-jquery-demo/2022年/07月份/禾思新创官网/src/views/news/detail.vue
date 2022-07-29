<template>
	<div class="cases">
		<div class="banner-title min-w">
			<img src="@/assets/news/banner.png" />
			<h1 class="wow fadeInLeft">跨境电商资讯一网打尽</h1>
		</div>
		<div class="page-content-detail">
			<div class="content_box">
				<div class="section">
					<div class="section_title">
						<h2 id="newstitle">{{ details.contentTitle }}</h2>
					</div>
					<div class="news_about flex-center-center">
						<div class="name flex-center">
							<img src="@/assets/news/detail/tb1.png" alt="" title="" />
							<p>
								时间：
								<span id="newsAuthor">
									{{ details.createDate | formatDate }}
								</span>
							</p>
						</div>
						<div class="date flex-center">
							<img src="@/assets/news/detail/tb2.png" alt="" title="" />
							<p>
								作者：
								<span id="newstime">{{ details.contentAuthor }}</span>
							</p>
						</div>
						<div class="num flex-center">
							<img src="@/assets/news/detail/tb3.png" alt="" title="" />
							<p>
								阅读量：
								<span id="newsviews">{{ details.contentHit }}</span>
							</p>
						</div>
					</div>
					<div id="newdetail" class="section_content">
						<div class="desc" v-html="details.contentDetails"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import { WOW } from 'wowjs';
import { getNewsDetail } from '@/api/news.js';
export default {
	name: 'Home',
	filters: {
		formatDate(value) {
			console.log(value);
			if (value?.length > 10) {
				return value.slice(0, 10);
			} else {
				return value;
			}
		},
	},
	data() {
		return {
			newsID: '',
			showflag: false,
			details: {},
		};
	},
	mounted() {
		this.$nextTick(() => {
			const wow = new WOW({
				live: false,
			});
			wow.init();
		});

		this.details = {};
		this.showflag = false;
		this.newsID = this.$route.params.id;
		this.getNewsDetail();
	},
	methods: {
		onTag(index) {
			this.tagIndex = index;
		},
		async getNewsDetail() {
			let params = {
				id: this.newsID,
			};
			try {
				const res = await getNewsDetail(params);
				this.details = res.data.data;
				this.showflag = true;
			} catch (e) {
				console.log(e);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.banner-title h1 {
	font-size: 110px;
}
.section_box {
	width: 1200px;
	margin: 20px auto;
}

breadcrumb_box {
	height: 68px;
	line-height: 68px;
	background: #faf3fd;
}
.breadcrumb_box .breadcrumb {
	width: 1200px;
	margin: 0 auto;
}
.breadcrumb_box .breadcrumb p {
	font-size: 14px;
	color: #333333;
}

.content_box .section {
	width: 1200px;
	margin: 0 auto;
	margin-top: 60px;
}
.content_box .section .section_title h2 {
	text-align: center;
	font-size: 30px;
	color: #333333;
}
.content_box .section .news_about {
	font-size: 14px;
	color: #999999;
	margin-top: 40px;
}
.content_box .section .news_about div {
	margin: 0 40px;
}

.content_box .section .news_about img {
	width: 20px;
	height: 20px;
	margin-right: 5px;
}

.section_content {
	margin: 40px 0 70px 0;
}

.section .tag {
	margin-bottom: 50px;
}
.section .tag span {
	background: #eef5ff;
	border-radius: 2px;
	font-size: 14px;
	color: #2c77f4;
	padding: 8px 12px;
}

.switch_pageNum {
	width: 1200px;
	height: 58px;
	line-height: 58px;
	background: #faf3fd;
	border: 1px solid #f7e4ff;
	padding: 0 30px;
	margin-bottom: 140px;
	box-sizing: border-box;
}

.switch_pageNum div {
	font-size: 14px;
	color: #333333;
	cursor: pointer;
}
</style>
