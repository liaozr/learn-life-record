<template>
	<div>
		<headers></headers>
		<div class="layout-content">
			<router-view />
		</div>
		<footers></footers>
	</div>
</template>
<script>
import headers from '@/components/headers.vue';
import footers from '@/components/footers.vue';
export default {
	name: 'Layout',
	components: { headers, footers },
	data() {
		return {};
	},
	mounted() {},
	methods: {},
};
</script>
<style lang="scss" scoped>
.layout-content {
	min-height: calc(100vh - 90px - 322px);
}
</style>
