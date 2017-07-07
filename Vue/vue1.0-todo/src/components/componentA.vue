<template>
    <div class="hello">
      <h1>{{ msg }}</h1>
      <h2>{{ msgfromfather }}</h2>
      <button v-on:click="onClickMe">open mouse!</button>
        <div>this is template body</div>

    </div>
</template>
<style>
    body{
        /*background-color:#ff0000;*/
    }
</style>
<script>

    export default{

      data(){
          return{
              msg:'child tell father something',
          }
      },
      props:[
        'msgfromfather',
      ],
      components:{

      },
      events:{
        'onAddnew': function (items) {
          console.log(items)
        }
      },
      methods: {
        onClickMe: function () {
          this.$dispatch('child-tell-me-something',this.msg)
        }
      }
    }
</script>
