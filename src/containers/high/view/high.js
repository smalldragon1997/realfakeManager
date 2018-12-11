import React from 'react';
import {view as High} from '../../../components/highComponent/high/'
// import Loadable from '../../../components/commom/loadable';
import {Row, Col} from 'antd';


// const High = Loadable(() => import('../../../components/highComponent/high/view/high'));

export default () => (
    <Row type="flex" justify="space-around">
        <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={16}>
            <High/>
        </Col>
    </Row>

)