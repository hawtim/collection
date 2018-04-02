<template>
    <el-dialog class="image-viewer" :visible.sync="dialogVisible" :show-close="false">
        <img :src="imgUrl" alt="车牌照片">
    </el-dialog>
</template>
<script>
    export default {
        props: {
            dialogVisible: {
                type: Boolean,
                required: true,
                default: false
            },
            imgUrl: {
                type: String,
                required: true,
                default: ''
            }
        }
    }
</script>
<style>
    .image-viewer {
        background-color: #fff;
    }
</style>

