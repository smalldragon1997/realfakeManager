import React from 'react';
import {view as All} from '../../../components/allComponent/all/'
import { Row,Col } from 'antd';

export default (props) => (
    <Row type="flex" justify="space-around" >
        <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={16} >
            <All/>
        </Col>
    </Row>

)