import React from "react";
import { render } from "react-dom";
import { Card, Steps, Form } from "antd";
import { connect } from "dva";

import Step1 from './Buy/BuyStep1'
import Step2 from './Buy/BuyStep2'
import Step3 from "./Buy/BuyStep3"
const { Step } = Steps;

class BuyStepForm extends React.Component<any, any> {
  getCurrentComponent() {
    const componentMap = {
      0: Step1,
      1: Step2,
      2: Step3
    };
    return componentMap[this.getCurrentStep()];
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

  public render(): JSX.Element {

 const { form, stepFormData, products, submitting, dispatch } = this.props;
 const formItemLayout = { labelCol: { span: 5 }, wrapperCol: { span: 19 } };
 const CurrentComponent = this.getCurrentComponent();
   

    return (
      <div>
        <Card bordered={false}>
          <div>
            <Steps>
              <Step title="填写交易信息" />
              <Step title="确认交易信息" />
              <Step title="完成" />
            </Steps>
            <Step1 form={this.props.form}/>
             {/* <CurrentComponent
              formItemLayout={formItemLayout}
              form={form}
              dispatch={dispatch}
              data={stepFormData}
              products={products}
              submitting={submitting}
            />  */}
          </div>
        </Card>
      </div>
    );
  }
}
export default connect(state => ({

}))(Form.create({})(BuyStepForm));

