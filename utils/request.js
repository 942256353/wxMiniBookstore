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
              
                if (res.data?.code === 200) {
                    resolve(res.data)
                } else {
                    wx.showToast({
                        title: (res.data&&res.data.message)||'请求失败',
                        icon: 'none'
                    })
                    reject(err)
                }
                setTimeout(_=>{
                    wx.hideLoading();
                },500)
            },
            fail(err) {
                wx.hideLoading();
                wx.showToast({
                    title: err||'请求失败',
                    icon: 'none'
                })
                reject(err)
            }
        })
    })
}

module.exports = {
    get(url, data) {
        return request({
            url,
            data,
            method: 'GET'
        })
    },
    post(url, data) {
        return request({
            url,
            data,
            method: 'POST'
        })
    }
}