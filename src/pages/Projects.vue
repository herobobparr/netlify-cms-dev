
<template>
  <Layout>
    <HeroHeader />
    <ProjectList
      :page="$page"
      viewmore="hide"
      showfilter="show"
      showfeaturedonly="hide"
    />
  </Layout>
</template>

<script>
import HeroHeader from "../components/HeroHeader.vue";
import ProjectList from "../components/ProjectList.vue";

export default {
  name: "Projects",
  components: {
    HeroHeader,
		ProjectList
  },

}
</script>

<style lang="scss" scoped>
h3 {
	line-height: 1.2em;
}
</style>

<page-query>

query ($page: Int!) {

  projects: allProject (perPage: 48, page: $page) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
				clientName
        featuredImage
				isFeatured
        path 
        date
				tags {
					name
				}
      }
    }
  }
  tags: allTags(sortBy: "tagName", order: ASC) {
    edges {
      node {
        tagName
      }
    }
  }

}
</page-query>
