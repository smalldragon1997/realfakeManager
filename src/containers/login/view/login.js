import React from 'react';
import {view as Login} from '../../../components/loginComponent/login/'
import { Row,Col } from 'antd';

export default (props) => (
    <Row type="flex" justify="space-around" >
        <Col span={24} >
            <Login/>
        </Col>
    </Row>

)