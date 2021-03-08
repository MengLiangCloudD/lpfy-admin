
export default [
    {
      path: '/',
      name: 'index',
      component:resolve=>(require(["@/components/main"],resolve)),
      redirect:'/home',
      meta:{
          title:"管理员管理",
          icon:"md-contacts",
          isshow:true
        },
      children:[
        {
          path: 'home',
          name: 'home',
          meta:{
            title:"管理员",
            icon:"md-contacts",
            isshow:true
          },
          component:resolve=>(require(["@/view/admin/adminUser"],resolve))
        },
      ]
    },
    {
      path: '/message',
      name: 'message',
      component:resolve=>(require(["@/components/main"],resolve)),
      meta:{
          title:"二维码管理",
          icon:"md-contacts",
          isshow:true
        },
      children:[
        {
          path: 'QRcode',
          name: 'QRcode',
          meta:{
            title:"医生二维码",
            icon:"md-contacts",
            isshow:true
          },
          component:resolve=>(require(["@/view/message/QRcode"],resolve))
        },
        {
          path: 'depQRcode',
          name: 'depQRcode',
          meta:{
            title:"科室二维码",
            icon:"md-contacts",
            isshow:true
          },
          component:resolve=>(require(["@/view/message/depQRcode"],resolve))
        },
        {
          path: 'yuanQRcode',
          name: 'yuanQRcode',
          meta:{
            title:"医院二维码",
            icon:"md-contacts",
            isshow:true
          },
          component:resolve=>(require(["@/view/message/yuanQRcode"],resolve))
        },
      ]
    },
    {
      path: '/orderAdmin',
      name: 'orderAdmin',
      component:resolve=>(require(["@/components/main"],resolve)),
      meta:{
        title:"订单管理",
        icon:"ios-reorder",
        isshow:true
      },
      children:[
        {
          path: 'orderList',
          name: 'orderList',
          meta:{
            title:"过期订单",
            icon:"ios-reorder",
            isshow:true
          },
          component:resolve=>(require(["@/view/orderAdmin/orderList"],resolve))
        },
        {
          path: 'orderListeser',
          name: 'orderListeser',
          meta:{
            title:"已申请退款订单",
            icon:"ios-reorder",
            isshow:true
          },
          component:resolve=>(require(["@/view/orderAdmin/orderListeser"],resolve))
        },
      ]
    },
    {
      path: '/Payincome',
      name: 'Payincome',
      component:resolve=>(require(["@/components/main"],resolve)),
      meta:{
        title:"职员薪资",
        icon:"ios-reorder",
        isshow:true
      },
      children:[
        {
          path: 'Paysalary',
          name: 'Paysalary',
          meta:{
            title:"职员薪资",
            icon:"ios-reorder",
            isshow:true
          },
          component:resolve=>(require(["@/view/Payincome/Paysalary"],resolve))
        },
      ]
    },
    {
      path: '/welfare',
      name: 'welfare',
      component:resolve=>(require(["@/components/main"],resolve)),
      meta:{
        title:"工会福利",
        icon:"ios-reorder",
        isshow:true
      },
      children:[
        {
          path: 'laborWelfare',
          name: 'laborWelfare',
          meta:{
            title:"工会福利",
            icon:"ios-reorder",
            isshow:true
          },
          component:resolve=>(require(["@/view/welfare/laborWelfare"],resolve))
        },{
          path: 'childWelfare',
          name: 'childWelfare',
          meta:{
            title:"工会福利",
            icon:"ios-reorder",
            isshow:false
          },
          component:resolve=>(require(["@/view/welfare/childWelfare"],resolve))
        },
      ]
    },
    {
      path: '/tong',
      name: 'tong',
      component:resolve=>(require(["@/components/main"],resolve)),
      meta:{
        title:"挂号统计",
        icon:"ios-reorder",
        isshow:true
      },
      children:[
        {
          path: 'tongji',
          name: 'tongji',
          meta:{
            title:"挂号统计",
            icon:"ios-reorder",
            isshow:true
          },
          component:resolve=>(require(["@/view/tong/tongji"],resolve))
        }
      ]
    },
    {
      path: '/video',
      name: 'video',
      component:resolve=>(require(["@/components/main"],resolve)),
      meta:{
        title:"视频课程",
        icon:"ios-reorder",
        isshow:true
      },
      children:[
        {
          path: 'videocourse',
          name: 'course',
          meta:{
            title:"视频课程",
            icon:"ios-reorder",
            isshow:true
          },
          component:resolve=>(require(["@/view/video/videocourse"],resolve))
        },
        {
          path: 'peopleNumber',
          name: 'Number',
          meta:{
            title:"查看人次",
            icon:"ios-reorder",
            isshow:false
          },
          component:resolve=>(require(["@/view/video/peopleNumber"],resolve))
        }
      ]
    }
  ]

