<template>
  <div class="header-nav">
    <el-menu 
      :default-active="activeMenu" 
      class="el-menu-demo" 
      mode="horizontal"
      :background-color="variables['rootMenu-bg']"
      :text-color="variables['rootmenu-text']"
      :active-text-color="variables['rootmenu-activeText']"
      @select="handleSelect">
      <el-menu-item 
        v-for="menu in topbarRouters" 
        :key="menu.path" 
        :index="menu.path">
        {{ menu.meta.title }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import path from 'path'
import { mapGetters } from 'vuex'
import variables from '@/assets/css/_var.scss'
export default {
  data() {
    return {
      // 是否为首次加载
      isFrist: false,
    }
  },
  computed: {
    ...mapGetters(['topbarRouters']),
    variables() {
      return variables
    },
    // 设置子路由
    childrenMenus() {
      let childrenMenus = []
      this.topbarRouters.forEach(route => {
        if (!route.children) return
        route.children.forEach(childRoute => {
          if (childRoute.parentPath === undefined ) {
            childRoute.path = path.resolve(route.path, childRoute.path )
            childRoute.parentPath = route.path;
          }
          childrenMenus.push(childRoute)
        })
      })
      return childrenMenus
    },
    // 默认激活的菜单
    activeMenu() {
      const { path } = this.$route
      let activePath = this.topbarRouters[0].path
      if (path.lastIndexOf("/") > 0) {   // 当前路由为二级路由
        const tmpPath = path.substring(1, path.length);
        activePath = "/" + tmpPath.substring(0, tmpPath.indexOf("/"));
      } else if ("/index" == path || "" == path) {
        if (!this.isFrist) {
          this.isFrist = true;
        } else {
          activePath = "index";
        }
      }

      let routes = this.activeRoutes(activePath);
      if (routes.length === 0) {
        activePath = this.currentIndex || this.routers[0].path
        this.activeRoutes(activePath);
      }
      return activePath;
    }
  },
  methods: {
    handleSelect() {},

    // 当前激活的路由
    activeRoutes(key) {
      var routes = [];
      if (this.childrenMenus && this.childrenMenus.length > 0) {
        this.childrenMenus.map((item) => {
          if (key == item.parentPath || (key == "index" && "" == item.path)) {
            routes.push(item);
          }
        });
      }
      if(routes.length > 0) {
        this.$store.commit("permission/SET_SIDEBAR_ROUTERS", routes);
      }
      return routes;
    },
  }
}
</script>

<style>

</style>