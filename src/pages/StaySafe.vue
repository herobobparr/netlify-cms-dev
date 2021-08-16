<template>
	<Layout>
		<section class="news-preview hero">
			<div class="hero-image no-image">
				<!-- <img src="../assets/images/about/about_hero.png" /> -->
			</div>
			<div class="featured-news hero-body">
				<div class="preview-content">
					<h3 class="sourcesans-extrabold is-white-txt is-hero-size">STAY</h3>
					<h3 class="sourcesans-extrabold is-white-txt is-hero-size">SAFE</h3>
				</div>
			</div>
		</section>
		<section class="about-content section px-6">
			<div class="about-intro mb-6">
				<h3 class="is-size-3 is-primary-txt">{{ $page.pageData.title }}</h3>
			</div>
			<div class="about-body">
				<div class="markdown content-html" v-html="$page.pageData.content" />
			</div>
		</section>
	</Layout>
</template>

<page-query>
query {
  pageData: sitePage(id: "staysafe" ) {
    title,
    content
  }
}
</page-query>

<script>
import HeroHeader from '../components/HeroHeader.vue'

export default {
  name: 'StaySafe',
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