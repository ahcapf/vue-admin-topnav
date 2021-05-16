import Layout from '@/views/Layout'
import ParentView from '@/components/common/parentView'
const editRoutes = [
  {
    path: '/edit',
    component: Layout,
    meta: { title: '编辑上传', access: 'edit'},
    children: [
      {
        path: 'homepage',
        component: ParentView,
        meta: { title: '首页', access: 'edit.homepage'},
        children: [
          {
            path: 'banner',
            component: () => import('@/views/Edit/homePage/banner'),
            meta: { title: '横幅banner', access: 'edit.homepage.banner' }
          },
          {
            path: 'enterpriseLibrary',
            component: () => import('@/views/Edit/homePage/enterpriseLibrary'),
            meta: { title: '企业库', access: 'edit.homepage.enterpriseLibrary'}
          }
        ]
      },
      {
        path: 'activity',
        component: () => import('@/views/Edit/activityPage'),
        meta: { title: '活动页', access: 'edit.activity'}
      }
    ]
  }
]


export default editRoutes