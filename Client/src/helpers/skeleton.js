import React from 'react';
import { 
	Row, 
	Col,
	Form, 
	Skeleton  
} from "antd";

export default ()=>{
	return (
		<Form layout="vertical">
            <Row gutter={10} justify="center" align="middle">
	            <Col span={8}>
	                <Skeleton.Input style={{ width: '200px' }} active={true} size="default" />
	            </Col>
	            <Col span={8}>
	            	<Skeleton.Input style={{ width: '200px' }} active={true} size="default" />
	            </Col>
            </Row>
            <br/>
            <Row gutter={10} justify="center" align="middle">
	            <Col span={8}>
	                <Skeleton.Input style={{ width: '200px' }} active={true} size="default" />
	            </Col>
	            <Col span={8}>
	            	<Skeleton.Input style={{ width: '200px' }} active={true} size="default" />
	            </Col>
            </Row>
            <br/>
            <Row gutter={10} justify="center" align="middle">
            	<Col span={8}>
            		<Skeleton.Button style={{ width: '100px' }} active={true} shape="round" size="la" />
            	</Col>
            </Row>
        </Form>
	)
}


