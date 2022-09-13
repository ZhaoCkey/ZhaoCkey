// pages/mine_link/mine_link.js
const log=require('../logs.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.request({
          url: 'http://localhost:801/Meteorological_Science_WXProgram/mine/mine_selectLink.php',
          success:(res)=>{
            //   console.log(res.data);
              this.setData({
                  links:res.data
              })
          }
        })
    },
/**
 * 
 */
linkTo:function (e) {
    var url=e.currentTarget.dataset.url;
    wx.navigateTo({
      url: '../mine_linkTo/mine_linkTo?url='+url,
    })
},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        log.info('链接')
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})