<template>
  <div class="comment-input">
    <span>{{userInfo.name}}</span>
    <input
      class="form-control"
      placeholder="Type here"
      v-model="value"
      @keyup.enter="addComment()"
    >
  </div>
</template>



<script>
import Constant from '../constant'
export default {
  props: {
    commentIndex: {
      type: Number
    },
    postId: {
      type: Number
    },
    type: {
      type: String
    }
  },
  data () {
    return {
      value: ''
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    addComment() {
      if (this.type == 'add') {
        this.$store.commit(Constant.ADD_COMMENT, {
          postId: this.postId,
          comment: this.value,
        });
        this.value = '';
      } else {
        this.$store.commit(Constant.REPLY_COMMENT, {
          postId: this.postId,
          comment: this.value,
          commentIndex: this.commentIndex
        });
         this.value = '';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$sky-gray: #e9ebee;
.comment-input {
  margin: 10px 0;
  display: flex;
  span {
    font-weight: bold;
    margin: 0 10px;
    padding-top: 9px;
  }
  input {
    flex: auto;
    border: 1px solid $sky-gray;
    border-radius: 15px;
    background-color: $sky-gray;
    padding: 10px;
    &:focus {
      outline: none;
    }
  }
}
</style>