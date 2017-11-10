import mockjs from "mockjs";
import { format, delay } from "roadhog-api-doc";

// import { getFakeList } from './mock/api';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === "true";

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  "GET /api/currentUser": {
    $desc: "获取当前用户接口",
    $params: { pageSize: { desc: "分页", exp: 2 } },
    $body: {
      name: "momo.zxy", //   avatar: imgMap.user,
      userid: "00000001",
      notifyCount: 12
    }
  }, // GET POST 可省略
  "GET /api/products": [
    { code: "000001", name: "联泰稳赢一号" },
    { code: "000002", name: "联泰稳赢二号" },
    { code: "000003", name: "联泰稳赢三号" }
  ],
  "POST /api/submitbuy": (req, res) => {
    res.send({
      ...req.body,
      status:   Math.random % 2 === 0 ? "success" : "error"
    });
  },
  "POST /api/funds": (req, res) => {
    res.send([
      {
        value: "01",
        label: "华夏基金",
        children: [
          { value: "000001", label: "华夏成长" },
          { value: "000002", label: "华夏大盘" }
        ]
      },
      {
        value: "02",
        label: "易方达基金",
        children: [
          { value: "000011", label: "易方达混合" },
          { value: "000012", label: "易方达货币" }
        ]
      }
    ]);
  },
  "POST /api/rule": { $params: { pageSize: { desc: "分页", exp: 2 } } }, //   'GET /api/fake_list': getFakeList,
  // $body: postRule,
  "POST /api/login/account": (req, res) => {
    const { password, userName } = req.body;
    res.send({
      status: password === "888888" && userName === "admin" ? "ok" : "error",
      type: "account"
    });
  },
  "POST /api/register": (req, res) => {
    res.send({ status: "ok" });
  } //   'GET /api/notices': getNotices,
};

export default (noProxy ? {} : delay(proxy, 1000));
