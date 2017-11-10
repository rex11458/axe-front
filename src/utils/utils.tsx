import cloneDeep from "lodash/cloneDeep";
import navData from "../common/nav";


export function getRouteData(path) {
  if (
    !navData.some(item => item.layout === path) ||
    !navData.filter(item => item.layout === path)[0].children
  ) {
    return null;
  }
  const dataList = cloneDeep(navData.filter(item => item.layout === path)[0]);
  const nodeList = getPlainNode(dataList.children);
  return nodeList;
}

function getPlainNode(nodeList, parentPath = "") {
  const arr = [];
  nodeList.forEach(node => {
    const item = node;
    item.path = `${parentPath}/${item.path || ""}`.replace(/\/+/g, "/");
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}

export function digitUppercase(n) {
  const fraction = ["角", "分"];
  const digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
  const unit = [["元", "万", "亿"], ["", "拾", "佰", "仟"]];
  let num = Math.abs(n);
  let s = "";
  fraction.forEach((item, index) => {
    s += (digit[Math.floor(num * 10 * 10 ** index) % 10] + item).replace(
      /零./,
      ""
    );
  });
  s = s || "整";
  num = Math.floor(num);
  for (let i = 0; i < unit[0].length && num > 0; i += 1) {
    let p = "";
    for (let j = 0; j < unit[1].length && num > 0; j += 1) {
      p = digit[num % 10] + unit[1][j] + p;
      num = Math.floor(num / 10);
    }
    s = p.replace(/(零.)*零$/, "").replace(/^$/, "零") + unit[0][i] + s;
  }

  return s
    .replace(/(零.)*零元/, "元")
    .replace(/(零.)+/g, "零")
    .replace(/^整$/, "零元整");
}