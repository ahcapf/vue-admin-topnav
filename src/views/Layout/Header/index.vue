<template>
  <header class="layout-header">
    <div class="logo">
      <el-image :src="require('@/assets/svg/logo.svg')" />
    </div>
    <header-nav />
  </header>
</template>

<script>
import HeaderNav from './nav'
export default {
  components: { HeaderNav }
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/css/layout.scss'
</style>