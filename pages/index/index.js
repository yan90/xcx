//index.js
//获取应用实例
const app = getApp()
const apihost=app.globalData.apiUrl
Page({
  data: {
    motto: 'Hello World',
    name:'yan',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //轮播图
     imgUrls: [
            '../../image/ww.webp',
            '../../image/ee.webp',
            '../../image/ss.webp'
        ],
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1200,
        //下拉
          list:[],
          page:1,
          pagesize:10,
  },
        //详情页
  gotodetail:function(e){
    var id=e.currentTarget.id;
    wx.navigateTo({
      url: '../detail/detail?id='+id
    })
  },
  // 页面上拉触底事件的处理函数
onReachBottom:function(){
  this.data.page++;
  this.getGoodsList();
  },
  btnLogin:function(e){
    // wx.login({
    //   success (res) {
    //     if (res.code) {
    //       //发起网络请求
    //       wx.request({
    //         url: 'http://jd.2004.com/wx/xcxlogin',
    //         data: {
    //           code: res.code
    //         }
    //       })
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
   
 },
 //获取商品数据下拉
 getGoodsList:function(){
let _this=this;
wx.request({
  url: apihost+'/api/goodsList',
  data:{
    page:_this.data.page,
   size:_this.data.pagesize
  },
  header:{'content-type':'appIication/json'},
  success(res){
    let new_list=_this.data.list.concat(res.data.data.list)
    _this.setData({
      list:new_list
    })
  }
})
 },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //下拉刷新
    this.getGoodsList();

// console.log(this)
let _this=this;
//      //发起网络请求
//       wx.request({
//         url: 'http://jd.2004.com/api/test', //仅为示例，并非真实的接口地址
//         data: {
//           x: 'xxxxx',
//           y: 'yyyyy'
//         },
//         header: {
//           'content-type': 'application/json' // 默认值
//         },
//         success (res) {
//           _this.setData({
//             goods_name:res.data.goods_name,
//             price:res.data.price
//           })
//         }
//       })
   /*  wx.request({
      url: 'http://jd.2004.com/wx/circulation',
      data:{
        x:'xxx',
        y:'yyy'
      },
      header:{
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res)
                  _this.setData({
                    goods:res.data
                  })
                }
    }) */

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo7
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true, 
      name2:'zhangsan22222',
    })
    
  }
})
