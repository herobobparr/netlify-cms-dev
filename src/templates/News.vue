<template>
<Layout>
	<section class="hero">
		<div class="hero-image">
			<cld-image :publicId="$page.thisNews.featuredImage"  v-if="$page.thisNews.featuredImage !== ''">
					<cld-transformation aspectRatio="2:1" gravity="center" width="2000" crop="fill" />
			</cld-image>							

		</div>
		<div class="hero-body">
			<p class="title is-white-txt">{{ $page.thisNews.title }}</p>
		</div>
	</section>
	<div class="news-content px-6">
		<section class="section news-body">
			<p v-html="$page.thisNews.content"></p>
		</section>
	</div>
	<div class="news-content px-6">
		<section class="news-body">
			<h3 class="is-size-3 is-primary-txt mb-3 mt-6 is-uppercase">MORE NEWS</h3>
		</section>
	</div>
	<NewsList showfeaturedonly="show" />

</Layout>
</template>



<script>
import HeroHeader from '../components/HeroHeader.vue'
import NewsList from '../components/NewsList.vue'

export default {
  name: 'NewsSingle',
  components: {
    HeroHeader,
		NewsList
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
h3 {
	text-transform: uppercase;
}
</style>

<page-query>
query ($path: String!) {
  thisNews: news(path: $path) {
    title
		date
		featuredImage
    content
  }
}
</page-query>


