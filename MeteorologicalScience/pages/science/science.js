// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
//

    navState:'',
    videos:[1,2,3,4,5,6],
  },
//点击事件--tapEvent--首页下方横版资讯
  tapEvent:function(e){
    // console.log(e);
    var title=e.currentTarget.dataset.title;
    var comefrom=e.currentTarget.dataset.comefrom;
    // item = encodeURIComponent(JSON.stringify(item))对地址编码（有=号自动断开）
    var img=encodeURIComponent(JSON.stringify(e.currentTarget.dataset.img));
    var content=e.currentTarget.dataset.content;
    // console.log(img);
    wx.navigateTo({
      url: '../science_news/science_news?title='+title+'&content='+content+'&img='+img+'&comefrom='+comefrom ,
    })
  },
//点击事件--noticeTo--轮播图
  noticeTo:function(e){
    var content=e.target.dataset.content;
    var title=e.target.dataset.title;
    // console.log(e);
    // var notices=JSON.stringify(notice);//字符串转码
    wx.navigateTo({
      url: '../science_notice/science_notice?content='+content+'&title='+title,
    //   events: events,
      // success: (result) => {},
      // fail: (res) => {},
      // complete: (res) => {},
    })
  },
  /**
   * 点击事件——跳转页面——科普知识
   */
  navegate:function(){
    wx.navigateTo({
      url: '../science_class/science_class',
      
      success: (result) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  //切换
    //监听滑块
     bindchange(e) {
     // console.log(e.detail.current)
     let index = e.detail.current;
     this.setData({
     navState:index
     })
     },
     //点击导航
     navSwitch: function(e) {
    //  console.log(e.currentTarget.dataset.index)
     let index = e.currentTarget.dataset.index;
     this.setData({
     navState:index
     })
    
     },

  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    //轮播
    wx.request({
      url: 'http://localhost:801/Meteorological_Science_WXProgram/science/science_selectNotice.php',
      dataType:'json',
      success:(res)=>{
        // console.log(res.data),
        this.setData({
          imgUrl:res.data//轮播
        })
      }
    })
//news
    wx.request({
      url: 'http://localhost:801/Meteorological_Science_WXProgram/science/science_selectNews.php',
      success:(res)=>{
        // console.log(res.data);
        this.setData({
          news:res.data,
        //   height:(res.data.length)*200
        })
        // console.log(res.data)
        // console.log(res.data.length);
        
      }
    })
    // 获取资讯

// 获取视频
/**
 * 获取视频地址
 */
    wx.request({
      url: 'http://localhost:801/Meteorological_Science_WXProgram/science/science_selectVideo.php',
      success:(res)=>{
        //   console.log(res.data);
          this.setData({
            videos:res.data
          })
      }
    })
    
//----//
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  ///功能开放中
    dontopen: function () {
      wx.showToast({
          title: '功能开发中',
          icon: 'none'
      })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
