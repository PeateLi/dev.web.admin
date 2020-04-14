```
import Check from './components/Check.vue'

<template>
<div>
    <Check :CheckList='CheckList1' :CheckOption='CheckOption1'></Check>
</div>
<div>
    <Check :CheckList='CheckList2' :CheckOption='CheckOption2' :checkSize='medium'></Check>
</div>
<div>
    <Check :CheckList='CheckList3' :CheckOption='CheckOption3' :checkSize='small'></Check>
</div>
<div>
    <Check :CheckList='CheckList4' :CheckOption='CheckOption4' :checkSize='mini' :isDisabled='true'></Check>
</div>
</template>

<script>

export default {
    data(){
        return {
            CheckList1:["备选项 1"],    //默认选中
            CheckList2:["备选项 2"],
            CheckList3:[],
            CheckList4:[],
            CheckOption1:[
                {label:"备选项 1"},
                {label:"备选项 2"},
            ]   //多选框组数据
            CheckOption2:[
                {label:"备选项 1"},
                {label:"备选项 2"},
            ]
            CheckOption3:[
                {label:"备选项 1"},
                {label:"备选项 2",disabled:true},
            ]
            CheckOption4:[
                {label:"备选项 1"},
                {label:"备选项 2"},
            ]
            
        }
    }
}

</script>
```