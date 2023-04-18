const app = getApp();
function request({
    url,
    method,
    header = {},
    data = {}
}) {
    return new Promise((resolve, reject) => {
        wx.showLoading({
            title: '加载中',
        })
        wx.request({
            url: app.globalData.baseUrl + url, //仅为示例，并非真实的接口地址
            data: { ...data },
            method: method,
            header: { ...header },
            success(res) {
                wx.hideLoading();
                resolve(res.data)
            },
            fail(err) {
                wx.hideLoading();
                reject(err)
            }
        })
    })
}

module.exports =  {
    get(url, data) {
        return request({
            url, 
            data,
            method:'GET'
        })
    },
    post(url, data) {
        return request({
            url,
            data,
         method:'POST'
        })
    }
}