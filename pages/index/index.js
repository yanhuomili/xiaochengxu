//index.js
//获取应用实例
const app = getApp()
const commonHandle=require('../../commonHandle/common.js')
Page({
  data: {
    motto: 'Hello World',
    n:1,
    noData:false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    dataList:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onPullDownRefresh:function(){
    this.getList();
    var _this=this;
    setTimeout(function(){
      wx.stopPullDownRefresh;
      _this.setData({
        noData:false,
        n:1
      })
    },1000)
    
  },
  onReachBottom:function(){
    let num=this.data.n;
    num++
   this.setData({
     n:num
   })
    this.getList(this.data.n);
    console.log('上拉加载更多')
  },
  onLoad: function () {
    this.getList();
    wx.request({
      url: 'http://huanqiuxiaozhen.com/wemall/slider/list',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res)
      }
    })

    wx.request({
      url: 'http://huanqiuxiaozhen.com/wemall/venues/venuesList',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res)
      }
    })

    wx.request({
      url: 'http://huanqiuxiaozhen.com/wemall/goods/choiceList',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res)
      }
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getsome:function(){
    console.log('获取数据')
    wx.request({
      url: 'http://192.168.1.246/getUrl',
      method:'GET',
      data:{
        name:'lili',
        age:27
      },
      header:{
        'Accept':'application/json'
      },
      success:function(data){
        console.log(data);

      }
      

    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getList:function(n){
    if(n>=5){
      console.log('数据加载完');
      this.setData({
        noData:true
      })
      return;
    }
    var arr=[]
    console.log(this.data.dataList)
    if(n){
      arr = this.data.dataList;
    }else{
      arr = [];
    }
    if(n){
      for (let i = 0; i < 10; i++) {
        arr.push({
          title: n + '列表标题' + (i + 1),
          text: n + '这是第' + i + '条新闻，新闻的主要内容是...'
        })
      }
    }else{
      for (let i = 0; i < 10; i++) {
        arr.push({
          title: '列表标题' + (i + 1),
          text:  '这是第' + i + '条新闻，新闻的主要内容是...'
        })
      }
    }
    
    this.setData({
      dataList: arr
    })
  
    
  }
})
