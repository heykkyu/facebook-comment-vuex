
<template>
  <div class="comment-list">
    <template v-for="(com,index) in comments">
      <div
        :key="index"
        class="comment-wrapper"
        :class="{active: com.isReply}"
      >
        <div class="comment">
          <span>{{com.writer}}</span>
          <span>{{com.content}}</span>
          <span v-if="com.like > 0" class="like">👍 {{com.like}}</span>
        </div>
        <div class="comment-plus">
          <template v-if="com.id != myUserId">
            <span @click="likeComment(index)">좋아요</span>
            <span @click="replyComment(index)">댓글달기</span>
            
          </template>
          <template v-else>
            <span @click="deleteComment(index)">삭제</span>
          </template>
        </div>
        <comment-input
            v-if="com.add"
            :postId="postId"
            :commentIndex="index"
            type="reply"
          />
      </div>
    </template>
  </div>
</template>

<script>
import CommentInput from './CommentInput'
import Constant from '../constant'
export default {
  components: {
    CommentInput,
  },
  computed: {
    myUserId() {
      return this.$store.state.userInfo.id;
    }
  },
  props: {
    comments: {
      type: Array,
    },
    postId: {
      type: Number
    },
    type: {
      type: Boolean
    }
  },
  methods: {
    likeComment (i)  {
      this.$store.commit(Constant.LIKE_COMMENT, { postId: this.postId, index: i })
    },
    replyComment (i) {
      this.$store.commit(Constant.SHOW_REPLY, { postId: this.postId, index: i })
    },
    deleteComment (i)  {
      this.$store.commit(Constant.DELETE_COMMENT, { postId: this.postId, index: i })
    }
  }
}
</script>

<style lang="scss" scoped>
$sky-gray: #e9ebee;
.comment-list {
  margin: 10px 0;
  .comment-wrapper {
    &.active { margin-left: 50px;}
    .comment {
      display: flex;
      flex: auto;
      border: 1px solid $sky-gray;
      border-radius: 15px;
      background-color: $sky-gray;
      padding: 5px 10px;
      position: relative;
      span:nth-child(1) {
        font-weight: bold;
        color: dodgerblue;
        margin-right: 10px;
      }
      .like { 
        position: absolute;
        right: 5px;
        top: 0;
      }
    }
    .comment-plus {
      flex: none;
      padding: 5px;
      span { 
        color: darkslategray;
        font-size: .8rem;
        margin-right: 5px;
        &:hover {
          cursor: pointer;
          opacity: .5;
        }
      }
    }
  } 
}
</style>