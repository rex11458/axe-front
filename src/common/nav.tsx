import BasicLayout from '../layouts/BasicLayout'

import Alert from '../routes/Account/alert'
import ProOpen from '../routes/Account/proopen'
import OrgOpen from '../routes/Account/orgopen'

import Apply from '../routes/Query/apply'
import Bank from '../routes/Query/bank'
import Confirm from '../routes/Query/confirm'
import Product from '../routes/Query/product'
import Transaction from '../routes/Query/transaction'
import Fund from '../routes/Query/fund'

import Dividends from '../routes/Trade/dividends'
import Purchase from '../routes/Trade/purchase'
import Redemption from '../routes/Trade/redemption'
import Transform from "../routes/Trade/transform"

import BuyStepForm from "../routes/Trade/Buy";
import BuyStep2 from "../routes/Trade/Buy/BuyStep2";
import BuyStep3 from "../routes/Trade/Buy/BuyStep3";


const data = [
  {
    component: BasicLayout,
    layout: "BasicLayout",
    name: "首页", // for breadcrumb
    path: "",
    children: [
      {
        name: "账户管理",
        icon: "code-o",
        path: "account",
        children: [
          {
            name: "产品开户",
            path: "proopen",
            component: ProOpen
          },
          {
            name: "账户信息修改",
            path: "alert",
            component: Alert
          }
        ]
      },
      {
        name: "柜台交易",
        icon: "pay-circle-o",
        path: "trade",
        children: [
          {
            name: "产品认/申购",
            path: "buy",
            component: BuyStepForm,
              children: [{
              path: 'buy-confirm',
              component: BuyStep2,
            }, {
              path: 'buy-result',
              component: BuyStep3,
            }],
          },
          {
            name: "产品赎回",
            path: "redemption",
            component: Redemption
          },
            {
            name: "跨TA转换",
            path: "transform",
            component: Transform
          },
            {
            name: "修改分红方式",
            path: "dividends",
            component: Dividends
          }
        ]
      },
      {
        name: "账户查询",
        icon: "search",
        path: "query",
        children: [
          {
            name: "产品账户查询",
            path: "product",
            component: Product
          },
          {
            name: "银行账户查询",
            path: "bank",
            component: Bank
          },
          {
            name: "基金账户查询",
            path: "fund",
            component: Fund
          },
          {
            name: "交易账户查询",
            path: "transaction",
            component: Transaction
          },
          {
            name: "账户申请查询",
            path: "apply",
            component: Apply
          },
          {
            name: "账户确认查询",
            path: "confirm",
            component: Confirm
          }
        ]
      }
    ]
  }
];

export function getNavData() {
  return data;
}

export default data;
