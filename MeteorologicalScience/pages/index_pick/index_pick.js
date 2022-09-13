// pages/index_pick/index_pick.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        location_city:"--",
        location_area:'--',
        // citys:[,]
        citys:[
        ],
        location:'我的位置'
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    
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
        //加载位置信息——异步存储中获取 
        var that=this;
        var location_city='';
        var location_area=''; 
        wx.getStorage({
            key:'loacation_city',
            success(res){
                that.setData({
                    location_city:res.data
                 })
            }
        })
        wx.getStorage({
            key:'location_area',
            success(res){
                // console.log(res)
                that.setData({
                   location_area:res.data
                })
            }
        })
        that.setData({
            location_city:location_city,
            location_area:location_area
        })
    //加载已选城市
    var id=wx.getStorageSync('id');
    // console.log(id);
    wx.request({
        url: 'http://localhost:801/Meteorological_Science_WXProgram/index/index_selectCityOrder.php?id='+id,
        success:(res)=>{
            // console.log(res.data)
            this.setData({
              citys:res.data
            })
        }
      });
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
/**
 * 点击事件——定位-------------------（添加点击后先清除数据再定义）
 * tapEvent_location
 */
tapEvent_location:function(){
    var that=this;
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
          var longitude=res.longitude.toFixed(2) //南纬
          var latitude=res.latitude.toFixed(2) //西经
        //   console.log(longitude,latitude)
          wx.request({
            url: 'https://geoapi.qweather.com/v2/city/lookup?location='+longitude+','+latitude+'&key=e74a9145c2cb4cb395a9ff2db7cfc39f',
            success: (result) => {
                console.log(result.data.location[0])
                // wx.setStorage({//异步存储
                //     key:"loacation_city",
                //     data:result.data.location[0].adm2},//市级
                // )
                // wx.setStorage({
                //     key:"location_area",
                //     data:result.data.location[0].name//区级
                // })
                wx.setStorageSync('localcity', result.data.location[0].name);
                wx.setStorageSync('locals', result.data.location[0].adm2);
                this.setData({
                    location:result.data.location[0].name+result.data.location[0].adm2
                })
            },
            fail: (res) => {},
            complete: (res) => {},
          })
        },
      fail: (res) => {},
      complete: (res) => {},
    });
   } ,
/**
 * 点击事件add——选择城市
 */
selectEvent:function(e){
    var that=this;
    console.log(e.detail.value[2]);
    var city=e.detail.value[2];//获取选择的城市
    
    // //加载已选城市
    // wx.request({
    //     url: 'http://localhost:801/Meteorological_Science_WXProgram/index/index_selectCityOrder.php?id='+id,
    //     success:(res)=>{
    //         console.log(res.data)
            
            
    //         // that.setData({
    //         //   citys:res.data
    //         // })
    //         for(var i=0;i<res.data.length;i++){
    //                 if(res.data[i]==city){
    //                     console.log('重复');
    //                 }
    //         };
    //     }
    //   });

    //添加订阅操作
    var id=wx.getStorageSync('id');
    // console.log(id);
    wx.request({
      url: 'http://localhost:801/Meteorological_Science_WXProgram/index/index_addCity.php?city_name='+city+'&id='+id,
        success:(res)=>{
        // console.log(res.data);
        if(res.data!=true){
            console.log("重复订阅");
        }
        this.onShow();
        }
     })
    // console.log(this.data.citys);
},
//删除城市
tapEvent_deleteCity:function(e){
    // console.log(e.currentTarget.dataset.city);
    var id=wx.getStorageSync('id');
    var city=e.currentTarget.dataset.city;
    wx.request({
      url: 'http://localhost:801/Meteorological_Science_WXProgram/index/index_deleteCity.php?city_name='+city+'&id='+id,
      success:(res)=>{
        //   console.log(res.data);
          this.onShow();
      }
    })
},

})