import React from "react";
import { Form, Input, Button, Alert } from "antd";
import { routerRedux, Redirect } from "dva/router";
import { digitUppercase } from "../../../utils/utils";
const styles = require("./style.less");

class BuyStep2 extends React.Component<any, any> {
  render() {
    const { dispatch, formItemLayout, products, funds, form, stepFormData, submitting } = this.props;
    const { getFieldDecorator, validateFields } = form;

    const onPrev = () => {
      dispatch(routerRedux.push("/trade/buy"));
    };
    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: "trade/submitStepForm",
            payload: {
              ...stepFormData,
              ...values
            }
          });
        }
      });
    };
    return <div>
        <Form layout="horizontal" className={styles.stepForm}>
          <Alert closable showIcon message="申购完成后，请在15:00前将资金划拨至联泰民生监管账户" style={{ marginBottom: 24 }} />
          <Form.Item {...formItemLayout} className={styles.stepFormText} label="产品名称">
            {stepFormData.productName}
          </Form.Item>
          <Form.Item {...formItemLayout} className={styles.stepFormText} label="投资标的">
            {stepFormData.fundName}
          </Form.Item>
          <Form.Item {...formItemLayout} className={styles.stepFormText} label="申购金额">
            <span className={styles.money}>{stepFormData.amount}</span>
            <span className={styles.uppercase}>
              （{digitUppercase(stepFormData.amount)}）
            </span>
          </Form.Item>
          <Form.Item style={{ marginBottom: 8 }} wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: formItemLayout.wrapperCol.span, offset: formItemLayout.labelCol.span } }} label="">
            <Button type="primary" onClick={onValidateForm} loading={submitting}>
              提交
            </Button>
            <Button onClick={onPrev} style={{ marginLeft: 8 }}>
              上一步
            </Button>
          </Form.Item>
        </Form>
      </div>;
  }
}

export default BuyStep2;
