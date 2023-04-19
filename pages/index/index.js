
import { getMoodListAPI } from "../../utils/api/index"
Page({
  data: {
    params: {
      currentPage: 1,
      size: 5
    },
    totalRecord:0,
    moodList: [],
    endStatus:false
  },
  onLoad() {
    this.getMoodList();
  },
  //获取心情列表
  getMoodList() {
    getMoodListAPI(this.data.params).then(res => {
      console.log(res)
      let { body } = res;
      if (body?.resultData?.length > 0) {
        const list = body.resultData;
        list.forEach(el => {
          el.transDate = this.transTimes(el.serviceTime);
        });
        this.setData({
          moodList: [...this.data.moodList,...list],
          totalRecord:body.totalRecord
        })
      }
    })
  },
  //时间转化
  transTimes(oldTime) {
    const oldTimeNum = +new Date(oldTime);
    const nowTimeNum = +new Date();
    //毫秒->秒
    const times = parseInt((nowTimeNum - oldTimeNum) / 1000);
    /**
    * 一分钟算为秒
    * 一小时之前算为分钟
    * 大于一小时展示年月日
    */
    switch (true) {
      case times>0&&times < 60:
        return `${times}秒前`;
      case times >= 60 && times < 3600:
        return `${parseInt(times / 60)}分钟前`;
      case times >= 3600:
        return oldTime;
      default: "时间异常";
    }
  },
  //下拉到底部
  onReachBottom(){
    if(this.data.totalRecord<=this.data.moodList.length){
      this.setData({
        endStatus:true
      })
      return
    }
    this.setData({
      params:{
        ...this.data.params,
        currentPage:this.data.params.currentPage+1
      }
    },_=>{
      this.getMoodList();
    })
    
  }
})




