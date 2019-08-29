import React,{ Component } from 'react';
import { Form,Select,Input } from 'antd';
import PropTypes from 'prop-types';

const Item = Form.Item;
const Option = Select.Option;
//添加分类form组件
class AddForm extends Component {
	static propTypes = {
		setForm:PropTypes.func.isRequired
	}

	componentWillMount(){
		this.props.setForm(this.props.form)
	}
	render(){
		const { categories,parentId } = this.props;
		const { getFieldDecorator } = this.props.form;
		return (
			<Form>
				<Item>
				 	{getFieldDecorator('parentId',{
				 		initialValue:parentId
				 	})(
				 		<Select>
							<Option value="0">一级分类</Option>
							{
								categories.map(category=><Option value={category._id}>{category.name}</Option>)
							}
						</Select>
				 	)}
				</Item>
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
export default Form.create()(AddForm)