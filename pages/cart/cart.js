// pages/cart/cart.js
const app = getApp()
const apihost = app.globalData.apiUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectAll: false,
    goodsList:[],
    totalprice:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取购物车商品列表
    this.getCartList()
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
   * 获取购物车商品列表
   */
  getCartList: function()
  {
    let _this = this;
    let token=wx.getStorageSync('token')
    wx.request({
      url: apihost + '/wx/cartlist?token='+token,
      success: function(d)
      {
        // console.log(d.data.data.list)
        if(d.data.errno==0)   //请求接口成功
        {
          _this.setData({
            goodsList:d.data.data.list
          })
        }else{
          console.log("接口请求错误")
        }
      }
    })
  },
  /**
   * 全选
   */
  selectAll:function()
  {
    let list=this.data.goodsList;
    // console.log(list)
    //总价
    let total=0
    let all=!this.data.selectAll;
    list.forEach((item)=>{
      if(all){
        item.checked=true,
        total=item.goods_num * item.shop_price
        // console.log(item.shop_price)
      }else{
        item.checked=false
      }
    })
     this.setData({
       goodsList:list,
       selectAll:all, 
       totalprice:total
     })
  },
  //全部删除
  delete:function(){
    let _this=this;
    let token=wx.getStorageSync('token')
// console.log(token)
    wx.showModal({
      title:'删除提示',
      content: '确定要删除吗？',
      confirmText:'确认删除',
      cancelText:'再想想',
    })
    wx.request({
      url: apihost+'/wx/alldelete?token='+token,
    success:function(d){
      // console.log(d)
        // d.data
    }
    })
  },
  //单选
  checkbox:function(e){
    // let list=this.data.goodsList;
    // let all=!this.data.selectAll;
    // list.f
  }
})
