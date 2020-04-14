import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: 'Guide',
  //       meta: { title: 'Guide', icon: 'guide', noCache: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/profile',
  //   component: Layout,
  //   redirect: '/profile/index',
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/profile/index'),
  //       name: 'Profile',
  //       meta: { title: 'Profile', icon: 'user', noCache: true }
  //     }
  //   ]
  // }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/TaskManage',
    component: Layout,
    redirect: '/TaskManage/DbLog',
    alwaysShow: true, // will always show the root menu
    name: 'TaskManage',
    meta: {
      title: '任务管理',
      icon: 'lock',
      // roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'DbLog',
        component: () => import('@/views/TaskManage/DbLog'),
        name: 'DbLog',
        meta: {
          title: 'DB日志',
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      // {
      //   path: 'directive',
      //   component: () => import('@/views/permission/directive'),
      //   name: 'DirectivePermission',
      //   meta: {
      //     title: 'Directive Permission',
      //     roles: ['admin', 'editor'] 
      //   }
      // },
      // {
      //   path: 'role',
      //   component: () => import('@/views/permission/role'),
      //   name: 'RolePermission',
      //   meta: {
      //     title: 'Role Permission',
      //     roles: ['admin']
      //   }
      // }
      
    ]
  },
  //权限注释
  {
    path: '/ProductManage',
    component: Layout,
    redirect: '/ProductManage/ControlManage',
    alwaysShow: true, // will always show the root menu
    name: 'ProductManage',
    meta: {
      title: '产品管理',
      icon: 'excel',
      // roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'ControlManage',
        component: () => import('@/views/ProductManage/ControlManage'),
        name: 'ControlManage',
        meta: {
          title: '库存管理',
          // roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'BrandManage',
        component: () => import('@/views/ProductManage/BrandManage'),
        name: 'BrandManage',
        meta: {
          title: '品牌管理',
          // roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'AttributeManage',
        component: () => import('@/views/ProductManage/AttributeManage'),
        name: 'AttributeManage',
        meta: {
          title: '属性管理',
          // roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'ClassifyManage',
        component: () => import('@/views/ProductManage/ClassifyManage'),
        name: 'ClassifyManage',
        meta: {
          title: '分类管理',
          // roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
    ]
  },
  {   //组件管理
    path: '/componentsManage',
    component: Layout,
    redirect: '/componentsManage/Breadcrumb',
    alwaysShow: true, // will always show the root menu
    name: 'componentsManage',
    meta: {
      title: '组件管理',
      icon: 'example',
      // roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'Breadcrumb',
        component: () => import('@/views/componentsManage/Breadcrumb'),
        name: 'Breadcrumb',
        meta: {
          title: '面包屑',
          // roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'Button',
        component: () => import('@/views/componentsManage/Button'),
        name: 'Button',
        meta: {
          title: '按钮',
          // roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'Check',
        component: () => import('@/views/componentsManage/Check'),
        name: 'Check',
        meta: {
          title: '多选',
          // roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'Collapse',
        component: () => import('@/views/componentsManage/Collapse'),
        name: 'Collapse',
        meta: {
          title: '手风琴',
          // roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'Tag',
        component: () => import('@/views/componentsManage/Tag'),
        name: 'Tag',
        meta: {
          title: '标签',
          // roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'DateTimePick',
        component: () => import('@/views/componentsManage/DateTimePick'),
        name: 'DateTimePick',
        meta: {
          title: '时间选择器',
          // roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'Dialog',
        component: () => import('@/views/componentsManage/Dialog'),
        name: 'Dialog',
        meta: {
          title: '模态框弹窗',
          // roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'Dropdown',
        component: () => import('@/views/componentsManage/Dropdown'),
        name: 'Dropdown',
        meta: {
          title: '下拉菜单',
          // roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'Echarts',
        component: () => import('@/views/componentsManage/Echarts'),
        name: 'Echarts',
        meta: {
          title: 'Echarts',
          // roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'NavMenu',
        component: () => import('@/views/componentsManage/NavMenu'),
        name: 'NavMenu',
        meta: {
          title: '动态菜单栏',
          // roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'Pagination',
        component: () => import('@/views/componentsManage/Pagination'),
        name: 'Pagination',
        meta: {
          title: '分页',
          // roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'Radio',
        component: () => import('@/views/componentsManage/Radio'),
        name: 'Radio',
        meta: {
          title: '单选',
          // roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'Select',
        component: () => import('@/views/componentsManage/Select'),
        name: 'Select',
        meta: {
          title: '下拉框菜单',
          // roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'Table',
        component: () => import('@/views/componentsManage/Table'),
        name: 'Table',
        meta: {
          title: '表格',
          // roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
    ]

  },
  {
    path: '/PageManage',
    component: Layout,
    redirect: '/PageManage/PageManage',
    alwaysShow: true, // will always show the root menu
    name: 'PageManage',
    meta: {
      title: '页面管理',
      icon: 'zip',
      // roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'PageManage',
        component: () => import('@/views/PageManage/PageManage'),
        name: 'PageManage',
        meta: {
          title: '页面详情',
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      // {
      //   path: 'directive',
      //   component: () => import('@/views/permission/directive'),
      //   name: 'DirectivePermission',
      //   meta: {
      //     title: 'Directive Permission',
      //     roles: ['admin', 'editor'] 
      //   }
      // },
      // {
      //   path: 'role',
      //   component: () => import('@/views/permission/role'),
      //   name: 'RolePermission',
      //   meta: {
      //     title: 'Role Permission',
      //     roles: ['admin']
      //   }
      // }
      
    ]
  },
  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'Icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },

  // /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: 'Example',
  //     icon: 'example'
  //   },
  //   children: [
  //     {
  //       path: 'create',
  //       component: () => import('@/views/example/create'),
  //       name: 'CreateArticle',
  //       meta: { title: 'Create Article', icon: 'edit' }
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name: 'EditArticle',
  //       meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/example/list'),
  //       name: 'ArticleList',
  //       meta: { title: 'Article List', icon: 'list' }
  //     }
  //   ]
  // },

  // {
  //   path: '/tab',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/tab/index'),
  //       name: 'Tab',
  //       meta: { title: 'Tab', icon: 'tab' }
  //     }
  //   ]
  // },

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'Error Pages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/error-page/401'),
  //       name: 'Page401',
  //       meta: { title: '401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/error-page/404'),
  //       name: 'Page404',
  //       meta: { title: '404', noCache: true }
  //     }
  //   ]
  // },

  // {
  //   path: '/error-log',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/error-log/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'Error Log', icon: 'bug' }
  //     }
  //   ]
  // },

  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'Excel',
  //   meta: {
  //     title: 'Excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     {
  //       path: 'export-excel',
  //       component: () => import('@/views/excel/export-excel'),
  //       name: 'ExportExcel',
  //       meta: { title: 'Export Excel' }
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: () => import('@/views/excel/select-excel'),
  //       name: 'SelectExcel',
  //       meta: { title: 'Export Selected' }
  //     },
  //     {
  //       path: 'export-merge-header',
  //       component: () => import('@/views/excel/merge-header'),
  //       name: 'MergeHeader',
  //       meta: { title: 'Merge Header' }
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: () => import('@/views/excel/upload-excel'),
  //       name: 'UploadExcel',
  //       meta: { title: 'Upload Excel' }
  //     }
  //   ]
  // },

  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   name: 'Zip',
  //   meta: { title: 'Zip', icon: 'zip' },
  //   children: [
  //     {
  //       path: 'download',
  //       component: () => import('@/views/zip/index'),
  //       name: 'ExportZip',
  //       meta: { title: 'Export Zip' }
  //     }
  //   ]
  // },

  // {
  //   path: '/pdf',
  //   component: Layout,
  //   redirect: '/pdf/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/pdf/index'),
  //       name: 'PDF',
  //       meta: { title: 'PDF', icon: 'pdf' }
  //     }
  //   ]
  // },
  // {
  //   path: '/pdf/download',
  //   component: () => import('@/views/pdf/download'),
  //   hidden: true
  // },

  // {
  //   path: '/theme',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'Theme',
  //       meta: { title: 'Theme', icon: 'theme' }
  //     }
  //   ]
  // },

  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'Clipboard', icon: 'clipboard' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'hash', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router


