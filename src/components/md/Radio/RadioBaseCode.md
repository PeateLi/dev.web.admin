```
import Radio from './components/Radio.vue'

<template>
<div>
    <Radio :activeRadio='activeRadio' :RadioOptions='RadioOptions'></Radio>
</div>
</template>

<script>

export default {
    data(){
        return {
            activeRadio:'1',    //默认选中
            RadioOptions:[
                {value:"1",label:"备选项 1"},
                {value:"2",label:"备选项 2"},
            ]   //单选框组数据
            
        }
    }
}

</script>
```