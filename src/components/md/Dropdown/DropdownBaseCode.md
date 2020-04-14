```
import Dropdown from './components/Dropdown.vue'

<template>
<div>
    <Dropdown :dropMenu='dropMenu'>
            <span class="el-dropdown-link">
                下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
    </Dropdown>
</div>
</template>

<script>

export default {
    data(){
        return {
            dropMenu:[
                {name:'黄金糕'},
                {name:'狮子头'},
                {name:'螺蛳粉'},
                {name:'双皮奶'},
                {name:'蚵仔煎'},
            ]
        }
    }
}

</script>
```