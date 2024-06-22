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