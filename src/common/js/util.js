/**
 * 解析url参数
 * Created by yi on 2016-12-28.
 * @return Object {id:12334}
 */
export function urlParse() {
  let url = window.location.search;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]]+/g;
  let arr = url.match(reg);
  // ['?id=123454','&a=b']

  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      let key = tempArr[0];
      let val = tempArr[1];
      obj[key] = val;
    });
  }
  return {
    id: 123123
  };
};

/**
 * 解析拼接img地址
 * @return String
 */

export function recombineImg(string, format = 140) {
  if (!string || typeof string !== 'string') {
    return string;
  }

  let baseUrl = 'https://fuss10.elemecdn.com/';
  let suffix = `?imageMogr/format/webp/thumbnail/!${format}x${format}r/gravity/Center/crop/${format}x${format}/`;
  let imgSuffix = string.indexOf('png') > 0 ? 'png' : 'jpeg';
  let url = `${baseUrl}${string.substring(0, 1)}/${string.substring(1, 3)}/${string.substring(3)}.${imgSuffix}${suffix}`;
  return url;
};

/**
 * 设置默认文字大小
 * @return String
 */

export function setFontSize() {
  let h;
  if (window.screen.orientation && (window.screen.orientation.angle == 90 || window.screen.orientation.angle == -90)) {
    h = document.documentElement.clientWidth;
    // $('html').css('font-size', h / 667 * 100);
    console.log(123);
    document.getElementsByTagName('html')[0]['style']['fontSize'] = h / 667 * 100 + 'px';
  } else {
    h = document.documentElement.clientWidth;
    console.log(h / 375 * 100);
    // $('html').css('font-size', h / 375 * 100);
    document.getElementsByTagName('html')[0]['style']['fontSize'] = h / 375 * 100 + 'px';
    // document.getElementsByTagName('html')[0]['style']['backgroundColor'] = 'red';
  }
}
