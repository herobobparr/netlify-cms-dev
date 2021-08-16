<template>
  <section class="hero has-carousel">
    <div class="sizzle-content hero is-primary" v-if="showSizzle">
      <!-- should pull from cms -->
      <div class="sizzle-video">
        <video no-controls muted autoplay>
          <source
            :src="$static.pageData.heroVideo.sizzlevideo"
            type="video/mp4"
          />
          Sorry, your browser doesn't support embedded videos.
        </video>
      </div>
      <div class="sizzle-img-overlay">
        <img :src="$static.pageData.heroVideo.sizzleimage" alt="" />
        <a class="px-6 pt-6" @click="skipSizzle">
          <button class="button is-white">SKIP VIDEO</button>
        </a>
      </div>
    </div>
    <ClientOnly>
      <Carousel :perPage="1">
        <Slide
          v-for="(heroImage, index) in projectDetails"
          :key="`img${index}`"
        >
				<div class="hero-container">
          <div class="hero-image">
						<cld-image v-if="projectDetails[index]" :publicId="projectDetails[index].node.featuredImage" :alt="projectDetails[index].node.title">
								<cld-transformation aspectRatio="2:1" gravity="center" width="2000" crop="fill" />
						</cld-image>							
          </div>
          <div class="hero-body">
            <p class="sourcesans-bold is-primary-txt client-name">
              {{ projectDetails[index].node.clientName }}
            </p>
            <p class="title is-white-txt">
              {{ projectDetails[index].node.title }}
            </p>
            <g-link :to="projectDetails[index].node.path">
              <button class="button is-white">VIEW PROJECT</button>
            </g-link>
          </div>
				</div>
        </Slide>
      </Carousel>
    </ClientOnly>
  </section>
</template>


<script>
export default {
  name: "HeroHeader",
  data() {
    return {
      showSizzle: true,
    };
  },
  components: {
    Carousel: () =>
      import("vue-carousel/src/index")
        .then((m) => m.Carousel)
        .catch(),
    Slide: () =>
      import("vue-carousel/src/index")
        .then((m) => m.Slide)
        .catch(),
  },
  mounted() {
    const hasCookie = this.getCookie("mm_sizzle");
    if (hasCookie) {
      this.skipSizzle();
    }
  },
  methods: {
    skipSizzle() {
      this.showSizzle = false;
      //set cookie

      let d = new Date();
      d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
      document.cookie =
        "mm_sizzle=true;" + expires + ";path=/";
		},
		getCookie(name) {
			var dc = document.cookie;
			var prefix = name + "=";
			var begin = dc.indexOf("; " + prefix);
			if (begin == -1) {
					begin = dc.indexOf(prefix);
					if (begin != 0) return null;
			}
			else
			{
					begin += 2;
					var end = document.cookie.indexOf(";", begin);
					if (end == -1) {
					end = dc.length;
					}
			}
			return decodeURI(dc.substring(begin + prefix.length, end));
		}
	},
	computed: {
		projectDetails() {
			return this.$static.projects.edges.filter(slides => {
				for(let i = 0; i < this.$static.pageData.heroImages.length; i++){
					if(slides.node.title == this.$static.pageData.heroImages[i].featuredproject) {
						return true;
					}
				}
			})
		}
	},	
}
</script>

<style lang="scss" scoped>

.sizzle-content {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;	
	.sizzle-video {
		height: 100%;
		video {
			height: 100%;
			width: 100%;		
			object-fit: cover;
		}
	}
	.sizzle-img-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: linear-gradient(
      0deg,
      rgba(124, 124, 124, 0.5) 0%,
      rgba(123, 123, 123, 0.5) 100%
    );
		img {
			height: 60%;
			margin-top: 5%;
			object-fit: contain;
		}
	}
}
.hero-container {
	&:before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		background: linear-gradient(
		0deg,
		rgba(0, 0, 0, 0.5) 25%,
		rgba(123, 123, 123, 0) 100%
		);
	}
	.client-name {
		line-height: 0.9em;
	}
}

</style>


<static-query>

query {

  pageData: sitePage(id: "home" ) {
    heroImages {
      image,
			featuredproject
    },
		heroVideo {
			sizzleimage,
			sizzlevideo
		}
  }
  projects: allProject {
    edges {
      node {
				path
        title
				clientName
				featuredImage
      }
    }
  }
}

</static-query>
