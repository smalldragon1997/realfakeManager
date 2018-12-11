import React from 'react';
import {view as Commodity} from '../../../components/commodityComponent/commodity/'
import {Row, Col} from 'antd';

export default () => (
    <Row type="flex" justify="space-around">
        <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={16}>
            <Commodity/>
        </Col>
    </Row>

)