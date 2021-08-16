<template>
	<div>
		<div class="projects-cta px-6 py-6 " v-if="showfilter === 'show'">
			<div class="is-pulled-right">
				<div class="dropdown " :class=" { 'is-active' : isFilterOpen }" >
					<div class="dropdown-trigger">
						<button class="button is-primary sourcesans-extrabold" @click="isFilterOpen = !isFilterOpen" aria-haspopup="true" aria-controls="dropdown-menu">
							<span class="sourcesans-extrabold is-uppercase">{{ this.activeFilter ? this.activeFilter : 'FILTER WORK' }} </span>
							<span class="icon is-small">
								<i class="fas fa-angle-down" aria-hidden="true"></i>
							</span>
						</button>
					</div>
					<div class="dropdown-menu" id="dropdown-menu" role="menu">
						<div class="dropdown-content">
							<a @click="filterList('')" class="dropdown-item">SHOW ALL</a>
							<a @click="filterList(tag.node.tagName)" class="dropdown-item" v-for="(tag, index) in $static.tags.edges" :key="`option${index}`">{{tag.node.tagName}}</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="project-grid-container">
			<div class="project-grid columns is-gapless is-multiline">
				<div 
					class="column is-half-mobile is-one-quarter is-one-fifth-widescreen is-2-fullhd"
					v-for="edge in filterResults" 
					:key="edge.node.id">
					<div class="card">
							<div class="card-image">
								<figure class="image is-1by1">
									
				<cld-image :publicId="edge.node.featuredImage" :alt="edge.node.title">
	 					<cld-transformation aspectRatio="1.0" gravity="center" width="400" crop="fill" quality="75" />
				</cld-image>

								</figure>
							</div>
						<g-link :to="edge.node.path">
							<div class="card-hover">
								<div class="hover-content">
									<div class="client-name is-primary-txt sourcesans-bold is-uppercase">{{ edge.node.clientName }}</div>
									<div class="project-title sourcesans-bold is-white-link is-size-3">{{edge.node.title}}</div>
								</div>
							</div>
						</g-link>
					</div>
				</div>
        <Pager
          :info="pageData.projects.pageInfo"
          linkClass="pager__link"
          class="pager"
        />
			</div>
			<div class="projects-cta px-6 py-6" v-if="viewmore === 'show'">
				<g-link to="/projects/"><button class="button is-primary">VIEW PROJECTS</button></g-link>
			</div>
		</div>
	</div>
</template>


<script>
import { Pager } from "gridsome";

export default {
  name: 'ProjectList',
  components: {
    Pager,
  },
  props: {
    page: {
      default: null,
    },
    viewmore: {
      default: "hide",
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
        return this.$static.projects.edges.filter((project) => {
          if (project.node.tags.length == 0 && this.activeFilter == "") {
            return project.node.isFeatured === true;
          }
          for (let i = 0; i < project.node.tags.length; i++) {
            if (project.node.isFeatured == true) {
              return project.node.tags[i].name.includes(this.activeFilter);
            }
          }
        });
      } else {
        return this.$page.projects.edges.filter((project) => {
          if (project.node.tags.length == 0 && this.activeFilter == "") {
            if (this.showfeaturedonly == "hide") {
              return true;
            }
          }
          for (let i = 0; i < project.node.tags.length; i++) {
            if (this.showfeaturedonly == "hide") {
              return project.node.tags[i].name.includes(this.activeFilter);
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
.project-grid {
	display: flex;
}
.card {
	width: 100%;
	overflow: hidden;
	border-radius: 0;
	background-color: rgba(204, 204, 204, 0.365);

	&:hover {
		.card-hover {
			opacity: 1;
		}
	}

	.image {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-size: cover;
    background-repeat: no-repeat;
		img {
			border-radius: 0;
		}

	}
}
.card-hover {
	opacity: 0;
	transition: opacity 0.25s;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	.project-title  {
		text-transform: uppercase;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		/* to specify the number of lines you want the text to run through... */
		-webkit-line-clamp: 3;
		/* hide the overflowing text, i.e, texts that did not fit in to the box */
		overflow: hidden;
		line-height: 0.9em;
	}
	.client-name {
		line-height: 0.9em;
	}

	&:before {
		content: '';
    background: #000;
    opacity: 0.7;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;			
	}
	.hover-content {
		display: flex;
    justify-content: flex-end;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 1em;
		position: relative;
	}
}
</style>



<static-query>

query {

  projects: allProject(sortBy: "date", order: DESC) {
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
</static-query>