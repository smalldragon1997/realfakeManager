import React from 'react';
import {view as Person} from '../../../components/personComponent/person'
import {Row, Col} from 'antd';

export default () => (
    <Row type="flex" justify="space-around">
        <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={16}>
            <Person/>
        </Col>
    </Row>

)