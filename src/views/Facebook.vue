<template>
  <div class="facebook-page">
    <div class="header">
      <span>Facebook x CLO</span>
      <span>FE Applicant Jeongkyu Kim</span>
    </div>
    <div class="content" v-if="showPage">
      <post-list />
    </div>
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
    this.syncDataToLocal()
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
}
</style>