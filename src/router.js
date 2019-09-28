import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
//路由
export default new Router({
  mode: 'history',
  routes: [
    //重定向
    {
      path: '/',
      name: '/',
      component: () => import( /* webpackChunkName: "index" */ "./views/index.vue"),
      redirect: '/index',
    },
    //index父盒子
    {
      path: '/index',
      name: 'index',
      component: () =>
        import( /* webpackChunkName: "index" */ "./views/index.vue"),
      redirect: '/free',
      meta: {
        keepAlive: true, //需要缓存 
        auth: true,
      },
      children: [
        //1,free的
        {
          path: '/free',
          name: 'free',
          component: () =>
            import( /* webpackChunkName: "free" */ "./views/tabbar/free.vue"),
          meta: {
            keepAlive: true, // 需要缓存 
            auth: true,
          },

        },
        // 2,关注的
        {
          path: '/attention',
          name: 'attention',
          component: () =>
            import( /* webpackChunkName: "attention" */ "./views/tabbar/attention.vue"),
          meta: {
            keepAlive: true, // 需要缓存 
            auth: true,
          },
        },
        // 3,精选
        {
          path: '/featured',
          name: 'featured',
          component: () =>
            import( /* webpackChunkName: "featured" */ "./views/tabbar/featured.vue"),
          meta: {
            keepAlive: true, // 需要缓存 
            auth: true,
          },
        },
        // 4,主播
        {
          path: '/anchor',
          name: 'anchor',
          component: () =>
            import( /* webpackChunkName: "anchor" */ "./views/tabbar/anchor.vue"),
          meta: {
            keepAlive: true, // 需要缓存 
            auth: true,
          },
        },

      ]
    },
    //完善资料
    {
      path: '/userInfo',
      name: 'userInfo',
      component: () =>
        import( /* webpackChunkName: "userInfo" */ "./views/mine/aboutme/userInfo.vue"),
      meta: {
        auth: true,
      },
    },
    //搜索页面的index页面
    {
      path: '/searchindex',
      name: 'searchindex',
      component: () =>
        import( /* webpackChunkName: "searchindex" */ "./views/tabbarsearch/searchindex.vue"),
      redirect: '/freesearch',
      children: [
        //1,free的
        {
          path: '/freesearch',
          name: 'freesearch',
          component: () =>
            import( /* webpackChunkName: "freesearch" */ "./views/tabbarsearch/freesearch.vue"),
          meta: {
            keepAlive: true, // 需要缓存 
            auth: true,
          },

        },
        // 2,关注的
        {
          path: '/attentionsearch',
          name: 'attentionsearch',
          component: () =>
            import( /* webpackChunkName: "attentionsearch" */ "./views/tabbarsearch/attentionsearch.vue"),
          meta: {
            keepAlive: true, // 需要缓存 
            auth: true,
          },
        },
        // 3,精选
        {
          path: '/featuredsearch',
          name: 'featuredsearch',
          component: () =>
            import( /* webpackChunkName: "featuredsearch" */ "./views/tabbarsearch/featuredsearch.vue"),
          meta: {
            keepAlive: true, // 需要缓存 
            auth: true,
          },
        },
        //4,主播
        {
          path: '/anchorsearch',
          name: 'anchorsearch',
          component: () =>
            import( /* webpackChunkName: "anchorsearch" */ "./views/tabbarsearch/anchorsearch.vue"),
          meta: {
            keepAlive: true, // 需要缓存 
            auth: true,
          },
        },

      ]
    },
    // 4，我的页面
    {
      path: '/mine',
      name: 'mine',
      // component: mine
      component: () =>
        import( /* webpackChunkName: "mine" */ "./views/mine.vue"),
      meta: {
        auth: true,
        keepAlive: true, // 需要缓存 
      }
    },
    //直播房间liveroom
    {
      path: '/liveroom',
      name: "liveroom",
      component: () =>
        import( /* webpackChunkName: "liveroom" */ "./views/flive/liveroom.vue"),
      meta: {
        auth: true,
      }
    },
    //试看直播liveroomtry
    {
      path: '/liveroomtry',
      name: "liveroomtry",
      component: () =>
        import( /* webpackChunkName: "liveroomtry" */ "./views/flive/liveroomtry.vue"),
      meta: {
        auth: true,
      }
    },

    //会员
    {
      path: '/member',
      name: 'member',
      component: () => import( /* webpackChunkName: "member" */ "./views/mine/member.vue"),
      meta: {
        auth: false,
      }

    },
    //开通会员
    {
      path: '/joinmember',
      name: 'joinmember',
      component: () => import( /* webpackChunkName: "joinmember" */ "./views/mine/joinmember.vue"),
      meta: {
        auth: false,
      }

    },
    //我的收益
    {
      path: '/myincome',
      name: 'myincome',
      component: () => import( /* webpackChunkName: "myincome" */ "./views/mine/myincome.vue"),
      meta: {
        auth: false,
      }
    },
    //套路守则
    {
      path: '/agreement',
      name: 'agreement',
      // component: agreement
      component: () => import( /* webpackChunkName: "agreement" */ "./views/login/agreement.vue"),
      meta: {
        auth: true,
      }
    },
    //手机注册
    {
      path: '/register',
      name: 'register',
      // component: register
      component: () => import( /* webpackChunkName: "register" */ "./views/login/register.vue"),
      meta: {
        auth: true,
      }
    },
    // 邮箱注册
    {
      path: '/emailregister',
      name: "emailregister",
      // component: emailregister
      component: () => import( /* webpackChunkName: "emailregister" */ "./views/login/emailregister.vue"),
      meta: {
        auth: true,
      }
    },
    //手机登录页
    {
      path: '/login',
      name: 'login',
      // component: login
      component: () =>
        import( /* webpackChunkName: "login" */ "./views/login/login.vue"),
      meta: {
        auth: true,
      }
    },
    // 邮箱登录
    {
      path: '/emaillogin',
      name: "emaillogin",
      // component: emaillogin
      component: () => import( /* webpackChunkName: "emaillogin" */ "./views/login/emaillogin.vue"),
      meta: {
        auth: true,
      }
    },
    //手机忘记密码
    {
      path: '/forgetpassword',
      name: "forgetpassword",
      // component: forgetpassword
      component: () => import( /* webpackChunkName: "forgetpassword" */ "./views/login/forgetpassword.vue"),
      meta: {
        auth: true,
      }
    },
    // 直播界面的顶部的搜索
    {
      path: '/search',
      name: "search",
      component: () => import( /* webpackChunkName: "search" */ "./views/flive/search.vue"),
      meta: {
        auth: true,
      }
    },
    // 邮箱忘记密码
    {
      path: '/emailforgetpassword',
      name: "emailforgetpassword",
      component: () => import( /* webpackChunkName: "emailforgetpassword" */ "./views/login/emailforgetpassword.vue"),
      meta: {
        auth: true,
      }
    },
    //购买记录buyhistory
    {
      path: '/buyhistory',
      name: "buyhistory",
      redirect: '/buyhistory/buyhistoryson',
      component: () =>
        import( /* webpackChunkName: "buyhistory" */ "./views/mine/buyhistory.vue"),
      meta: {
        auth: false,
      },
      children: [
        //子路由
        {
          path: '/buyhistory/buyhistoryson',
          name: 'buyhistoryson',
          component: () =>
            import( /* webpackChunkName: "buyhistoryson" */ "./views/mine/buyhistoryson.vue"),
          meta: {
            keepAlive: true, // 需要缓存 
            auth: false,
          },
        }
      ]
    },
    //我的消息mysessage
    {
      path: '/myMessage',
      name: "myMessage",
      // component: myMessage
      component: () => import( /* webpackChunkName: "myMessage" */ "./views/mine/myMessage.vue"),
      meta: {
        auth: false,
      }
    },
    //我的金币
    {
      path: '/mygold',
      name: "mygold",
      // component: mygold
      component: () => import( /* webpackChunkName: "mygold" */ "./views/mine/mygold.vue"),
      meta: {
        auth: false,
      }
    },
    //个人主页的板块
    {
      path: '/toperson',
      name: "toperson",
      redirect: "/toperson/rouce",
      // component: toperson
      component: () => import( /* webpackChunkName: "toperson" */ "./views/mine/toperson.vue"),
      meta: {
        auth: false,
      },
      children: [
        //子路由资料
        {
          path: '/toperson/rouce',
          name: 'rouce',
          component: () =>
            import( /* webpackChunkName: "rouce" */ "./views/mine/rouce.vue"),
          meta: {
            auth: false,
          },
        },
        // 子路由回放的
        {
          path: '/toperson/backplay',
          name: 'backplay',
          component: () =>
            import( /* webpackChunkName: "backplay" */ "./views/mine/backplay.vue"),
          meta: {
            auth: false,
          },
        }
      ]

    },
    // 主播个人主页的板块
    {
      path: '/topersonzhubo',
      name: "topersonzhubo",
      redirect: "/topersonzhubo/roucezhubo",
      component: () =>
        import( /* webpackChunkName: "topersonzhubo" */ "./views/mine/topersonzhubo.vue"),
      meta: {
        auth: false,
        keepAlive: true, // 需要缓存 

      },
      children: [
        //子路由资料
        {
          path: '/topersonzhubo/roucezhubo',
          name: 'roucezhubo',
          component: () =>
            import( /* webpackChunkName: "roucezhubo" */ "./views/mine/roucezhubo.vue"),
          meta: {
            auth: false,
          },
        },
        // 子路由回放的
        {
          path: '/topersonzhubo/backplayzhubo',
          name: 'backplayzhubo',
          component: () =>
            import( /* webpackChunkName: "backplayzhubo" */ "./views/mine/backplayzhubo.vue"),
          meta: {
            auth: false,
            keepAlive: true, // 需要缓存 
          },

        }
      ]
    },
    //编辑的板块
    {
      path: '/edit',
      name: "edit",
      // component: edit
      component: () => import( /* webpackChunkName: "edit" */ "./views/mine/edit.vue"),
      meta: {
        auth: true,
      }

    },
    //设置的板块界面
    {
      path: '/set',
      name: "set",
      // component: set
      component: () => import( /* webpackChunkName: "set" */ "./views/mine/set.vue"),
      meta: {
        auth: false,
      }

    },
    // 设置页面的子版块

    //绑定手机的
    {
      path: '/bindphone',
      name: "bindphone",
      // component: bindphone
      component: () => import( /* webpackChunkName: "bindphone" */ "./views/mine/bindphone.vue"),
      meta: {
        auth: false,
      }


    },
    // 联系我们
    {
      path: '/contactus',
      name: "contactus",
      // component: bindphone
      component: () => import( /* webpackChunkName: "contactus" */ "./views/mine/set/contactus.vue"),
      meta: {
        auth: false,
      }


    },
    {
      path: '/lowproblem',
      name: "lowproblem",
      // component: bindphone
      component: () => import( /* webpackChunkName: "lowproblem" */ "./views/mine/set/lowproblem.vue"),
      meta: {
        auth: false,
      }
    },
    //系统消息的子菜单
    {
      path: '/mymesasageson',
      name: "mymesasageson",
      // component: mymesasageson
      component: () => import( /* webpackChunkName: "mymesasageson" */ "./views/mine/mymesasageson.vue"),
      meta: {
        auth: false,
      }
    },
    // 语言的切换
    {
      path: '/languagechange',
      name: 'languagechange',
      component: () => import("./views/mine/languagechange.vue"),
      meta: {
        auth: false,
      }
    },
      // 邀请好友 
    {
      path:'/inviteFriends',
      name:"inviteFriends",
      component: () => import( /* webpackChunkName: "inviteFriends" */ "./views/mine/active/inviteFriends.vue"),
      meta: {
        auth: true,
      }
    }




  ]
});