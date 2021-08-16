<template>
  <Layout>
    <section
      class="project-hero hero has-carousel"
      :class="{ 'no-image': $page.project.headerMedia.length == 0 }"
    >
      <ClientOnly>
        <Carousel :perPage="1">
          <Slide
            v-for="(headerMedia, index) in $page.project.headerMedia"
            :key="`img${index}`"
          >
            <div class="hero-image">
              <cld-image
                :publicId="headerMedia.img_src"
                v-if="headerMedia.img_src !== ''"
              >
                <cld-transformation
                  aspectRatio="2:1"
                  gravity="center"
                  width="2000"
                  crop="fill"
                />
              </cld-image>

              <div class="video-container" v-if="headerMedia.youtube !== ''">
                <iframe
                  id="ytplayer"
                  type="text/html"
                  width="640"
                  height="360"
                  :src="
                    'https://www.youtube.com/embed/' +
                    headerMedia.youtube +
                    '?autoplay=1'
                  "
                  frameborder="0"
                ></iframe>
              </div>

              <div class="video-container" v-if="headerMedia.vimeo !== ''">
                <iframe
                  id="vimeo"
                  type="text/html"
                  width="640"
                  height="360"
                  :src="
                    'https://player.vimeo.com/video/' +
                    headerMedia.vimeo +
                    '?title=0&byline=0&portrait=0&badge=0'
                  "
                  frameborder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                ></iframe>
              </div>

              <!-- <div class="video-container" v-if="headerMedia.hosted_video !== ''">
								<video no-controls muted width="640" height="360">
									<source :src="headerMedia.hosted_video" type="video/mp4">
									Sorry, your browser doesn't support embedded videos.
								</video>								
							</div> -->
            </div>
            <div class="hero-body">
              <p class="sourcesans-bold is-primary-txt">
                {{ $page.project.clientName }}
              </p>
              <p class="title is-white-txt">{{ $page.project.title }}</p>
            </div>
          </Slide>
        </Carousel>
      </ClientOnly>
    </section>

    <div class="project-content px-6">
      <section class="section project-body">
        <p class="content-html" v-html="$page.project.content"></p>
      </section>
    </div>
    <ProjectGallery />
    <div class="projects-filter px-6 py-6">
      <g-link to="/projects/"
        ><button class="button is-primary">&lt; PROJECTS</button></g-link
      >
    </div>
  </Layout>
</template>


<script>
import ProjectGallery from "../components/ProjectGallery.vue";

export default {
  name: "ProjectSingle",
  data: function () {
    return {};
  },
  components: {
    ProjectGallery,
    Carousel: () =>
      import("vue-carousel/src/index")
        .then((m) => m.Carousel)
        .catch(),
    Slide: () =>
      import("vue-carousel/src/index")
        .then((m) => m.Slide)
        .catch(),
  },
  watch: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
h3 {
  line-height: 1.2em;
}
.project-hero {
  .hero-body {
    width: 50vw;
  }
}
</style>
<page-query>
query ($path: String!) {
  project(path: $path) {
    title
    content
	clientName
	featuredImage
	headerMedia {
		img_src
		vimeo
		youtube
	}
	galleryImages {
		image
		caption
	}
  }
}
</page-query>
