<template>
	<div class="list-adapt-container layout-pd">
		<el-card shadow="hover" header="列表自适应演示(改变窗口查看效果)">
			<div class="flex-warp">

				<el-row :gutter="15">
					<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="9" class="mb15" v-for="item in filterList">
						<div class="flex-warp-item">
							<div class="flex-warp-item-box">
								<div class="item-img">
									<img
										src="https://news.sznews.com/pic/2021-03/09/e37326cc-4583-48f3-aa00-ecc2392d319d.jpg" />
								</div>
								<div class="item-txt">
									<div class="item-txt-title">地块编号：{{ item.number }}</div>
									<div class="item-txt-title">地块名称：{{ item.name }}</div>
									<div class="item-txt-title">种植作物：{{ item.crop }}</div>。
									<div class="item-txt-title">地块状态：{{ item.state == "0" ? "已种植" : "未种植" }}</div>
									<div class="item-txt-title">地块类型：{{ item.type == "1" ? "大棚" : "大田" }}</div>
									<div class="item-txt-title">创建时间：{{ item.createTime }}</div>
								</div>
							</div>
						</div>
					</el-col>
				</el-row>
			</div>
		</el-card>
	</div>
</template>

<script lang="ts" name="pagesListAdapt">
// 定义变量内容
import jidi from '/@/api/jidi/jidi';
const res = await jidi.getMassifApi()
export default {
	data() {
		return {
			filterList: res.data.list,
		}
	},
	created() {

	},
	methods: {

	}
}


</script>

<style scoped lang="scss">
.flex-warp {
	display: flex;
	flex-wrap: wrap;
	align-content: flex-start;
	margin: 0 -5px;

	.flex-warp-item {
		padding: 5px;
		width: 100%;
		height: 380px;

		.flex-warp-item-box {
			border: 1px solid var(--next-border-color-light);
			width: 100%;
			height: 100%;
			border-radius: 2px;
			display: flex;
			flex-direction: column;
			transition: all 0.3s ease;

			&:hover {
				cursor: pointer;
				border: 1px solid var(--el-color-primary);
				transition: all 0.3s ease;
				box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.03);

				.item-txt-title {
					color: var(--el-color-primary) !important;
					transition: all 0.3s ease;
				}

				.item-img {
					img {
						transition: all 0.3s ease;
						transform: translateZ(0) scale(1.05);
					}
				}
			}

			.item-img {
				width: 100%;
				height: 215px;
				overflow: hidden;

				img {
					transition: all 0.3s ease;
					width: 100%;
					height: 100%;
				}
			}

			.item-txt {
				flex: 1;
				padding: 15px;
				display: flex;
				flex-direction: column;
				overflow: hidden;

				.item-txt-title {
					text-overflow: ellipsis;
					overflow: hidden;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					display: -webkit-box;
					color: #666666;
					transition: all 0.3s ease;

					// &:hover {
					// 	color: var(--el-color-primary);
					// 	text-decoration: underline;
					// 	transition: all 0.3s ease;
					// }
				}

				.item-txt-other {
					flex: 1;
					align-items: flex-end;
					display: flex;

					.item-txt-msg {
						font-size: 12px;
						color: #8d8d91;
					}

					.item-txt-price {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.font-price {
							color: #ff5000;

							.font {
								font-size: 22px;
							}
						}
					}
				}
			}
		}
	}
}
</style>
