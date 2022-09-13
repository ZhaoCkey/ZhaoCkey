// pages/mine/mine.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        user_head:"/images/用户.png",
        user_phone:"",
        user_sex:"",
        user_like:"",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
    //个人信息
  mymessage:function(){
    var username=wx.getStorageSync('user_name');
    // var username='奇门枫桦';
    // var username=wx.getStorage('username');
    // console.log(username);
    console.log(username);
    if(username==null){
      wx.showToast({
        title: '未登录',
        icon: 'none'
    })
    }else{
        this.setData({

        })
    }
  },
  /**
   * 点击事件——登录(PHP页面-附加判断是否需要插入)
   */
  login:function(e){
    wx.getUserProfile({
      desc: '测试用',
      success: (res) => {  
        this.setData({
             user_head:res.userInfo.avatarUrl,
             user_name:res.userInfo.nickName
        })
        // console.log(res.userInfo.nickName),
        var username=res.userInfo.nickName;
        wx.request({                            //向数据库提出插入请求
          url: 'http://localhost:801/Meteorological_Science_WXProgram/mine/mine_Login.php?name='+username,
          success:(res)=>{
            console.log(res);
            console.log(res.data[0]);
            var id=res.data[0].id;
            ///存储key——id
            wx.setStorageSync('id',id )
          }
        })
        //存储用户名
        wx.setStorageSync('user_name', res.userInfo.nickName);
      //   wx.setStorage({
      //     key: "user_name",
      //     data: res.userInfo.nickName
      // })
      }  
    })
   
},
  //退出
  unlogin: function (e) {
    this.setData({
      user_head:"../../images/用户.png",
      user_name:"",
    })
    wx.removeStorageSync('id');
    wx.removeStorageSync('user_name')
  },
  /**
   * 点击事件——跳转到——气象云图
   */
  photo:function(){
    wx.navigateTo({
      url: '../mine_weather/mine_weather',
      success: (result) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  link:function() {
      wx.navigateTo({
        url: '../mine_link/mine_link',
      })
  },
  reback:function () {
      wx.navigateTo({
        url: '../mine_advice/mine_advice',
      })
  }
})