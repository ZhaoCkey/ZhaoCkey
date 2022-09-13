// pages/question/question.js
var plugin = requirePlugin("chatbot");
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
    onLoad: function (options) {
        plugin.init({
            appid: "7gdS5TCkcqc6IqnosRFs3yJJIQVc07",
            openid:'用户',
            success: () => {},
            fail: error => {},
            guideList: ["您好"],
            textToSpeech: 1,
            welcome: ["请问有什么需要帮助？"],
            welcomeImage: 'http://inews.gtimg.com/newsapp_bt/0/10701537095/1000',
            background: "rgba(247,251,252,1)",
            guideCardHeight: 40,
            operateCardHeight: 90,
            history: true,
            navHeight: 0,
            robotHeader: 'https://res.wx.qq.com/mmspraiweb_node/dist/static/miniprogrampageImages/talk/leftHeader.png',
            userHeader: 'https://res.wx.qq.com/mmspraiweb_node/dist/static/miniprogrampageImages/talk/rightHeader.png',
            userName: '',
            anonymous: false,
            // 是否隐藏服务评价按钮
            hideMovableButton: false,
            // 是否隐藏消息点赞按钮
            hideTheLikeButton: false,
            operateCardMode: 1,
            inputPlaceHolder: "请输入",
            noWaiterInfo: false,
          });

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
        log.info('问答')
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
    //
    getQueryCallback: function(e) {

    },
    openWebview: function(e) {
        let url = e.detail.weburl
        wx.navigateTo({
            url: `/pages/webviewPage/webviewPage?url=${url}`
        })
    },openMiniProgram(e) {
        let {appid, pagepath} = e.detail
        if (appid) {
            wx.navigateToMiniProgram({
                appId: appid,
                path: pagepath,
                extraData: {},
                envVersion: "",
                success(res) {
                    // 打开成功
                }
            });
        } else {
            wx.navigateTo({
                url: pagepath,
                fail() {
                    wx.switchTab({
                        url: pagepath
                    });
                }
            });
        }
    },
})