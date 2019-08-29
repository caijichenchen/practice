import React,{ Component } from 'react';
import { Form,Select,Input } from 'antd';
import PropTypes from 'prop-types'
const Item = Form.Item;
const Option = Select.Option;
//添加分类form组件
class UpdateForm extends Component {
	//接受对应的属性
	static propTypes = {
		categoryName : PropTypes.string.isRequired
	}
	componentWillMount(){
		this.props.setForm(this.props.form)
	}
	render(){
		const { getFieldDecorator } = this.props.form;
		return (
			<Form>
				<Item>
					{getFieldDecorator('categoryName',{
				 		initialValue:''
				 	})(
				 		<Input placeholder="请输入分类名称"/>
				 	)}
				</Item>
			</Form>
		)
	}
}
export default Form.create()(UpdateForm)