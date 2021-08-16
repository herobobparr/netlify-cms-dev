<template>
	<Layout>
		<HeroHeader />
		<section class="news-content section px-6">
			<div class="news-body">
				<h2 class="is-primary-txt sourcesans-bold is-size-1">NEWS</h2>
			</div>
		</section>
		<NewsList :page="$page" showfilter="show" showfeaturedonly="hide" />
	</Layout>
</template>



<script>
import HeroHeader from '../components/HeroHeader.vue'
import NewsList from '../components/NewsList.vue'

export default {
  name: 'News',
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

<style lang="scss" scoped></style>


<page-query>

query ($page: Int!) {
  news: allNews (perPage: 10, page: $page) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
        featuredImage
        path 
        date
				isFeatured
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