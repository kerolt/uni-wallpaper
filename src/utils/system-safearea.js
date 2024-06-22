const systemInfo = uni.getSystemInfoSync();

export function getStatusBarHeight() {
  return systemInfo.statusBarHeight || 15;
}

export function getTitleBarHeight() {
  if (uni.getMenuButtonBoundingClientRect) {
    const { top, height } = uni.getMenuButtonBoundingClientRect();
    return height + (top - getStatusBarHeight()) * 2;
  } else {
    return 40;
  }
}
