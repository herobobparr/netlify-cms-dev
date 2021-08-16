<template lang="md">
  <Layout>
		<div class="home">
			<HeroHeader />
			<div class="about-highlight px-6 py-6 sourcesans-bold">
				<h3 class="sourcesans-bold">{{ $page.pageData.intro }}</h3>
				<g-link to="/about/"><button class="button is-primary">LEARN MORE</button></g-link>
			</div>
			<ProjectList viewmore="show" showfilter="hide" showfeaturedonly="show" />
			<NewsList showfeaturedonly="show" />
		</div>

  </Layout>
</template>

<page-query>
query {
  pageData: sitePage(id: "home" ) {
    intro
  }
}
</page-query>

<script>
import HeroHeader from '../components/HeroHeader.vue'
import ProjectList from '../components/ProjectList.vue'
import NewsList from '../components/NewsList.vue'

export default {
  metaInfo: {
    title: 'Home',
  },
  name: 'Home',
  components: {
    HeroHeader,
		ProjectList,
		NewsList
  },	
};
</script>

<style lang="scss" scoped>
.keep-small {
  width: 200px;
  height: auto;
}
.home-links a {
  margin-right: 1rem;
}

.about-highlight {
	h3 {
		font-size: 2em;
		line-height: 1.2em;
		margin-bottom: 0.5em;
	}
}
</style>