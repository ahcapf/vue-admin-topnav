<template>
  <el-container class="layout-container">
    <el-header>
      <layout-header />
    </el-header>
    <el-container >
      <sidebar class="sidebar-container" />
      <app-main />
    </el-container>
  </el-container>
</template>

<script>
import LayoutHeader from './Header'
import AppMain from './AppMain'
import Sidebar from './sidebar'
export default {
  name: 'Layout',
  components: { LayoutHeader, Sidebar, AppMain }
}
</script>

<style lang="scss">
  @import '~@/assets/css/layout.scss'
</style>