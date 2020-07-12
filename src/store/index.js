import Vue from 'vue'
import Vuex from 'vuex'
import Constant from '../constant'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showPage: false,
    userInfo: {
      id: 'clo',
      name: 'CLO'
    },
    postList: [],
    sample: [
      { 
        date: new Date(),
        id: 'windychicago',
        like: 0,
        img: 'https://cdn.choosechicago.com/uploads/2019/06/general-contact-1800x900.jpg',
        writer: '바람이부는 시카고',
        content: "The City of Chicago covers an  area of 60,000 hectares and sits 176 meters (578 feet) above sea level on the southwestern shore of Lake Michigan. At 190 km wide and 495 km long, its the 5th largest body of fresh water in the world. The city is traversed by the Chicago and Calumet rivers. Chicago's extensive parklands, including 3,000 hectares of city parks attract an estimated 86 million visitors annually.",
        comments: [{
          id: 'gangnambieber',
          writer: '오빤 강남 스타일',
          like: 0,
          content: 'wow, thanks for the information.',
          date: new Date()
        }]
      },
      { 
        date: new Date(),
        id: 'lasvegasbuffet',
        like: 0,
        img: 'https://specials-images.forbesimg.com/imageserve/5ece9a59938ec500060aafb6/960x0.jpg?fit=scale',
        writer: '꺼지지 않는 도시, 라스베가스',
        content: "Las Vegas officially the City of Las Vegas and often known simply as Vegas, is the 28th-most populated city in the United States, the most populated city in the state of Nevada, and the county seat of Clark County. The city anchors the Las Vegas Valley metropolitan area and is the largest city within the greater Mojave Desert.[6] Las Vegas is an internationally renowned major resort city, known primarily for its gambling, shopping, fine dining, entertainment, and nightlife. The Las Vegas Valley as a whole serves as the leading financial, commercial, and cultural center for Nevada.",
        comments: [{
          id: 'arizona',
          writer: 'Arizona 그린티',
          like: 0,
          content: 'Go 100 bucks!',
          date: new Date()
        }]
      },
    ]
  },
  mutations: {
    [Constant.ADD_COMMENT]: (state, payload) => {
      if (payload.comment !== '') {
        state.postList[payload.postId].comments.push({
          id: state.userInfo.id,
          like: 0,
          writer: state.userInfo.name,
          content: payload.comment,
          date: new Date()
        });
        localStorage.setItem('postList', JSON.stringify(state.postList));
      }
    },
    [Constant.DELETE_COMMENT]: (state, payload) => {
      let localData = JSON.parse(localStorage.getItem('postList'));
      localData[payload.postId].comments.find((item ,index, arr)=> {
        if (index == payload.index) {
          state.postList[payload.postId].comments.splice(index, 1)
          localStorage.setItem('postList', JSON.stringify(state.postList));
          arr.splice(index, 1);
          localStorage.setItem('postList', JSON.stringify(localData));
        }
      })
    },
    [Constant.LIKE_COMMENT]: (state, payload) => {
      state.postList[payload.postId].comments[payload.index].like ++;
      localStorage.setItem('postList', JSON.stringify(state.postList));
    },
    [Constant.REPLY_COMMENT]: (state, payload) => {
      state.postList[payload.postId].comments[payload.commentIndex].add = false;
      state.postList[payload.postId].comments.splice((payload.commentIndex + 1), 0, {
        id: state.userInfo.id,
        like: 0,
        isReply: true,
        writer: state.userInfo.name,
        content: payload.comment,
        date: new Date()
      })
      localStorage.setItem('postList', JSON.stringify(state.postList));
    },
    [Constant.SHOW_REPLY]: (state, payload) => {
      Vue.set(state.postList[payload.postId].comments[payload.index], 'add', true)
    },
    syncDataToLocal(state) {
      const dataBoolean = JSON.parse(localStorage.getItem('postList'))
      if (dataBoolean == null) {
        localStorage.setItem('postList', JSON.stringify(
          state.sample
        ));
      } else {
        state.postList = JSON.parse(localStorage.getItem('postList'));
      }
      state.showPage = true;
    }
  },
  getters: {
    showPage: state => {
      return state.showPage ? true : false
    }
  }
});
