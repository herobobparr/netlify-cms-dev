<template>
<Layout>
	<section class="contact-content section px-6">
		<div class="contact-body">
			<h2 class="is-primary-txt sourcesans-bold is-size-1 mb-6">{{ $page.pageData.title }}</h2>
			<div class="markdown content-html" v-html="$page.pageData.content" />
		</div>
	</section>
</Layout>
</template>

<page-query>
query {
  pageData: sitePage(id: "contact" ) {
    title,
    content
  }
}
</page-query>

<script>
import HeroHeader from '../components/HeroHeader.vue'

export default {
  name: 'Contact',
  components: {
    HeroHeader
  },
  data: function() {
    return({})
  },
  watch: {},
	methods: {
		
	}
}
</script>

<style lang="scss" scoped>
</style>