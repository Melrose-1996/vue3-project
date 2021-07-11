<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin = false" href="javascript:;" v-if="isMsgLogin"> <i class="iconfont icon-user"></i> 使用账号登录 </a>
      <a @click="isMsgLogin = true" href="javascript:;" v-else> <i class="iconfont icon-msg"></i> 使用短信登录 </a>
    </div>
    <Form ref="target" :validation-schema="schema" v-slot="{ errors }" class="form" autocomplete="off">
      <template v-if="!isMsgLogin">
        <!-- 校验用户名 -->
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field :class="{ error: errors.account }" v-model="form.account" name="account" type="text" placeholder="请输入用户名" />
          </div>
          <div class="error" v-if="errors.account"><i class="iconfont icon-warning" />{{ errors.account }}</div>
        </div>
        <!-- 校验密码 -->
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field :class="{ error: errors.password }" v-model="form.password" name="password" type="password" placeholder="请输入密码" />
          </div>
          <div class="error" v-if="errors.password"><i class="iconfont icon-warning" />{{ errors.password }}</div>
        </div>
      </template>
      <template v-else>
        <!-- 校验手机号 -->
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field :class="{ error: errors.mobile }" v-model="form.mobile" name="mobile" type="text" placeholder="请输入手机号" />
          </div>
          <div class="error" v-if="errors.mobile"><i class="iconfont icon-warning" />{{ errors.mobile }}</div>
        </div>
        <!-- 短信验证码 -->
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field :class="{ error: errors.code }" v-model="form.code" name="code" type="password" placeholder="请输入验证码" />
            <span @click="send" class="code">{{ time === 0 ? '发送验证码' : `${time}秒后发送` }}</span>
          </div>
          <div class="error" v-if="errors.code"><i class="iconfont icon-warning" />{{ errors.code }}</div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <!-- Field 有个 as 属性，通过该属性可以把 Field 改成组件(注意一定要支持 v-model ) -->
          <!-- <XtxCheckbox v-model="form.isAgree" /> -->
          <Field as="XtxCheckbox" name="isAgree" v-model="form.isAgree" />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <div class="error" v-if="errors.isAgree"><i class="iconfont icon-warning" />{{ errors.isAgree }}</div>
      </div>
      <a @click="login" href="javascript:;" class="btn">登录</a>
    </Form>
    <div class="action">
      <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="" />
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, onUnmounted, reactive, ref, watch } from 'vue'
// 1. 从第三方包里面导入需要校验的组件 Form-form 容器 Field-input 表单元素
import { Field, Form } from 'vee-validate'
// 导入校验规则
import schema from '@/utils/vee-validate-schema'
import { userAccountLogin, userMobileLogin, userMobileLoginMsg } from '@/api/user'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useIntervalFn } from '@vueuse/core'
// import Message from '@/components/library/Message'
export default {
  name: 'LoginForm',
  components: { Field, Form },
  setup() {
    // 切换短信登录
    const isMsgLogin = ref(false)
    // 表单数据对象
    const form = reactive({
      isAgree: true,
      account: null,
      password: null,
      mobile: null,
      code: null
    })

    const mySchema = {
      account: schema.account,
      password: schema.password,
      mobile: schema.mobile,
      code: schema.code,
      isAgree: schema.isAgree
    }

    const target = ref(null)

    watch(isMsgLogin, () => {
      // 还原数据
      form.isAgree = true
      form.account = null
      form.password = null
      form.mobile = null
      form.code = null
      target.value.resetForm()
    })

    const { proxy } = getCurrentInstance()

    const store = useStore()
    const router = useRouter()
    // 获取路由信息
    const route = useRoute()
    const login = () => {
      target.value.validate().then(async valid => {
        if (valid) {
          // async 和 await 的错误提示 => 使用 try catch
          try {
            let data = null
            if (isMsgLogin.value) {
              const { mobile, code } = form
              // 手机号登录
              data = await userMobileLogin({ mobile, code })
            } else {
              // 账号密码登录
              const { account, password } = form
              data = await userAccountLogin({ account, password })
            }
            // 存储用户信息
            const { id, avatar, nickname, account, mobile, token } = data.result
            store.commit('user/setUser', { id, avatar, nickname, account, mobile, token })
            // 进行跳转
            router.push(route.query.redirectUrl || '/')
            // 成功的消息提示
            proxy.$message({ type: 'success', text: '登录成功' })
          } catch (e) {
            // 失败的消息提示
            if (e.response.data) {
              proxy.$message({ type: 'error', text: e.response.data.message || '登录失败' })
            }
          }
        }
      })
    }

    // 开启倒计时 useIntervalFn(回调函数，时间间隔，是否立即开启)
    // pause 暂停 resume 开启
    const time = ref(0)
    const { pause, resume } = useIntervalFn(
      () => {
        time.value--
        if (time.value <= 0) {
          pause()
        }
      },
      1000,
      { immediate: false }
    )

    // 组件销毁时清除定时器
    onUnmounted(() => {
      pause()
    })

    // 发送手机验证码
    const send = async () => {
      // 校验手机号，返回的是布尔值
      const valid = mySchema.mobile(form.mobile)
      if (valid === true) {
        // 通过且没有倒计时才可以发送请求
        if (time.value === 0) {
          await userMobileLoginMsg(form.mobile)
          // 消息提示
          proxy.$message({ type: 'success', text: '短信发送成功' })
          // 开启倒计时
          time.value = 60
          resume()
        }
      } else {
        // 失败，使用 vee 的错误函数显示错误信息(此处用 error.mobile 来控制)， vee 有对应的 API 函数进行展示 setFieldError(字段,错误信息)
        target.value.setFieldError('mobile', valid)
      }
    }
    return { isMsgLogin, form, schema: mySchema, target, login, send, time }
  }
}
</script>

<style lang="less" scoped>
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
