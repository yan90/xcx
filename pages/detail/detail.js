// pages/detail/detail.js
const app = getApp()
const apihost=app.globalData.apiUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../image/swiper1.jpg',
      '../../image/swiper1.jpg',
      '../../image/swiper1.jpg'
  ],
  indicatorDots: true,
  vertical: false,
  autoplay: true,
  interval: 3000,
  duration: 1200,
  iscollect: true
  },
  
      addcart:function(e){
        // console.log(e)
        let goods_id=e.currentTarget.id
        // console.log(goods_id);
        let access_token=wx.getStorageSync('token')
        // console.log(access_token)
      // const app=getApp()
      // const apihost=app.globalData.apiUrl;
    wx.request({
      url: apihost+'/wx/cart?goods_id='+goods_id,
      data:{
        goods_id:goods_id,
        token:access_token
      },
      success:function(res){
        wx.showToast({           
          title: '加入购物车成功！',           
          icon: 'success',           
          duration: 2000
        }) 
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let goods_id=options.id;
    // this.addcart();
    let _this=this;
    // console.log(goods_id)
    let access_token=wx.getStorageSync('token')
    // console.log(access_token)
    wx.request({
      url: apihost+'/api/goods_details?goods_id='+goods_id,
      success(res){
        _this .setData({
          goods:res.data,
          goods_id:goods_id,
        })
      },
      fail:function(){
        console.log('请求失败')
      }
    })
  },
  // 详情页轮播图切换事件
  swipperChange :function(e){
let current=e.detail.current;
this.setData({
  current:e.detail.current
})
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 拨打电话
   */
  makeCall:function(){
    wx.makePhoneCall({
      phoneNumber: '18330024560' //仅为示例，并非真实的电话号码
    })
  },
  /**收藏 */
  addFav:function(e){
    let _this = this;
    // console.log(e)
    let goods_id=e.currentTarget.dataset.goods_id
    let token=wx.getStorageSync('token')
    wx.request({
      url: apihost+'/api/add_fav?id='+goods_id+'&token='+token,
      success:function(res){
        // console.log(res)
          wx.showToast({
            title: res.data.msg,
            icon: 'success',     
            duration:2000
          })
          _this.setData({
            iscollect:false,
          })
      }
    })
  },
  /** 取消收藏*/ 
  noFav:function(e){
    let _this = this;
    let goods_id=e.currentTarget.dataset.goods_id
    let token=wx.getStorageSync('token')
    wx.request({
      url:apihost+'/api/no_fav?id='+goods_id+'&token='+token,
      success:function(res){
        wx.showToast({
          title: res.data.msg,
          icon:'success',
          duration:200,
        })
        _this.setData({
          iscollect:true,
        })
      }
    })
  }
})