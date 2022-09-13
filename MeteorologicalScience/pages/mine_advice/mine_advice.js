// pages/mine_advice/mine_advice.js
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
        log.info('反馈')
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

    },
    /**
     * 反馈提交
     */
    submit:function(e){
        // console.log(e.detail.value);
        var content=e.detail.value.content;
        var title=e.detail.value.title;
        wx.request({
          url: 'url',
          success:(res)=>{
              wx.showToast({
                title: '反馈成功',
                duration: 0,
                icon: icon,
                image: 'image',
                mask: true,
                success: (res) => {},
                fail: (res) => {},
                complete: (res) => {},
              })
          }
        })
    }
})