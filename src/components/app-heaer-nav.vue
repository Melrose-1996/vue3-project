<template>
  <div class="app-heaer-nav-wrapper">
    <ul class="navs">
      <li class="home"><RouterLink to="/">首页</RouterLink></li>
      <li>
        <!-- 一级类名 -->
        <a href="#">美食</a>
        <!-- 二级类名 -->
        <div class="layer">
          <ul>
            <li v-for="i in 10" :key="i">
              <a href="#">
                <img
                  src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(4).png"
                  alt=""
                />
                <p>果干</p>
              </a>
            </li>
          </ul>
        </div>
      </li>
      <li><a href="#">餐厨</a></li>
      <li><a href="#">艺术</a></li>
      <li><a href="#">电器</a></li>
      <li><a href="#">居家</a></li>
      <li><a href="#">洗护</a></li>
      <li><a href="#">孕婴</a></li>
      <li><a href="#">服装</a></li>
      <li><a href="#">杂货</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AppHeaderNav',
  setup() {}
}
</script>

<style lang="less" scoped>
.app-heaer-nav-wrapper {
  .navs {
    width: 820px;
    display: flex;
    justify-content: space-around;
    padding-left: 40px;
    position: relative;
    > li {
      margin-right: 40px;
      width: 38px;
      text-align: center;
      > a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;
      }
      &:hover {
        > a {
          color: @xtxColor;
          border-bottom: 1px solid @xtxColor;
        }
        /* 显示二级类名 */
        > .layer {
          height: 132px;
          opacity: 1;
        }
      }
    }
  }
  /* 二级类名的样式 */
  .layer {
    width: 1240px;
    background-color: #fff;
    position: absolute;
    left: -200px;
    top: 56px;
    height: 0;
    overflow: hidden;
    opacity: 0;
    box-shadow: 0 0 5px #ccc;
    transition: all 0.2s 0.1s;
    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0 70px;
      align-items: center;
      height: 132px;
      li {
        width: 110px;
        text-align: center;
        img {
          width: 60px;
          height: 60px;
        }
        p {
          padding-top: 10px;
        }
        &:hover {
          p {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
</style>
