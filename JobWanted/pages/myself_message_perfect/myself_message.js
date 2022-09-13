// pages/myself_message_perfect/myself_message.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        gender:['男','女']
    },
     /**
     * changeEvent-------------sex
     */
    changeEvent:function(e){
        console.log(e);
        // e.detail.value --- 返回的是选中的数组元素下标
        var gender=this.data.gender;
        this.setData({
            sex1:gender[e.detail.value],
        })
    },
     /**
     * changeEvet
     * 选择器，改动value----region
     */
    changeEvent1:function(e){
        console.log(e);
        this.setData({
            region:e.detail.value,
            city:e.detail.value[1]
        })
    },
        /**
     * 表单提交---修改按钮--PHP更新操作
     * submitEvent
     */
    submitEvent:function(e){
        // console.log(e.detail.value);
        // console.log(e.detail.value.name);
        var username=e.detail.value.username;
        var uname=e.detail.value.uname;
        var sex=e.detail.value.sex;
        var education=e.detail.value.education;
        var worktime=e.detail.value.worktime;
        var city=e.detail.value.city;
        var phone=e.detail.value.phone;
        var email=e.detail.value.email;
        var description=e.detail.value.description;
        // console.log(name);
        wx.request({
          url: 'http://localhost:801/JobWanted/myself/info_update.php',//----------
          data:{
            username:username,
            uname:uname,
            sex:sex,
            education:education,
            worktime:worktime,
            city:city,
            phone:phone,
            email:email,
            description:description,
          },
          header:{'content-type':'application/x-www-form-urlencoded'},
          method:'POST',
          success:(res)=>{
              console.log(res);
            wx.showModal({
              cancelColor: 'cancelColor',
              title: '修改成功！',
              success: (res) => {
                // console.log(res.data);
              },
            })
          }
        }) 
      },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options);
        var username=options.username;

        wx.request({
            url: 'http://localhost:801/JobWanted/myself/info_select.php?username='+username,
            success:(res)=>{
                // console.log(res.data);
                // console.log(res.data[0]);
                // console.log(res.data[0].username);
                this.setData({
                    message:res.data,
                    username:res.data[0].username
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