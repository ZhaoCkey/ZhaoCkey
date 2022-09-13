// pages/myself_message/myself_message.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    /**
     * edit--编辑个人信息
     */
    edit:function(e){
        var username=e.currentTarget.dataset.username
        wx.navigateTo({
          url: '../myself_message_perfect/myself_message?username='+username,
        })
    },
    /**
     * 编辑ability
     */
    edit_ability:function(e){
      var jname=e.detail.value.jname;
      var percent=e.detail.value.percent;
      wx.navigateTo({
        url: '../profession_edit/profession_edit?jname='+jname+'&&percent='+percent,
        
      })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options.username);
        var username=options.username;
        var userheard=wx.getStorageSync('')
        wx.request({
          url: 'http://localhost:801/JobWanted/myself/info_select.php?username='+username,
          success:(res)=>{
            //   console.log(res.data[0]);
              this.setData({
                  message:res.data,
              })
          }
        })
        wx.request({
          url: 'http://localhost:801/JobWanted/myself/info_select_ability.php',
          success:(res)=>{
            console.log(res.data);
            this.setData({
              ability:res.data
            })
            
          }
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

    }
})