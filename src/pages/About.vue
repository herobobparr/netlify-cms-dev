<template>
  <Layout>
		<HeroHeader />
		<section class="about-content section px-6">
			<div class="about-intro columns">
				<div class="column is-two-thirds">
					<h3 class="is-size-3 is-primary-txt">{{ $page.pageData.title }}</h3>
				</div>
				<div class="column">
					<g-image :src="$page.pageData.awardsimg" />		
				</div>
			</div>
			<div class="about-body">
				<div class="markdown content-html" v-html="$page.pageData.content" />
			</div>
			<div class="about-partners mt-5">
				<h3 class="is-size-3">OUR PARTNERS:</h3>
				<div class="partners-container">
					<g-image :src="$page.pageData.partnersimg" />
				</div>
			</div>
		</section>		
  </Layout>
</template>

<page-query>
query {
  pageData: sitePage(id: "about" ) {
    title
		awardsimg
    content
		partnersimg
  }
}
</page-query>

<script>
import HeroHeader from '../components/HeroHeader.vue'

export default {
  metaInfo: {
    title: 'About us',
  },
  components: {
    HeroHeader
  },
};
</script>

<style lang="scss" scoped>
.hero-body {
	padding: 0;
	height: 100%;
	display: flex;
	align-items: center;	
	.is-hero-size {
		@media screen and (min-width: 1024px) {
		font-size: 9rem !important;
    line-height: 0.8em !important;
		}
	}
}
h3 {
	line-height: 1.2em;
}
</style>