import React from 'react';
import {view as Order} from '../../../components/orderComponent/order/'
import {Row, Col} from 'antd';

export default () => (
    <Row type="flex" justify="space-around">
        <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={16}>
            <Order/>
        </Col>
    </Row>

)