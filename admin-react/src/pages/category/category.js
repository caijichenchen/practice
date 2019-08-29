import React,{ Component } from 'react';
import { Card,Table,Button,Icon,message,Modal } from 'antd';
import { reqCategories,reqUpdateCategories,reqAddCategories } from '../../api/index.js';
import LinkButton from '../../components/link-button/button.js';
import AddForm from './add-form.js';
import UpdateForm from './update-form.js'
/*-----------商品分类路由组件-------------*/
export default class Category extends Component {

	state={//初始化
		categories:[],//一级分类列表
		subCategories:[],//二级分类列表
		loading:false,//数据加载图标
		parentId:'0',//父分类id
		parentName:'',//父分类名称
		showStatus:0//标识显示添加/更新对话框,0都不显示,1显示添加,2显示更新
	}
	//初始化显示列表列数组
	initColumns=()=>{
		this.columns = [
	      {
	        title: '分类的名称',
	        dataIndex: 'name', // 显示数据对应的属性名
	      },
	      {
	        title: '操作',
	        width: 300,
	        render: (category) => ( // 返回需要显示的界面标签
	          <span>
	            <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
	            {/*如何向事件回调函数传递参数: 先定义一个匿名函数, 在函数调用处理的函数并传入数据*/}
	            {this.state.parentId==='0' ? <LinkButton onClick={() => this.showSubCategories(category)}>查看子分类</LinkButton> : null}
	          </span>
	        )
	      }
	    ]
	}
	//获取一级/二级分类数据
	getCategories= async ()=>{
		this.setState({loading:true});
		const { parentId } = this.state;
		const result = await reqCategories(parentId)//发送ajax请求获取数据
		this.setState({loading:false});
		if(result.status === 0){
			const categories = result.data;
			if(parentId === '0'){
				//更新一级分类状态
				this.setState({
					categories
				})
			}else{
				//更新二级分类状态
				this.setState({
					subCategories:categories
				})
			}
		}
	}

	//获取指定一级分类的二级列表
	showSubCategories=(category)=>{
		//更新状态
		this.setState({
			parentId:category._id,
			parentName:category.name
		},()=>this.getCategories())
	}
	//获取一级分类列表
	getFirstCategories=()=>{
		this.setState({
			parentId:'0',
			parentName:'',
			subCategories:[]
		})
	}
	//点击取消隐藏会话框
	handleCancel=()=>{
		//清楚输入数据
		this.form.resetFields()
		this.setState({
			showStatus:0
		})
	}
	//点击添加显示添加分类会话框
	showAdd=()=>{
		this.setState({
			showStatus:1
		})
	}
	//点击修改显示修改分类
	showUpdate=(category)=>{
		//保存分类对象
		this.category = category
		this.setState({
			showStatus:2
		})
	}
	//添加分类
	addCategory=async ()=>{
		//隐藏确认框
		this.setState({
			showStatus:0
		})
		//收集数据发送请求
		const {parentId,categoryName} = this.form.getFieldsValue()
		const result = await reqAddCategories({categoryName,parentId})
		if(result.status === 0){
			if(parentId === this.state.parentId){
				//重新获取列表
				this.getCategories()
			}
		}		
	}
	//修改分类
	updateCategory= async ()=>{
		//1.隐藏确认框
		this.setState({
			showStatus:0
		})
		//2.发送修改数据
		const parentId = this.category._id;
		const categoryName = this.form.getFieldValue('categoryName')
		//清楚输入数据
		this.form.resetFeilds()
		const result = await reqUpdateCategories(parentId,categoryName)
		if(result.status === 0){
			//3.重新显示列表
			this.getCategories()
		}
	}

	//第一次render初始化数据
	componentWillMount(){
		this.initColumns()
	}
	componentDidMount(){//发送异步请求
		this.getCategories()
	}

	render(){
		//读取状态数据
		const { categories,subCategories,parentId,parentName,loading,showStatus } = this.state
		//读取指定的分类
		const category = this.category || {}
		const title = parentId === '0' ? "一级分类" : (
			<span>
				<LinkButton onClick={this.getFirstCategories}>一级分类列表</LinkButton>
				<Icon type="arrow-right" style={{marginRight:'5px'}} />
				<span>{ parentName }</span>
			</span>
			)
		// Card的右侧
	    const extra = (
	      <Button type='primary' onClick={this.showAdd}>
	        <Icon type='plus'/>
	        添加
	      </Button>
	    )
		return (
			<Card title={title} extra={extra}>
		        <Table
		          bordered
		          rowKey='_id'
		          loading={loading}
		          dataSource={ parentId === '0' ? categories : subCategories}
		          columns={this.columns}
		          pagination={{defaultPageSize: 5, showQuickJumper: true}}//分页器
		        />
		        <Modal
		          title="添加分类"
		          visible={showStatus===1}
		          onOk={this.addCategory}
		          onCancel={this.handleCancel}
		        >
		          <AddForm 
		          categories={categories} 
		          parentId={parentId} 
		          setForm={(form)=>{this.form = form}}
		          />
		        </Modal>
		        <Modal
		          title="更改分类"
		          visible={showStatus===2}
		          onOk={this.updateCategory}
		          onCancel={this.handleCancel}
		        >
		          <UpdateForm categoryName={category.name} setForm={(form)=>this.form = form}/>
		        </Modal>
		     </Card>
		)
	}
}