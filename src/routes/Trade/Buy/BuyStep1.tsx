import React from "react";
import { Form, Input, Button, Select, Cascader } from "antd";
import { routerRedux } from "dva/router";
const styles = require("./style.less");
const { Option } = Select;

class BuyStep1 extends React.Component<any, Object> {

    // Just show the latest item.
   displayRender(label) {
      return label[label.length - 1];
    }

     productAccounts(products) {
      if (products == null) {
        return <Option value="" />;
      } else {
        return products.map(item => (
          <Option key={item.code} value={item.code}>
            {item.name}
          </Option>
        ));
      }
    }

  render() {
    const { dispatch, formItemLayout, products, funds, form, stepFormData } = this.props;
    const { getFieldDecorator, validateFields } = form;
    
    function filter(inputValue, path) {
      console.log(inputValue);
      console.log(path);
      const keys = path.split("/");
      return funds
        .filter(item => keys.contains(item.value))
        .filter(item => item.label == inputValue || item.value == inputValue);
    }
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
        const { productCode, fundCode} = values;
         const productName = products.find(item => item.code == productCode).name;
         const fundName = funds
           .find(item => item.value == fundCode[0])
           .children.find(item => item.value == fundCode[1]).label;
               dispatch({ type: "trade/saveStepFormData", payload:{productName,fundName,...values}});
          dispatch(routerRedux.push("/trade/buy/buy-confirm"));
        }
      });
    };
    return <div>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} label="选择产品">
            {getFieldDecorator("productCode", {
              initialValue: stepFormData.productName,
              rules: [{ required: true, message: "请选择产品账户" }]
            })(<Select placeholder="请选择产品账户">
                {this.productAccounts(products)}
              </Select>)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="投资标的">
            {getFieldDecorator("fundCode", {
              initialValue: ["zhejiang", "hangzhou", "xihu"],
              rules: [{ required: true, message: "请输入产品代码/名称/简称" }]
            })(<Cascader options={funds} displayRender={this.displayRender} placeholder="请输入产品代码/名称/简称" showSearch />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="申购金额">
            {getFieldDecorator("amount", {
              initialValue: stepFormData.amount,
              rules: [
                { required: true, message: "请输入申购金额" },
                { pattern: /^(\d+)((?:\.\d+)?)$/, message: "请输入合法金额数字" }
              ]
            })(<Input prefix="￥" placeholder="请输入金额" />)}
          </Form.Item>
          <Form.Item wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: formItemLayout.wrapperCol.span, offset: formItemLayout.labelCol.span } }} label="">
            <Button type="primary" onClick={onValidateForm}>
              下一步
            </Button>
          </Form.Item>
        </Form>
      </div>;
  }
}

export default BuyStep1;