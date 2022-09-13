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
    mid:[
      {
        img_mid:'/images/日常任务.png',
        title:'日常任务'
      },
      {
        img_mid:'/images/直播.png',
        title:'直播LIVE'
      },
      {
        img_mid:'/images/首场专发.png',
        title:'首发专场'
      },
      {
        img_mid:'/images/城市专场.png',
        title:'城市专场'
      },
    ],
    
  
  },
//点击事件--tapEvent--首页下方横版资讯
  tapEvent:function(e){
    // console.log(e);
    var cid=e.currentTarget.dataset.cid;
    var title=e.currentTarget.dataset.title;
    var author=e.currentTarget.dataset.author;
    var time=e.currentTarget.dataset.time;
    var photo=e.currentTarget.dataset.photo;
    var content=e.currentTarget.dataset.content;
    wx.navigateTo({
      url: '../index_newTo/index_newTo?cid='+cid,
    })
  },
//点击事件--noticeTo--轮播图
  noticeTo:function(e){
    var notice=e.target.dataset;
    // console.log(notice);
    var notices=JSON.stringify(notice);//字符串转码
    wx.navigateTo({
      url: '../index_noticeTo/index_noticeTo?notice='+notices,
      // events: events,
      // success: (result) => {},
      // fail: (res) => {},
      // complete: (res) => {},
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
      url: 'http://localhost:801/JobWanted/index/notice_select.php',
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
      url: 'http://localhost:801/JobWanted/index/new_selectAll.php',
      success:(res)=>{
        // console.log(res.data);
        this.setData({
          news:res.data
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
