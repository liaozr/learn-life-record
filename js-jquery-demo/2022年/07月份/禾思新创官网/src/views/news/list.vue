<template>
	<div class="cases">
		<div class="banner-title min-w">
			<img src="@/assets/news/banner.png" />
			<h1 class="wow fadeInLeft">跨境电商资讯一网打尽</h1>
		</div>
		<div class="page-content">
			<div class="tag-list w-main flex-center-center">
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
			<div class="list">
				<div class="list-content">
					<div
						v-for="(item, index) in newList"
						:key="index"
						class="item"
						@click="toDetail(item)"
					>
						<div class="content-box newsItem w-main flex-center-between">
							<img :src="item.imgUrl" alt="" />
							<div class="content">
								<h3 class="title">{{ item.contentTitle }}</h3>
								<p>{{ item.contentDescription }}</p>
								<p class="more">查看详情 →</p>
							</div>
							<div class="text flex-column-center-center">
								<h1>{{ item.times2 }}</h1>
								<span>{{ item.times }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="pagination flex-center-center">
				<el-pagination
					background
					:current-page="currentPage"
					:page-size="pagesize"
					layout="total, prev, pager, next, jumper"
					prev-text="上一页"
					next-text="下一页"
					:total="total"
					@current-change="handleCurrentChange"
				></el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import { WOW } from 'wowjs';
import { getNewsList } from '@/api/news.js';
export default {
	name: 'Home',
	data() {
		return {
			tagList: ['禾思新闻', '行业资讯'],
			tagListids: [186, 187],
			tagIndex: 0,
			currentPage: 1,
			pagesize: 5,
			total: 0,
			serviceUrl: 'https://admin.hjtc123.com',
			newList: [],
		};
	},
	mounted() {
		this.tagIndex = this.$route.query.tag * 1 || 0;
		this.$nextTick(() => {
			const wow = new WOW({
				live: false,
			});
			wow.init();
		});
		this.getList();
	},
	methods: {
		handleCurrentChange(currentPage) {
			this.currentPage = currentPage;
			this.getList();
		},
		onTag(index) {
			this.tagIndex = index;
			this.currentPage = 1;
			this.getList();
		},
		toDetail(item) {
			this.$router.push({
				name: 'newsDetail',
				params: {
					id: item.id,
				},
			});
		},
		async getList() {
			try {
				let params = {
					pageNo: this.currentPage,
					pageSize: this.pagesize,
					contentCategoryId: this.tagListids[this.tagIndex],
				};
				const res = await getNewsList(params);
				this.total = res.data.data.total;
				let data = res.data.data.rows;
				this.newList = data;
				this.newList.forEach(item => {
					if (!item.imgUrl) {
						let path = this.serviceUrl + JSON.parse(item.contentImg)[0].path;
						this.$set(item, 'imgUrl', path);
					}
					if (!item.times) {
						let times = item.createDate.slice(0, 7);
						let times2 = item.createDate.slice(8, 10);
						this.$set(item, 'times', times);
						this.$set(item, 'times2', times2);
					}
				});
			} catch (error) {}
		},
	},
};
</script>

<style lang="scss" scoped>
.banner-title h1 {
	font-size: 110px;
}
.tag-list {
	.tag {
		width: 260px;
		line-height: 60px;
		text-align: center;
		cursor: pointer;
		border: 1px solid #ccc;
		&.active {
			background: #3269ff;
			color: #fff;
		}
	}
}
.page-content {
	padding: 80px 0 50px;
	.list {
		padding: 50px 0;
		.item {
			padding: 30px 0;
			&:hover {
				background: #f6f9fc;
			}
			.content-box {
				img {
					width: 280px;
					height: 184px;
					border-radius: 10px;
					flex: 0 0 auto;
					cursor: pointer;
				}
				.content {
					padding-left: 30px;
					padding-right: 120px;
					.title {
						font-size: 24px;
						line-height: 1.6;
						padding: 10px 0;
						cursor: pointer;
					}
					p {
						line-height: 30px;
						color: #666;
					}
					.desc {
					}
					.more {
						text-align: right;
						cursor: pointer;
					}
				}
				.text {
					background: #efefef;
					width: 120px;
					height: 120px;
					flex: 0 0 auto;
					h1 {
						font-size: 44px;
						font-weight: 400;
					}
					span {
						font-size: 14px;
					}
				}
			}
		}
	}
}
::v-deep {
	.btn-prev,
	.btn-next {
		background: #f5f5f5 !important;
		padding: 0 10px !important;
	}
	.number {
		background: #f5f5f5 !important;
		&.active {
			background-color: #409eff !important;
			color: #f5f5f5 !important;
		}
	}
}
.newsItem {
	cursor: pointer;
}
</style>
