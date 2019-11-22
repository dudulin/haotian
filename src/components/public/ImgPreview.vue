<template>
<el-dialog :visible.sync="isShowImageDialog" @closed="clearImg">
	<el-carousel indicator-position="outside" height="600px">
		<el-carousel-item>
			<img :src="imgs" style="max-width: 100%;max-height: 100%;display: block; margin: 0 auto;" />
		</el-carousel-item>
	</el-carousel>
	<span class="name">{{name}}</span>
</el-dialog>
</template>

<script>
export default {
	name: 'ImgPreview',
	data() {
		return {
			imgs: '',
			name: '',
			isShowImageDialog: false
		}
	},
	methods: {
		clearImg() {
			this.imgs = null
		}
	}
}
</script>

<style scoped>
	.name {
		display: block;
		width: 100%;
		font-size: 20px;
		font-weight: 500;
		line-height: 35px;
		text-align: center;
	}
</style>
