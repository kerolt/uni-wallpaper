export function getTimeDescription(timestamp) {
  const currentTime = new Date().getTime();
  const pastTime = new Date(timestamp).getTime();
  const diffTime = currentTime - pastTime;
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = diffDays / 30; // 这里假设一个月平均有30天

  if (diffMinutes <= 1) {
    return "1分钟";
  } else if (diffMinutes <= 60) {
    return `${diffMinutes}分钟`;
  } else if (diffHours <= 24) {
    return `${diffHours}小时`;
  } else if (diffDays <= 31) { // 这里假设一个月最多31天
    return `${Math.floor(diffDays)}天`;
  } else if (diffMonths <= 3) {
    return `${Math.floor(diffMonths)}个月`;
  } else {
    return "很久";
  }
}

export function gotoHome() {
  uni.showModal({
    title: "提示",
    content: "页面出错啦，将返回首页",
    showCancel: false,
    success: (res) => {
      if (res.confirm) {
        uni.reLaunch({
          url: "/pages/index/index"
        });
      }
    }
  });
}
