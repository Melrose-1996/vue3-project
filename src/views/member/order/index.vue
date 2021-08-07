<template>
  <div class="member-order">
    <xtx-tabs v-model="activeName">
      <xtx-tabs-panel v-for="item in orderStatus" :key="item.name" :label="item.label" :name="item.name">{{ item.label }}</xtx-tabs-panel>
    </xtx-tabs>
  </div>
</template>

<script>
import { orderStatus } from '@/api/constants'
import xtxTabs from '@/components/library/xtx-tabs.vue'
import XtxTabsPanel from '@/components/library/xtx-tabs-panel.vue'
import { ref } from 'vue'
export default {
  components: { xtxTabs, XtxTabsPanel },
  name: 'MemberOrder',
  setup() {
    const activeName = ref('all')

    return { activeName, orderStatus }
  }
}
</script>

<style lang="less" scoped>
.member-order {
}
</style>
