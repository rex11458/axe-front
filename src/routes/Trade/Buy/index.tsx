import React, { PureComponent, Component } from "react";
import { connect } from "dva";
import { Card, Steps, Form } from "antd";
import Step1 from "./BuyStep1";
import Step2 from "./BuyStep2";
import Step3 from "./BuyStep3";
const styles = require("./style.less");

const { Step } = Steps;
class BuyStepForm extends PureComponent<any, any> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "global/fetchProducts"
    });
    dispatch({
      type: "global/fetchFunds"
    });
  }

  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split("/");
    switch (pathList[pathList.length - 1]) {
      case "buy":
        return 0;
      case "buy-confirm":
        return 1;
      case "buy-result":
        return 2;
      default:
        return 0;
    }
  }

  getCurrentComponent() {
    const componentMap = {
      0: Step1,
      1: Step2,
      2: Step3
    };
    return componentMap[this.getCurrentStep()];
  }

  render() {
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    };
    const CurrentComponent = this.getCurrentComponent();
    return (
      <Card bordered={false}>
        <div>
          <Steps current={this.getCurrentStep()}>
            <Step title="申购信息" />
            <Step title="订单确认" />
            <Step title="申购结果" />
          </Steps>
          <CurrentComponent {...this.props} formItemLayout={formItemLayout} />
        </div>
      </Card>
    );
  }
}

const BuyForm = Form.create()(BuyStepForm);
export default connect(state => ({
  stepFormData: state.trade.step,
  products: state.global.products,
  funds: state.global.funds,
  submitting: state.trade.stepFormSubmitting,
  result:state.trade.result
}))(BuyForm);
