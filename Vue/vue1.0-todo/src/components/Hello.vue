<template>
  <h1 v-html="title"></h1>
  <ul>
    <li v-for="item in items" :class="[class1,class2]">这是hello的，不是todolist <a href="javascript:;">{{item.label}}</a> </li>
  </ul>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ msg2 }}</h2>
    <p v-text="a"></p>
    <p v-if="isShow">11111</p>
    <p v-show="isShow">xxx</p>
    <ul>
      <li v-for="item in items">
        <p v-text="item.label"></p>
      </li>
    </ul>
    <button @click="doSomeThing">加1</button>
    <img :src="imgSrc">
  </div>
  <p>hello-end</p>
</template>

<script>
export default {
  props:['msg'],
  data () {
    return {
      msg2:"hello gell",
      title:'hello component title',
      a:1,
      b:[],
      isShow:true,
      items:[
        {
          label: 'apple'
        },
        {
          label: 'banana'
        }
      ]
    }
  },
//  props 获取到的属性优先级高于data的

  methods:{
    doSomeThing:function () {
      this.a ++
    }
  },
  watch:{
    'a':function (val, oldVal) {
      console.log(val, oldVal)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
