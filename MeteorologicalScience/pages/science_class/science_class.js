// pages/science_class/science_class.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name:['风','雨','雷电','雪','台风','雾'],
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.request({
          url: 'url',
          
          
          success: (result) => {},
          fail: (res) => {},
          complete: (res) => {},
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
     * 点击事件——查询类别
     */
    tapEvent_selectClass:function(e){
        var name=e.currentTarget.dataset.name;
        // console.log(name);
        wx.request({
          url: 'http://localhost:801/Meteorological_Science_WXProgram/science/science_selectType.php?name='+name,
            success:(res)=>{ 
                var type=res.data
                // console.log(type)
                this.setData({
                    type:type
                })
            }
        })
    },
    /**
     * 点击事件——查询详细信息
     */
    tapEvent_selectDetails:function(e){
        var type=e.currentTarget.dataset.type;
        console.log(type);
        wx.request({
          url: 'http://localhost:801/Meteorological_Science_WXProgram/science/science_selectDetails.php?type='+type,
            success:(res)=>{
                console.log(res);
                this.setData({
                   details:res.data 
                })
                
            }
        })
    },



})