<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :background-color="variables['sideMenu-bg']"
        :text-color="variables['sidemenu-text']"
        :active-text-color="variables['sidemenu-activeText']"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical">
        <sidebar-item 
          v-for="route in sidebarRouters" 
          :key="route.path" 
          :item="route" 
          :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import variables from '@/assets/css/_var.scss'
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(['sidebarRouters']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return variables
    },
  }
}

</script>
<style>
</style>