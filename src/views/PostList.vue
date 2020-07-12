<template>
  <div class="post-list">
    <div class="post"
      v-for="(item, index) in postList"
      :key="index"
    >
      <div class="post-top">
        <p class="writer">{{item.writer}}</p>
        <p class="date">{{item.date }}</p>
      </div>
      <div class="post-mid">
        <img :src="item.img"/>
        {{item.content}}
      </div>
      <div class="post-btm">
        <span class="disabled">좋아요</span>
        <span>댓글 {{item.comments.length > 0 ? item.comments.length : 0}} </span>
      </div>
      <comment-input
        :postId="index"
        type="add"
      />
      <comment-list 
        :comments="item.comments"
        :postId="index"
      />
    </div>
  </div>  
</template>


<script>
import Constant from '../constant'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
export default {
  components: {
    CommentInput,
    CommentList
  },
  computed: {
    postList () {
      return this.$store.state.postList;
    }
  },
  filters: {
    yyyymmmdd (date) {
      const yyyy = date.getFullYear().toString();
      const mm = (date.getMonth() + 1).toString();
      const dd = date.getDate().toString();
   
      return `${yyyy}-${mm[1] ? mm : '0'+mm[0]}-${dd[1] ? dd : '0'+dd[0]}`
    }
  }
}
</script>

<style lang="scss" scoped>
.post-list {
  width: 800px;
  max-width: 90%;
  background: #fff;
  border: 1px solid #ededed;
  border-radius: 8px;
  margin: 20px auto;
  .post {
    padding: 10px;
    text-align: left;
    p { 
      margin: 0;
      &.writer {
        font-weight: bold;
        font-size: 1.2rem;
      }
      &.date {
        color: gray;
      }
    }
    .post-mid {
      padding: 10px 0;
      img {
        width: 100%;
        border-radius: 4px;
        max-width: inherit;
      }
    }
    .post-btm {
      border-top: 1px solid #ededed;
      border-bottom: 1px solid #ededed;
      padding: 10px 0;
      display: inline-flex;
      width: 100%;
      text-align: center;
      .disabled {
        color: gray;
      }
      span {
        flex: 1 1;
        &:hover {
          cursor: pointer;
          opacity: .5;
        }
      }
    }
  }
}
</style>