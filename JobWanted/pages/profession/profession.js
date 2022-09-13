// pages/profession/profession.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 
    },
//点击事件--tapEvent
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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