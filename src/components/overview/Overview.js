import React from "react";
import {Layout} from 'antd';


export default function Overview() {
  const {Content} = Layout;

  return (
    <Content style={{padding: '0 50px'}}>
      <div className="site-layout-content">Hello</div>
    </Content>
  );
};
