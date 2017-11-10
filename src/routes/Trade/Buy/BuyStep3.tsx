import React from 'react';
import { Button, Row, Col, Icon, Steps, Card } from 'antd';
import { routerRedux } from 'dva/router';
import Result from '../../../components/Result';
const styles = require("./style.less");

export default class BuyStep3 extends React.Component<any, Object> {
  render() {
    const { result } = this.props;

    return (
      <div>
        <Result
          type={result.status}
          title="操作成功"
          description="预计两小时内到账"
          className={styles.result}
        />
      </div>
    );
  }
}

({ dispatch, data }) => {
  const onFinish = () => {
    dispatch(routerRedux.push('/trade/buy'));
  };
  const { Step } = Steps;

const desc1 = (
  <div style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.45)', position: 'relative', left: 42 }}>
    <div style={{ margin: '8px 0 4px' }}>
      周毛毛<Icon style={{ marginLeft: 8 }} type="dingding-o" />
    </div>
    <div>2016-12-12 12:32</div>
  </div>
);

const desc2 = (
  <div style={{ fontSize: 12, position: 'relative', left: 42 }}>
    <div style={{ margin: '8px 0 4px' }}>
      基金会计<Icon style={{ marginLeft: 8 }} type="dingding-o" />
    </div>
  </div>
);

const desc3 = (
  <div style={{ fontSize: 12, position: 'relative', left: 42 }}>
    <div style={{ margin: '8px 0 4px' }}>
      联泰运营人员<Icon type="dingding-o" style={{ color: '#00A0E9', marginLeft: 8 }} />
    </div>
    <div><a href="">催一下</a></div>
  </div>
);

const extra = (
  <div>
    <div style={{ fontSize: 16, color: 'rgba(0, 0, 0, 0.85)', fontWeight: '500', marginBottom: 20 }}>
      项目名称
    </div>
    <Row style={{ marginBottom: 16 }}>
      <Col xs={24} sm={12} md={12} lg={12} xl={6}>
        <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>项目 ID：</span>
        23421
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={6}>
        <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>负责人：</span>
        曲丽丽
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={12}>
        <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>生效时间：</span>
        2016-12-12 ~ 2017-12-12
      </Col>
    </Row>
    <Steps style={{ marginLeft: -42, width: 'calc(100% + 84px)' }} progressDot current={1}>
      <Step title={<span style={{ fontSize: 14 }}>提交申请</span>} description={desc1} />
      <Step title={<span style={{ fontSize: 14 }}>划付资金</span>} description={desc2} />
      <Step title={<span style={{ fontSize: 14 }}>到账审核</span>} description={desc3} />
      <Step title={<span style={{ fontSize: 14 }}>完成</span>} />
    </Steps>
  </div>
);

const actions = (
  <div>
    <Button type="primary" onClick={onFinish}>再来一笔</Button>
    <Button>查看账单</Button>
    <Button>打印凭证</Button>
  </div>
);
  return (
 
    <Result
      type="success"
      title="操作成功"
      description="预计两小时内到账"
      extra={extra}
      actions={actions}
      className={styles.result}
    />
  );
};
