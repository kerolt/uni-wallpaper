import { request } from "../utils/request";

export function apiGetBanner() {
  return request({
    url: "/homeBanner"
  });
}

export function apiGetDayRandom() {
  return request({
    url: "/randomWall"
  });
}

export function apiGetNotice(data = {}) {
  return request({
    url: "/wallNewsList",
    data,
    method: "POST"
  });
}

export function apiGetClassify(data = {}) {
  return request({
    url: "/classify",
    data
  });
}

export function apiGetClassifyDetails(data = {}) {
  return request({
    url: "/wallList",
    data
  });
}

export function apiSetupScore(data = {}) {
  return request({
    url: "/setupScore",
    data
  });
}

export function apiRecordDownload(data = {}) {
  return request({
    url: "/downloadWall",
    data
  });
}

export function apiDetailWall(data = {}) {
  return request({
    url: "/detailWall",
    data
  });
}

export function apiUserInfo() {
  return request({
    url: "/userInfo",
  });
}

// data对象中包含一个type，其值为download或score，用于查询发起请求的ip的用户的下载或者评分列表
export function apiGetUserWallList(data = {}) {
  return request({
    url: "/userWallList",
    data
  });
}