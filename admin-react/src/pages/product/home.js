import React,{ Component } from 'react';
import { Card,Table,Icon,Button,Select,Input } from 'antd';
const Option = Select.Option
/*-----------商品路由组件-------------*/
export default class ProductHome extends Component {
	state = {
		products:[],//商品

	}

	initColumns=()=>{
		this.columns = [
			{
				title:'商品名称',
				dataIndex:'name'
			},
			{
				title:'商品描述',
				dataIndex:'desc'
			},
			{
				title:'商品价格',
				dataIndex:'price',
				render:(price)=> '￥'+price
			},
			{
				title:'商品状态',
				dataIndex:'desc'
			},
		]
	}

	//第一次render初始化数据
	componentWillMount(){
		this.initColumns()
	}

	render(){
		const { products } = this.props
		const title = (
				<span>
					<Select value="1" style={{width:150}}>
						<Option value="1">按名称搜索</Option>
						<Option value="2">按描述搜索</Option>
					</Select>
					<Input placeholder="关键字" style={{width:150,margin:"0 15px"}}/>
					<Button type="primary">搜索</Button>
				</span>
			)
		const extra = (
				<Button type="primary">
					<Icon type="plus"/>
					添加商品
				</Button>
			)
		return (
			<Card title={title} extra={extra}>
				<Table
				rowKey="_id"
				dataSource={products}
				columns={this.columns}
				/>
			</Card>
		)
	}
}