<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: "app",
  data() {
    return {
      isSmall: this.$store.state.isSmall,
    };
  },
  mounted() {
    window.screenWidth = document.body.clientWidth
    if (window.screenWidth < 1920) {
      this.isSmall = true;
    } else {
      this.isSmall = false;
    }
    this.$store.commit('SET_IS_SMALL', this.isSmall);
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        if (window.screenWidth < 1920) {
          this.isSmall = true;
        } else {
          this.isSmall = false;
        }
        this.$store.commit('SET_IS_SMALL', this.isSmall);
      })()
    }
  },
  watch: {},
  created() {

  },
  methods: {},
  computed: {}
};
</script>
<style lang="scss">
//@import url('styles/media-double.scss');

#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

</style>
