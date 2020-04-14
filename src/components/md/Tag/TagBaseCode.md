```
import Tag from './components/Tag.vue'

<template>
<div>
    <Tag :tags='tags' :isClosableTag='true' @handleClose='handleClose'></Tag>
</div>
</template>

<script>

export default {
    data(){
        return {
            tags:[
                {type:"",size:''},
                {type:"success",size:'medium'},
                {type:"info",size:'small'},
                {type:"warning",size:'mini'},
                {type:"danger",size:'mini'}
            ],   //标签组数据
        }
    },
    methods:{
        handleClose(data){
            console.log(data)
        }
    }
}

</script>
```