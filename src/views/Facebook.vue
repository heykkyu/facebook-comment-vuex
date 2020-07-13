<template>
  <div class="facebook-page">
    <div class="header">
      <span>Facebook x CLO</span>
      <span>FE Applicant Jeongkyu Kim</span>
    </div>
    <div class="content" v-if="showPage">
      <post-list />
    </div>
    <img 
      class="loading"
      src="~@/assets/loading.gif"
      v-else
    >
  </div>
</template>

<script>
import PostList from './PostList'
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'Facebook',
  components: {
    PostList
  },
  mounted () {
    setTimeout(() => {
      this.syncDataToLocal()
    }, 1000)
  },
  computed: {
    showPage () {
      return this.$store.state.showPage;
    }
  },
  methods: {
    ...mapMutations([
      'syncDataToLocal'
    ])
  }
}
</script>


<style lang="scss" scoped>
.facebook-page {
  .header {
    background-color: #4267b2;
    height: 50px;
    width: 100%;
    position: relative;
    span {
      color: #fff;
      position: absolute;
      top: 50%;
      left: 10%;
      transform: translateY(-50%);
      &:nth-last-child(1) {
        left: unset;
        right: 10%;
      }
    }
  }
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 30px;
    width: 100px;
  }
}
</style>