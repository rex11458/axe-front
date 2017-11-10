import * as React from 'react';
import {Menu,Button,Input} from 'antd'
import './Example.less'

class Example extends React.Component<any, any> {


  render(): JSX.Element {
    return <div>
      <Input ></Input>
        <Button>
          按钮
        </Button>
        <Menu>
          <Menu.Item>item1</Menu.Item>
          <Menu.Item>item2</Menu.Item>
          <Menu.Item>item3</Menu.Item>
        </Menu>
      </div>;
  }
}

export default Example;
