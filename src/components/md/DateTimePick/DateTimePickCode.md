```
import DateTimePickCode from './components/DateTimePickCode.vue'

<template>
<div>
    <DateTimePickCode @GetChangeTime='GetChangeTime'>
    </DateTimePickCode>
</div>
</template>

<script>

export default {
    data(){
        return {
            data:""
            
        }
    },
    methods:{
        GetChangeTime(val){
            this.data = val
        }
    }
}

</script>
```