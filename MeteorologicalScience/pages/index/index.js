// index.js
// 获取应用实例
const app = getApp();
const log=require('../logs.js');
Page({
  data: {
    //定位城市
    localCity:'',
    //现在城市
    nowcity:'北京',
    nowcity_id:'',
    //订阅城市
    citys:[],
    //实况天气背景图
    backgroundImg:'../../images/1.jpg',
    //预警信息
    warning:[],
    //示例——24小时预报
    time_24:[],
    //视频地址 
    index_video:'',
    //7天预报
    day_7:[    
    ],
    //二十四节气
    index_jieqi:[],
    //生活指数
    white:[{image:'../../images/生活指数-穿衣.png',title:'穿衣指数'},{image:'../../images/生活指数-运动.png',title:'运动指数'},{image:'../../images/钓鱼指数.png',title:'钓鱼指数'},{image:'../../images/生活指数-旅游.png',
            title:'旅游指数'},{image:'../../images//生活指数-洗车.png',title:'洗车指数' }, {image:'../../images/天气-体感舒适度指数.png',title:'舒适度'},{image:'../../images//防晒 (1).png',title:'防晒指数'},{image:'../../images/生活指数-紫外线.png',title:'紫外线指数'},    
    ],
    },
//加载函数
  onLoad() {
        
  },
onShow(){
    //登录信息判断，未登录——跳转到mine进行登录，已登录，无操作。
    if(!wx.getStorageSync('user_name')){
        wx.showModal({
          title:'<登录提示>',
          content:'请先登录。',
          showCancel:false,
          success(res){
            if(res.confirm){
                wx.switchTab({
                  url: '../mine/mine',
                })
            }
          }
        })
    }
    if (wx.getUserProfile) {
        this.setData({
          canIUseGetUserProfile: true
        })
      };
      // //获取定位城市
      // var location=wx.getStorage({
      //     key:'location_area',
      //     success:(res)=>{
      //         console.log(res.data);
      //         this.setData({
      //             nowcity:res.data,
      //             localCity:res.data
      //         })
      //     }
      // });
      // console.log(this.data.nowcity);
      // console.log(this.data.localCity);
      // console.log(localCity);
      //订阅城市传入
      var id=wx.getStorageSync('id');
      wx.request({
        url: 'http://localhost:801/Meteorological_Science_WXProgram/index/index_selectCityOrder.php?id='+id,
        success:(res)=>{
          //   console.log(res.data)
            this.setData({
              citys:res.data
            })
        }
      });
      //先传入定位城市
      // this.getLoaction();
      this.getLoaction();
      // console.log(lc);
      // console.log(this.getLoaction());
      // 实况天气传入
      this.now_weather();
      // 24小时预报
      this.load_time_24();
      //七天预报数据传入
      this.load_7day();
      //24节气数据传入
      this.load_jieqi();
      //生活指数数据传入
      //首页视频传入
      this.getVideo();

      //打印日志
    //   var log = require('../logs.js'); // 引用上面的log.js文件
        log.info('首页'); // 日志会和当前打开的页面关联，建议在页面的onHide、onShow等生命周期里面打
        log.warn('warn');
        log.error('error');
        log.setFilterMsg('filterkeyword');
        log.addFilterMsg('addfilterkeyword');
},

// 事件处理函数

/**
 * 点击事件——跳转至选择城市页面
 */
  pickCity:function(e){
    wx.navigateTo({
      url: '/pages/index_pick/index_pick',
    })
  },

/**
 * 点击事件——更改查看订阅城市
 * tapEvent_changeCity
 */
  tapEvent_changeCity:function(e){
    console.log("切换城市"+e.currentTarget.dataset.city);
    var nowcity=e.currentTarget.dataset.city;
    this.setData({
        nowcity:nowcity,
    });
    this.now_weather();
    this.load_time_24();
    this.load_7day();
  },

/**
 * 点击事件——跳转二十四节气详情
 */
  tapEvent_st:function(e){
    // console.log(e.currentTarget.dataset.st);
    var solarterm=e.currentTarget.dataset.st//传递节气名称
    wx.navigateTo({
      url: '/pages/index_solarterm/index_solarterm?data='+solarterm,
    })
  },
/**
 * 点击事件-显示预警详情
 */
tapEventwarning:function(e){
    console.log(e.currentTarget.dataset.text);
    wx.showModal({
        content:e.currentTarget.dataset.text,
        cancelColor: 'cancelColor',
        showCancel:false
    })
},
//点击事件——点击显示24小时预报详情
tapEvent_24details:function(e){
    console.log(e.currentTarget.dataset.details);
    var details=JSON.stringify(e.currentTarget.dataset.details);
    wx.navigateTo({
      url: '../index_details/index_details?details='+details,
     
      success: (result) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
},
//点击事件——点击显示7天预报详情
tapEvent_7details:function(e){
    // console.log(e);
    // var details=e.currentTarget.dataset.details;
    var details=JSON.stringify(e.currentTarget.dataset.details)
    wx.navigateTo({
      url: '../index_details2/index_details2?details='+details,
      success: (result) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
},
// 点击事件——点击显示生活指数详情
tapEvent_living:function(e){
    // console.log(e.currentTarget.dataset.tname);
    // console.log(this.data.nowcity_id);
    var tname=e.currentTarget.dataset.tname;
    var type='';
    if(tname=='穿衣指数'){
        type=3};if(tname=='运动指数'){
        type=1};if(tname=='钓鱼指数'){
        type=4};if(tname=='旅游指数'){
        type=6};if(tname=='洗车指数'){
        type=2};if(tname=='舒适度'){
        type=8};if(tname=='防晒指数'){
        type=16};if(tname=='紫外线指数'){
        type=5};
    var location=this.data.nowcity_id;
    wx.request({
      url: 'https://devapi.qweather.com/v7/indices/1d?key=e74a9145c2cb4cb395a9ff2db7cfc39f&location='+location+'&type='+type,
      success:(res)=>{
        // console.log(res);
        wx.showModal({
          cancelColor: 'cancelColor',
          title:res.data.daily[0].category,
          content:res.data.daily[0].text,
          showCancel:false
        })
      }
    })
    
},

/**
 * 封装函数
 * 定义常用函数 
 */
/**
 * 获取定位的值getStorage()
 */
 getLoaction:function(){
    var localcity=wx.getStorageSync('localcity')
    // console.log('同步后'+localcity);
    this.setData({
        nowcity:localcity,
        localCity:localcity
    })
    // console.log('get后'+this.data.nowcity);
},

/**
 * now_weather,实况天气
 */
 now_weather:function(){
    var nowcity=this.data.nowcity;
    // console.log(nowcity);
    wx.request({
        url: 'https://geoapi.qweather.com/v2/city/lookup?key=e74a9145c2cb4cb395a9ff2db7cfc39f&location='+nowcity,
        success:(res)=>{
        //   console.log(res.data.location[0])
          var nowcity_id=res.data.location[0].id;
          this.setData({
              nowcity_id:nowcity_id
          })
        //   console.log(this.data.nowcity_id);
          //通过城市id城市天气
          wx.request({
            url: 'https://devapi.qweather.com/v7/weather/now?key=e74a9145c2cb4cb395a9ff2db7cfc39f&location='+nowcity_id,
            success:(res)=>{
                //   console.log(res.data.now);
                  this.setData({
                      temp:res.data.now.temp,
                      wind:res.data.now.windDir+" "+res.data.now.windScale,
                      humidity:res.data.now.humidity,
                      icon:res.data.now.icon,
                      text:res.data.now.text
                  })
              },
              false:()=>{
                  console.log('error');
                  log.error('天气获取失败')
              }
          });
          //警告获取
          wx.request({
            url: 'https://devapi.qweather.com/v7/warning/now?key=e74a9145c2cb4cb395a9ff2db7cfc39f&location='+nowcity_id,
            success:(res)=>{
                // console.log('警告',res.data.warning)
                this.setData({
                    warning:res.data.warning
                })
            },false:()=>{
                log.error('警告获取失败')
            }
          })
        }
      });
},

/**
 *  time_24,24小时天气数据传入
 */
 load_time_24:function(){
       //将城市名称转换为城市id
    //    var that=this;
       var nowcity=this.data.nowcity;
       wx.request({
         url: 'https://geoapi.qweather.com/v2/city/lookup?key=e74a9145c2cb4cb395a9ff2db7cfc39f&location='+nowcity,
         success:(res)=>{
        //    console.log(res.data.location[0])
           var nowcity_id=res.data.location[0].id;
           this.setData({
               nowcity_id:nowcity_id
           })
        //    console.log(this.data.nowcity_id);
           //通过城市id获取逐小时城市天气
           wx.request({
           url: 'https://devapi.qweather.com/v7/weather/24h?key=e74a9145c2cb4cb395a9ff2db7cfc39f&location='+nowcity_id,
               success:(res)=>{
                //    console.log(res);
                //    console.log(res.data.hourly.length)
                   //循环——将数组中的fxTime截取小时制
                   for(var i=0;i<res.data.hourly.length;i++){
                       var time=res.data.hourly[i].fxTime.substring(11,16);
                       res.data.hourly[i].fxTime=time;
                   };
                   this.setData({
                       time_24:res.data.hourly 
                   })
               },
               false:()=>{
                   console.log('error');
                   log.error('天气获取失败');
               }
           });
         }
       });
},
/**
 * 7天天气预报
 */
 load_7day:function(){
    var nowcity=this.data.nowcity;
    wx.request({
        url: 'https://geoapi.qweather.com/v2/city/lookup?key=e74a9145c2cb4cb395a9ff2db7cfc39f&location='+nowcity,
        success:(res)=>{
        //   console.log(res.data.location[0])
          var nowcity_id=res.data.location[0].id;
          this.setData({
              nowcity_id:nowcity_id
          })
        //   console.log(this.data.nowcity_id);
          //通过城市id获取7天城市天气
          wx.request({
            url: 'https://devapi.qweather.com/v7/weather/7d?key=e74a9145c2cb4cb395a9ff2db7cfc39f&location='+nowcity_id,
            success:(res)=>{
                // console.log('7day',res.data);
                //循环——将数组中的fxTime截取小时制
                for(var i=0;i<res.data.daily.length;i++){
                    var time=res.data.daily[i].fxDate.substring(5,10);
                    res.data.daily[i].fxDate=time;
                };
                this.setData({
                    day_7:res.data.daily
                })
            },
            false:()=>{
                  console.log('error');
                  log.error('7天天气获取失败')
            }
          })
        }
    });  
 },
/**
 * 首页视频地址
 */
getVideo:function(){
    wx.request({
      url: 'http://localhost:801/Meteorological_Science_WXProgram/index/index_selectVideo.php',
      success:(res)=>{
        //   console.log("视频"+res.data);
          this.setData({
            index_video:res.data[0].url
          })
      }
    })
},
/**
 * 获取二十四节气信息；
 */
load_jieqi:function(){
    wx.request({
      url: 'http://open.liupai.net/jieqi/query?appkey=45faaa264fbdd4721be6260411761acd',
    //   http://jq.ylapi.cn/jq24/querylist.u?uid=12179&appkey=b9128f2415e6aea4de04e3e38695c44a
      success:(res)=>{
          console.log(res);
          var time=res.data.result.now.lunar[0]+'年'+res.data.result.now.lunar[4]+'月'+res.data.result.now.lunar[5]+'日';
          var nongli=res.data.result.now.lunar[1]+res.data.result.now.lunar[2];
          this.setData({
            //   index_jieqi:res.data.result.now,
              time:time,
              nongli:nongli,
              jieqiname:res.data.result.now.name
          }) 
      },
    })
}
})
