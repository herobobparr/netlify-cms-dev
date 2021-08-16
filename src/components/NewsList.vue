<template>
  <div :class="{ 'all-news': this.showfeaturedonly !== 'show' }">
    <div class="projects-cta px-6 py-6" v-if="showfilter === 'show'">
      <div class="is-pulled-right">
        <div class="dropdown" :class="{ 'is-active': isFilterOpen }">
          <div class="dropdown-trigger">
            <button
              class="button is-primary sourcesans-extrabold"
              @click="isFilterOpen = !isFilterOpen"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
            >
              <span class="sourcesans-extrabold is-uppercase"
                >{{ this.activeFilter ? this.activeFilter : "FILTER NEWS" }}
              </span>
              <span class="icon is-small">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <a @click="filterList('')" class="dropdown-item">SHOW ALL</a>
              <a
                @click="filterList(tag.node.tagName)"
                class="dropdown-item"
                v-for="(tag, index) in $static.tags.edges"
                :key="`option${index}`"
                >{{ tag.node.tagName }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="news-list">
      <section
        class="news-preview hero"
        v-for="edge in filterResults"
        :key="edge.node.id"
      >
        <div
          class="hero-image"
          :class="{ 'no-image': edge.node.featuredImage == null }"
        >
          <cld-image
            v-if="edge.node.featuredImage"
            :publicId="edge.node.featuredImage"
            :alt="edge.node.title"
          >
            <cld-transformation
              aspectRatio="1.0"
              gravity="center"
              width="400"
              crop="fill"
              quality="75"
            />
          </cld-image>
        </div>
        <div class="featured-news hero-body">
          <div class="preview-content px-6">
            <h3 class="news-title sourcesans-bold is-white-txt">
              {{ edge.node.title }}
            </h3>
            <g-link :to="edge.node.path"
              ><button class="button is-white">READ MORE</button></g-link
            >
          </div>
        </div>
      </section>
      <Pager
        :info="pageData.news.pageInfo"
        linkClass="pager__link"
        class="pager"
      />
    </div>
  </div>
</template>


<script>
import { Pager } from "gridsome";

export default {
  name: "NewsList",
  components: {
    Pager,
  },
  props: {
    page: {
      default: null,
    },
    showfilter: {
      default: "hide",
    },
    showfeaturedonly: {
      default: "hide",
    },
  },
  data: function () {
    return {
      isFilterOpen: false,
      activeFilter: "",
    };
  },
  computed: {
    pageData() {
      return this.showfeaturedonly === "show" ? this.$static : this.page;
    },
    filterResults() {
      if (this.showfeaturedonly === "show") {
        return this.$static.news.edges.filter((news) => {
          if (this.activeFilter === "") {
            return news.node.isFeatured === true;
          }
          for (let i = 0; i < news.node.tags.length; i++) {
            if (news.node.isFeatured === true) {
              return news.node.tags[i].name.includes(
                this.activeFilter.toLowerCase()
              );
            }
          }
        });
      } else {
        return this.page.news.edges.filter((news) => {
          if (this.activeFilter == "") {
            return true;
          }
          if (news.node.tags.length == 0 && this.activeFilter == "") {
            if (this.showfeaturedonly == "hide") {
              return true;
            }
          }
          for (let i = 0; i < news.node.tags.length; i++) {
            if (this.showfeaturedonly == "hide") {
              return news.node.tags[i].name.includes(
                this.activeFilter.toLowerCase()
              );
            }
          }
        });
      }
    },
  },
  methods: {
    filterList(filter) {
      this.isFilterOpen = false;
      this.activeFilter = filter;
    },
  },
};
</script>



<style lang="scss" scoped>
h3.news-title {
  font-size: 2.5em;
  line-height: 1.2em;
  margin-bottom: 0.5em;
  width: 75%;
  text-transform: uppercase;
}

.featured-news,
.preview-content {
  width: 100%;
}
.news-preview {
  max-height: 35vh;
  border-bottom: 1px solid #fff;
  .hero-body {
    position: relative;
    min-height: 300px;
  }
  .hero-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.all-news {
  .news-list {
    display: flex;
    flex-wrap: wrap;
    .news-preview {
      width: 50%;
      max-height: unset;
      display: flex;
      flex-direction: row;
      .hero-image {
        max-height: unset;
        width: 50%;
        position: relative;
      }
      .news-title {
        text-transform: uppercase;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        /* to specify the number of lines you want the text to run through... */
        -webkit-line-clamp: 3;
        /* hide the overflowing text, i.e, texts that did not fit in to the box */
        overflow: hidden;
        color: #000;
        font-size: 1.25em;
        width: 100%;
      }
      .hero-body {
        width: 50%;
        padding: 1.5em 1.5em;
        display: flex;
        align-items: flex-end;
        background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.75),
          hsla(0, 0%, 48.2%, 0.5) 75%,
          hsla(0, 0%, 48.2%, 0)
        );
        .preview-content {
          padding-left: 1em !important;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          .button.is-white {
            background-color: var(--blue);
            color: #fff;
          }
        }
      }
    }
  }
}
</style>


<static-query>
query {
  news: allNews(sortBy: "date", order: DESC) {
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
</static-query>
