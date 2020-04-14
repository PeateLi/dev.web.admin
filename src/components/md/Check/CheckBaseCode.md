```
import Check from './components/Check.vue'

<template>
<div>
    <Check :CheckList='CheckList' :CheckOption='CheckOption'></Check>
</div>
</template>

<script>

export default {
    data(){
        return {
            CheckList:['复选框 E','复选框 A'],    //默认选中
            CheckOption:[
                {label:"复选框 A"},
                {label:"复选框 B"},
                {label:"复选框 C"},
                {label:"复选框 D"},
                {label:"复选框 E"}
            ]   //多选框组数据
            
        }
    }
}

</script>
```