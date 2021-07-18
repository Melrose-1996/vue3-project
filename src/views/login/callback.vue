<template>
  <login-header>联合登录</login-header>
  <section class="container" v-if="!isBind">
    <div class="unbind">
      <div class="loading"></div>
    </div>
  </section>
  <section class="container" v-else>
    <nav class="tab">
      <a @click="hasAccount = true" :class="{ active: hasAccount }" href="javascript:;">
        <i class="iconfont icon-bind" />
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a @click="hasAccount = false" :class="{ active: !hasAccount }" href="javascript:;">
        <i class="iconfont icon-edit" />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <callback-bind :unionId="unionId" />
    </div>
    <div class="tab-content" v-else>
      <callback-patch :unionId="unionId" />
    </div>
  </section>

  <login-footer />
</template>

<script>
import { ref } from 'vue'
import CallbackBind from './components/callback-bind.vue'
import CallbackPatch from './components/callback-patch.vue'
import LoginFooter from './components/login-footer.vue'
import loginHeader from './components/login-header.vue'
import QC from 'qc'
import { userQQLogin } from '@/api/user'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Message from '@/components/library/Message'
export default {
  components: { loginHeader, LoginFooter, CallbackBind, CallbackPatch },
  name: 'LoginCallback',
  setup() {
    const hasAccount = ref(true)
    const store = useStore()
    const router = useRouter()
    // 存储 openId 给组件去使用
    const unionId = ref(null)

    // 首先：默认认为已经注册且已经绑定
    const isBind = ref(true)
    if (QC.Login.check()) {
      // 第三方唯一标识 QQ 唯一标识
      QC.Login.getMe(openId => {
        unionId.value = openId
        // 请求小兔鲜后台，做 QQ 登录
        userQQLogin(openId)
          .then(data => {
            const { id, avatar, nickname, account, mobile, token } = data.result
            store.commit('user/setUser', { id, avatar, nickname, account, mobile, token })
            store.dispatch('cart/mergeCart').then(() => {
              router.push(store.state.user.redirectUrl)
              Message({ type: 'success', text: 'QQ登录成功' })
            })
          })
          .catch(e => {
            // 登录失败：没有和小兔鲜绑定
            isBind.value = false
          })
      })
    }

    return { hasAccount, isBind, unionId }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 25px 0;
  position: relative;
  height: 730px;
  .unbind {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    z-index: 99;
    .loading {
      height: 100%;
      background: #fff url(../../assets/images/load.gif) no-repeat center / 100px 100px;
    }
  }
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
