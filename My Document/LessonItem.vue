<template>
  <div>
    <input type="number" v-model="lessonItemStarValue" @change="handleChange">
  </div>
</template>
<script>
  class Star {
    constructor(size, color) {
      this.color = color
      this.size = size
    }
  }
  class LessonItemStar extends Star {
    constructor(size, color, type) {
      super(size, color)
      this.type = type
    }
  }
  let lessonItemStar = new LessonItemStar('14px', 'yellow', 'round')

  export default {
    data() {
      return {
        showModal: false,
        lessonItemStarValue: 0,
      }
    },
    computed: {
      starValue: {
        get() {
          return this.lessonItemStarValue || 0
        },
        set(value) {
          this.lessonItemStarValue = value
        }
      }
    },
    methods: {
      toggleModal(status) {
        this.showModal = status
      },
      handleChange(event) {
        let _value = event.target.value
        this.$store.commit('updateStarValue', _value)
      }
    }
  }
</script>
<style lang="scss">
  .lesson-item-star__light {
    display: inline-block;
    width: 16px;
    height: 16px;
    background-image: url('../../static/lesson-item-star.png');
    background-position: center;
    background-size: 100%;
  }
</style>