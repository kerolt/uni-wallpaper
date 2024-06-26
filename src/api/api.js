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