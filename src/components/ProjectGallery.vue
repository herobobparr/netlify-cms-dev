<template>
  <div class="project-gallery-container">
    <div class="project-grid columns is-gapless is-multiline">
      <div
        class="column is-one-quarter"
        v-for="(galleryImage, index) in $page.project.galleryImages"
        :key="`img${index}`"
      >
        <div class="card" @click="showGallery(index)">
          <div class="card-image">
            <figure class="image is-4by4">
              <cld-image
                :publicId="galleryImage.image"
                :alt="galleryImage.caption"
              >
                <cld-transformation
                  aspectRatio="1.0"
                  gravity="center"
                  width="400"
                  crop="fill"
                  quality="75"
                />
              </cld-image>
            </figure>
          </div>
        </div>
      </div>
    </div>
    <div class="project-carousel" v-show="isGalleryVisible">
      <div class="project-carousel-container">
        <div
          class="carousel-close"
          @click="isGalleryVisible = !isGalleryVisible"
        ></div>
        <ClientOnly>
          <Carousel
            :perPage="1"
            :navigateTo="galleryPosition"
            :navigationEnabled="true"
            :paginationEnabled="false"
          >
            <Slide
              v-for="(galleryImage, index) in $page.project.galleryImages"
              :key="`gallery${index}`"
            >
              <div class="hero-image">
                <div class="carousel-image">
                  <cld-image
                    :publicId="galleryImage.image"
                    :alt="galleryImage.caption"
                  >
                    <cld-transformation
                      aspectRatio="1.0"
                      gravity="center"
                      height="1200"
                      crop="limit"
                    />
                  </cld-image>
                </div>
                <div class="carousel-caption sourcesans-bold mt-4">
                  {{ galleryImage.caption }}
                </div>
              </div>
            </Slide>
          </Carousel>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "ProjectGallery",
  data() {
    return {
      isGalleryVisible: false,
      galleryPosition: 1,
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
  methods: {
    showGallery(index) {
      this.isGalleryVisible = true;
      this.galleryPosition = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.project-gallery-container {
  .column.is-one-quarter {
    padding-bottom: 25% !important;
    position: relative;
    @media screen and (max-width: 768px) {
      padding-bottom: 100% !important;
    }
  }
  .card {
    cursor: pointer;
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 0;
    transition: opacity 0.25s;
    &:hover {
      opacity: 0.8;
    }
    .card-image {
      height: 100%;
      .image {
        height: 100%;
        img {
          object-fit: cover;
          height: 100%;
          border-radius: 0;
        }
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

    &:before {
      content: "";
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
      line-height: 2em;
    }
  }

  .project-carousel {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    z-index: 1;
    &:before {
      content: "";
      background: #000;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0.6;
    }
    .project-carousel-container {
      position: relative;
      display: flex;
      align-items: center;
      .carousel-close {
        position: absolute;
        top: -50px;
        right: 30px;
        color: #fff;
        cursor: pointer;
        width: 40px;
        height: 40px;
        &:before {
          content: "";
          position: absolute;
          height: 2px;
          width: 20px;
          background-color: #fff;
          left: 10px;
          top: 15px;
          transform: rotate(45deg);
        }
        &:after {
          content: "";
          position: absolute;
          height: 2px;
          width: 20px;
          background-color: #fff;
          left: 10px;
          top: 15px;
          transform: rotate(-45deg);
        }

        @media screen and (max-width: 780px) {
          top: -35px;
          right: 15px;
        }

        @media screen and (max-width: 500px) {
          top: -5px;
          right: 10px;
        }

		@media screen and (max-width: 380px) {
          top: 35px;
        }
      }
      .carousel-caption {
        color: #fff;
        text-align: center;
      }
      @media screen and (max-width: 420px) {
		margin-top: 115px;
      }
    }
  }
}
</style>