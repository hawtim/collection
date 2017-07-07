<!-- select.vue -->
<div style=" " @keyup.up="minusIndex" @keyup.down="plusIndex" @keyup.enter.prevent="select">
    <input class="form-control inlineInput" placeholder="{{placeholder}}" v-model="word" @input.stop="search"
           @click.stop="search">
    <ul class="myDropDown" v-show="list&&list.length>0">
        <li v-for="item in list" @click.stop="selectWord(item)"
            :class="{'active':index==$index}">{{item.name}}
        </li>
    </ul>
</div>


<script>
	/**
	 * Created by duoyi on 2016/9/8.
	 */
	// import $ from 'jquery'

	export default {

	    props: ['placeholder','list','word'],

	    data () {
	        return {
	            index:-1
	        }
	    },
	    ready (){
	       
	    },
	    methods:{
	        search (){
	            this.$emit('search')
	        },
	        selectWord (item){
	            this.word = item.name ;
	            this.list=[];
	        },
	        plusIndex(){
	            this.index=(this.index+1)>=this.list.length?0:this.index+1;
	        },
	        minusIndex(){
	            this.index=(this.index+1)>=this.list.length?0:this.index+1;
	        },
	    }
	}
</script>
