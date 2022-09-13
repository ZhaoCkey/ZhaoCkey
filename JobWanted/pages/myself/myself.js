// pages/mine/mine.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        user_head:"/images/userhead.png",
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
    ///登录
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
              url: 'http://localhost:801/JobWanted/index/myinfo_insert_login.php?username='+username,
              success:(res)=>{
                console.log(res);
              }
            })
            ///存储key
            wx.setStorageSync('user_name', res.userInfo.nickName);
            
          //   wx.setStorage({
          //     key: "user_name",
          //     data: res.userInfo.nickName
          // })
          }  
        })
       
    },
///退出
    unlogin: function (e) {
      this.setData({
        user_head:"",
        user_name:""
      })
    },
    ///功能开放中
    dontopen: function () {
      wx.showToast({
          title: '功能开发中',
          icon: 'none'
      })
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
    wx.navigateTo({
      url: '../myself_message/myself_message?username=' + username
    })}
  },
  ///我的收藏
  mycollect:function(){
    var user_name=this.data.user_name;
    wx.navigateTo({
      url: '../mycollect/mycollect?user_name=' + user_name
    })
  },
  //我的关注
  mylike:function(){
    var user_name=this.data.user_name;
    wx.navigateTo({
      url: '../mylike/mylike?user_name=' + user_name
    })
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

    }
})