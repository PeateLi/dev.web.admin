```
import Radio from './components/Radio.vue'

<template>
<div>
    <Radio :activeRadio='activeRadio1' :RadioOptions='RadioOptions1'></Radio>
</div>
<div>
    <Radio :activeRadio='activeRadio2' :RadioOptions='RadioOptions2' :RadioSize='medium'></Radio>
</div>
<div>
    <Radio :activeRadio='activeRadio3' :RadioOptions='RadioOptions3' :RadioSize='small'></Radio>
</div>
<div>
    <Radio :RadioOptions='activeRadio4' :RadioOptions='RadioOptions4' :RadioSize='mini' :isDisabled='true'></Radio>
</div>
</template>

<script>

export default {
    data(){
        return {
            activeRadio1:'1',    //默认选中
            activeRadio2:'2',
            activeRadio3:'',
            activeRadio4:'',
            RadioOptions1:[
               {value:"1",label:"备选项 1"},
                {value:"2",label:"备选项 2"},
            ]   //单选框组数据
            RadioOptions2:[
               {value:"1",label:"备选项 1"},
                {value:"2",label:"备选项 2"},
            ]
            RadioOptions3:[
                {value:"1",label:"备选项 1"},
                {value:"2",label:"备选项 2",disabled:true},
            ]
            RadioOptions4:[
                {value:"1",label:"备选项 1"},
                {value:"2",label:"备选项 2"},
            ]
        }
    }
}

</script>
```