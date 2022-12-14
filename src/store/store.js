import Vue from 'vue'
import Vuex from 'vuex'

// Vue를 사용할 때, 전역으로 global function을 사용하기 
// this.$store 와 같이 접근이 가능해진다. 
Vue.use(Vuex);

const storage = {
  fetch(){
    const arr = [];
      if (localStorage.length > 0){
        for (let i = 0; i < localStorage.length; i++){
          if (localStorage.key(i) !== 'loglevel:webpack-dev-server'){
            // LocalStorage 에 저장된 키로 JOSN 받아와서 파싱. 
            // JSON.parse(localStorage.getItem(localStorage.key(i))); 
            arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
          }
        }
      }
      return arr;
  },
};

export const store = new Vuex.Store({
  state: {
    todoItems : storage.fetch(),
  },
  mutations: {
    addOneItem(state, todoItem){ 
      var obj = {completed : false, item : todoItem};
      localStorage.setItem(todoItem, JSON.stringify(obj)); 
      state.todoItems.push(obj);
    },

    removeOneItem(state, payload){
      localStorage.removeItem(payload.todoItem.itme);
      state.todoItems.splice(payload.index, 1);
    },
    
    toggleOneItem(state, payload){
      state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed;
      localStorage.removeItem(payload.todoItem.item)
      localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem))
    }, 
    
    clearAll(state){
      localStorage.clear();
      state.todoItems = [];
    },
  },

});