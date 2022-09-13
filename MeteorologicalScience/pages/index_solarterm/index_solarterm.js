// pages/index_solarterm/index_solarterm.js
const log=require('../logs.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // id:'',
        details:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        /**
         * 节气名称接收-数据库查询->id->API查询节气详情
         */
        console.log(options.data);
        var name=options.data;//接收节气名称
        // var name='惊蛰';
        wx.request({
          url: 'http://localhost:801/Meteorological_Science_WXProgram/index/select_solartermid.php?name='+name,
          success:(res)=>{
            //   console.log(res);
              var id=res.data[0].id
              var video=res.data[0].s_video
              this.setData({
                video_url:video
              })
              wx.request({
                url: 'http://open.liupai.net/jieqi/detail?appkey=45faaa264fbdd4721be6260411761acd&jieqiid='+id,
                  success:(res)=>{
                  console.log(res);
                  this.setData({
                      details:res.data.result
                  })
                }
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
        log.info('24节气')
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
//函数
    /**
    * 节气视频获取（MYSQL）
    */
    getVideo:function() {
    //    wx.request({
    //         url: 'url',
    //       }) 
    }
        
})