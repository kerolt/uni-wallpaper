const BASE_URL = "https://tea.qingnian8.com/api/bizhi";

export function request(config = {}) {
  let { url, data = {}, method = "GET", header = {} } = config;
  url = BASE_URL + url;
  return new Promise((resolve, reject) => {
    uni.showLoading({
      mask: true
    });
    uni.request({
      url,
      data,
      method,
      header,
      success: res => {
        if (res.data.errCode === 0) {
          resolve(res.data);
        } else {
          uni.showModal({
            title: "啊哦！",
            content: res.data.errMsg,
            icon: "none",
            showCancel: false
          });
          reject(res.data);
        }
      },
      fail: err => {
        reject(err);
      },
      complete: () => {
        uni.hideLoading();
      }
    });
  });
}