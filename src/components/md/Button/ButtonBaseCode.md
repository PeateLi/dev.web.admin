```
import Button from './components/Button.vue'

<div>
<Button :text='默认按钮'></Button>
<Button :text='主要按钮' ：type='primary'></Button>
<Button :text='成功按钮' ：type='success'></Button>
<Button :text='信息按钮' ：type='info'></Button>
<Button :text='警告按钮' ：type='warning'></Button>
<Button :text='危险按钮' ：type='danger'></Button>
</div>

<div>
<Button :text='朴素按钮' :isPlain='true'></Button>
<Button :text='主要按钮' ：type='primary' :isPlain='true'></Button>
<Button :text='成功按钮' ：type='success' :isPlain='true'></Button>
<Button :text='信息按钮' ：type='info' :isPlain='true'></Button>
<Button :text='警告按钮' ：type='warning' :isPlain='true'></Button>
<Button :text='危险按钮' ：type='danger' :isPlain='true'></Button>
</div>

<div>
<Button :text='圆角按钮' :isPlain='true'></Button>
<Button :text='主要按钮' ：type='primary' :isRound='true'></Button>
<Button :text='成功按钮' ：type='success' :isRound='true'></Button>
<Button :text='信息按钮' ：type='info' :isRound='true'></Button>
<Button :text='警告按钮' ：type='warning' :isRound='true'></Button>
<Button :text='危险按钮' ：type='danger' :isRound='true'></Button>
</div>

<div>
<Button :isCircle='true' :isIcon='el-icon-search'></Button>
<Button ：type='primary' :isCircle='true' :isIcon='el-icon-search'></Button>
<Button ：type='success' :isCircle='true' :isIcon='el-icon-search'></Button>
<Button ：type='info' :isCircle='true' :isIcon='el-icon-search'></Button>
<Button ：type='warning' :isCircle='true' :isIcon='el-icon-search'></Button>
<Button :text='图标在右边' ：type='danger' :isCircle='true'><i class=':isIcon='el-icon-search''></i></Button>
</div>
```