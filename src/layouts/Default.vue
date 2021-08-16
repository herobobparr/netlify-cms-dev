<template>
  <div class="layout" :class="{'menu-open' : menuOpen}">
		<SiteMenu @clicked="toggleMenu" />
		<transition name="fade" appear>
    <div class="site-content pb-6"><slot/></div>
		</transition>
		<Footer />
  </div>

</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import SiteMenu from '../components/SiteMenu.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Default',
  components: {
    SiteMenu,
		Footer,
  },
  data: function() {
    return({
			menuOpen: false,
		})
  },
	methods: {
		routeLoaded() {
			this.menuOpen = false;
			this.toggleOverflow();
		},
		toggleMenu() {
			this.menuOpen = !this.menuOpen;
			this.toggleOverflow();
		},
		toggleOverflow() {
			if(this.menuOpen) {
				document.documentElement.style.overflow = 'hidden';
			} else {
				document.documentElement.style.overflow = '';
			}
		}
	},
	mounted() {
		this.$router.onReady(() => this.routeLoaded());
	},	
}
</script>

<style></style>
