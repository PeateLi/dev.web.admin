```
import Button from './components/Button.vue'

<div>
<Button :text='默认按钮' :isDisabled='true'></Button>
<Button :text='主要按钮' ：type='primary' :isDisabled='true'></Button>
<Button :text='成功按钮' ：type='success' :isDisabled='true'></Button>
<Button :text='信息按钮' ：type='info' :isDisabled='true'></Button>
<Button :text='警告按钮' ：type='warning' :isDisabled='true'></Button>
<Button :text='危险按钮' ：type='danger' :isDisabled='true'></Button>
</div>

<div>
<Button :text='朴素按钮' :isPlain='true' :isDisabled='true'></Button>
<Button :text='主要按钮' ：type='primary' :isPlain='true' :isDisabled='true'></Button>
<Button :text='成功按钮' ：type='success' :isPlain='true' :isDisabled='true'></Button>
<Button :text='信息按钮' ：type='info' :isPlain='true' :isDisabled='true'></Button>
<Button :text='警告按钮' ：type='warning' :isPlain='true' :isDisabled='true'></Button>
<Button :text='危险按钮' ：type='danger' :isPlain='true' :isDisabled='true'></Button>
</div>

</div>
```