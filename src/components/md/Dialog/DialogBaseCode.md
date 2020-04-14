```
import Dialog from './components/Dialog.vue'
import Button from './components/Button.vue'
<template>
<Button :type='text' @click='isShowDialog = true'>点击打开 Dialog</Button>
<div>
    <Dialog 
    :DialogTitle='DialogTitle'
    :isShowDialog='isShowDialog'
    :isCenter='isCenter'
    :DialogWidth='DialogWidth'
    :isShowClosse='isShowClosse'
    :closeOnModal='closeOnModal'
    :closeOnEscape='closeOnEscape'
    @CloseDialog='CloseDialog'>
        <div sort='main'>这是一段信息</div>
        <div sort='footer'>
            <Button @click='isShowDialog = false'>取 消</Button>
            <Button type="primary" @click='isShowDialog = false'>确 定</Button>
        </div>
    </Dialog>
</div>
</template>

<script>

export default {
    data(){
        return {
            DialogTitle:'提示',
            isShowDialog:false,
            isCenter:true,
            DialogWidth:'400px',
            isShowClosse:true,
            closeOnModal:true,
            closeOnEscape:true

        }
    },
    methods:{
        CloseDialog(bool){
            this.isShowDialog = bool
        }
    }
}

</script>
```