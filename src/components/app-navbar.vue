<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="profile.token">
          <li>
            <a href="javascript:;"><i class="iconfont icon-user"></i>{{ profile.account }}</a>
          </li>
          <!-- <li><a href="javascript:;">退出登录</a></li> -->
          <li><router-link @click="logout" to="/login">退出登录</router-link></li>
        </template>
        <template v-else>
          <!-- <li><a href="javascript:;">请先登录</a></li> -->
          <li><router-link to="/login">请先登录</router-link></li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li>
          <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
// import { useRouter } from 'vue-router'
export default {
  name: 'AppTopnav',
  setup() {
    const store = useStore()
    // const router = useRouter()
    const profile = computed(() => {
      return store.state.user.profile
    })
    const logout = () => {
      store.commit('user/setUser', {})
      // 清空购物车
      store.commit('cart/setCart', [])
      // router.push('/login')
    }
    return { profile, logout }
  }
}
</script>
<style scoped lang="less">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
      // ~ 选择器作用： 选择当前选择器后台的所有元素
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
