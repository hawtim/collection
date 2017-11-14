<template>
  <div id="app">
    <h1 v-html="title"></h1>
    <input v-model="newItem" v-on:keyup.enter="addNew">
    <ul>
      <li v-for="item in items" v-bind:class="{finished: item.isFinished}" v-on:click="toggleFinish(item)">{{item.label}}</li>
    </ul>
    <hello msg="hello props"></hello>
    <p>child tells me: {{ childWords }}</p>
    <component-a msgfromfather="you die!" v-on:child-tell-me-something="listenToMyBoy"></component-a>
  </div>

</template>

<script>
  import Store from './storage'
  import Hello from './components/Hello'
  import ComponentA from './components/componentA'
  console.log(Store)
  export default {
    data: function () {
      return {
        title: 'this is father and this is a todo list',
        items: Store.fetch(),
        class1: 'c1',
        class2: 'c2',
        newItem: '',
        childWords: ''
      }
    },
    components: {
      Hello,
      ComponentA,
    },
    events: {
      "child-tell-me-something": function (msg) {
        this.childWords = msg;
      }
    },
    methods: {
      toggleFinish: function (item) {
        item.isFinished = !item.isFinished
      },
      addNew: function () {
        this.items.push({
          label: this.newItem,
          isFinished: false
        })
        //      console.log(this.newItem)
        this.newItem = ""
        Store.save()
        this.$broadcast('onAddnew', this.items)
      },
      listenToMyBoy: function (msg) {
        this.childWords = msg;
      }

    },
    watch: {
      items: {
        handler: function (items) {
          console.log('father add ' + items)
          Store.save(items)
        },
        deep: true
      }
    }
  }

</script>

<style>
  .finished {
    text-decoration: underline;
  }

  html {
    height: 100%;
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  #app {
    color: #2c3e50;
    margin-top: -100px;
    max-width: 600px;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    text-align: center;
  }

  #app a {
    color: #42b983;
    text-decoration: none;
  }

  .logo {
    width: 100px;
    height: 100px
  }

</style>
