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
    selectone:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取购物车商品列表
    // this.getCartList()
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
  //获取购物车商品列表自动刷新
  this.getCartList()
  //全部删除自动刷新
  // this.delete()
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
    let isSelectAll =!this.data.selectAll;
    list.forEach((item)=>{
      if(isSelectAll ){
        item.checked=true,
        total+=item.goods_num * item.shop_price
        // console.log(item.shop_price)
      }else{
        item.checked=false
      }
    })
     this.setData({
       goodsList:list,
       selectAll:isSelectAll , 
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
      success(res){
        if(res.confirm){
          wx.request({
            url: apihost+'/wx/alldelete?token='+token,
            success(res){
              //调用购物车列表刷新
        _this.getCartList()
              if(res.data.errno=0){
                wx.showToast({
                  title: '删除成功',
                  icon:'success',
                  duration:2000
                })
              }else if(res.cancel){
                wx.showToast({
                  title: '取消成功',
                  icon:'success',
                  duration:2000
                })
              }
            }
          })
        }
      }
    })
  
  },
  //单选
  checkbox:function(e){
    //拿到用户选中的goods_id
    let select_ids=e.detail.value;
    // console.log(select_ids)
    //当前页面所以数据
    let listone=this.data.goodsList
    let total=0;   //选中商品的总价
    listone.forEach(item=>{
      item.checked=false;
    select_ids.forEach(item2=>{
      if(item.goods_id==item2){
      item.checked=true;
        total +=item.goods_num*item.shop_price
      }
    })
  })
  // console.log("选中的商品总价:"+total)
  // console.log(listone)
  let liSelectAll=listone.every(function(item){    //判断是否全选
    return item.checked
  })
        this.setData({
          totalprice:total,
          liSelectAll:liSelectAll
        })
  },
  //点击商品+1
incr:function(e){
  let token=wx.getStorageSync('token') //获取token
//赋值获取这这商品的点击
let index=e.currentTarget.dataset.index;
//获取这个商品找到goods_num
let goodsinfo = this.data.goodsList
let list=goodsinfo[index]
//找到goods_num给变量 定义然后加1
let goods_num=list.goods_num
goods_num=goods_num+1
list.goods_num = goods_num
//请求后台接口
wx.request({
  url: apihost+'/wx/incr?token='+token,
  method:'post',
  header: {'content-type': 'application/x-www-form-urlencoded'},
  data:{
    goods_id:list.goods_id,
    num:goods_num
  },
  success:function(){
    wx.showToast({
      title: '添加成功',
      icon:'success',
      duration:2000
    })
  }
})
this.setData({
  goodsList:goodsinfo
})
  },
////点击商品-1
decr:function(e){
  let token=wx.getStorageSync('token') //获取token
  let index=e.currentTarget.dataset.index;
  // console.log(index)
  let goodsinfo=this.data.goodsList
  let list=goodsinfo[index]
  let goods_num=list.goods_num
  if(goods_num>1){
    goods_num=goods_num-1
    list.goods_num = goods_num
  }
  wx.request({
    url: apihost+'/wx/decr?token='+token,
    method:'post',
  header: {'content-type': 'application/x-www-form-urlencoded'},
  data:{
    goods_id:list.goods_id,
    num:goods_num
  }
  })
  this.setData({
    goodsList:goodsinfo
  })
},
//单个删除
danshanchu:function(e){
  let _this=this
  let goods_id=e.currentTarget.dataset.goods_id
  wx.showModal({
    title:'删除提示',
    content: '确定要删除吗？',
    confirmText:'确认删除',
    cancelText:'再想想',
    success(res){
       
      if(res.confirm){
      wx.request({
        url: apihost+'/wx/dandelete?goods_id='+goods_id,
        success(res){
          //调用购物车列表刷新
       _this.getCartList()
          if(res.data.errno=0){
        
            wx.showToast({
              title: '删除成功',
              icon:'success',
              duration:2000
            })
          }else if(res.cancel){
            wx.showToast({
              title: '取消成功',
              icon:'success',
              duration:2000
            })
          }
        }
      })
    }
    }
  })

  
}
})
