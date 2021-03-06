/**
 * @file 新增机构
 */
import React, { Component } from 'react';
import { Row, Col, Form, Select, Input, Button, Modal, Cascader,
   BackTop, Upload, Icon, message } from 'antd';
import { formItemLayout } from 'constants';
import { getLocalOption } from 'utils/common';
import { fetchData,CommonData } from 'utils/tools';
import { hashHistory } from 'react-router';
import api from 'api';
const FormItem = Form.Item;
const Option = Select.Option;
/**
 * 注册表单
 */
class RegisterFormWrapper extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
    address: [],
    hospitalLevels: [],
    hospitalPropertys: [],
    hospitalTypes: []
  };
  componentDidMount = () => {
    //fetchData('/js/City.json', {}, data => console.log()'appliction/json')
    fetchData({
      url: api.CITY,
      method: 'get',
      type: 'application/json',
      success: data => this.setState({address: data})
    })
     //机构性质
     CommonData('HOSPITAL_PROPERTY', (data) => {
      console.log(data,"机构性质")
     this.setState({ hospitalPropertys : data})
    })
    //医疗机构类型
    CommonData('HOSPITAL_TYPE', (data) => {
      console.log(data,"机构性质")
     this.setState({ hospitalTypes : data})
    })
    //医院等级
    CommonData('HOSPITAL_LEVEL', (data) => {
       console.log(data,"医院等级")
      this.setState({ hospitalLevels : data})
    })
    
  }
  submitHandler = (e) => {
    e.preventDefault();
    const { form, submit } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err ) {
        if(this.state.fileList.length>0)
        {
          values.tfAccessory = this.state.fileList[0].thumbUrl;
        }
        const address = values.address;
        values.tfProvince = address[0];
        values.tfCity = address[1];
        values.tfDistrict = address[2];
        submit(values);
      } else {
        message.error('请上传附件')
      }
    });
  }
  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  handleCancel = () => this.setState({ previewVisible: false })
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  
  handleChange = ({ fileList }) => this.setState({ fileList })
  render () {
    const { form } = this.props;
    const { previewVisible, previewImage, fileList } = this.state;
    return (
      <Row style={{padding: 8}} className={'right_content'}>
        <Form
          onSubmit={this.submitHandler}
        >
          <FormItem
            label='信息统计时间'
            {...formItemLayout}
          >  
            {form.getFieldDecorator('pYear', {
              rules: [{ required: true, message: '请选择统计时间' }],
            })(
              <Select>
                <Option value={'2015'}>2015</Option>
                <Option value={'2016'}>2016</Option>
                <Option value={'2017'}>2017</Option>
                <Option value={'2018'}>2018</Option>
              </Select>
            )}
          </FormItem> 
          <FormItem
            label='组织机构代码'
            {...formItemLayout}
          >  
            {form.getFieldDecorator('orgCode', {
            })(
              <Input placeholder='请输入组织机构代码'/>
            )}
          </FormItem> 
          <FormItem
            label='上传附件'
            {...formItemLayout}
          >  
            <div className="clearfix">
              <Upload
                action={api.UPLOADPIC}
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
                { fileList.length === 1 ? null :
                  <div>
                    <Icon type="plus" />
                    <div className="ant-upload-text">上传</div>
                  </div>
                }
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </div>
          </FormItem> 
          <FormItem
            label='机构名称'
            {...formItemLayout}
          >  
            {form.getFieldDecorator('orgName', {
              rules: [{ required: true, message: '请输入机构名称' }],
            })(
              <Input placeholder='请输入机构全称'/>
            )}
          </FormItem> 
          <FormItem
            label='机构简称'
            {...formItemLayout}
          >  
            {form.getFieldDecorator('orgAlias', {
              rules: [{ required: true, message: '请输入机构简称' }],
            })(
              <Input placeholder='请输入机构简称'/>
            )}
          </FormItem> 
          <FormItem
            label='机构性质'
            {...formItemLayout}
          >  
            {form.getFieldDecorator('hospitalProperty', {
              rules: [{ required: true, message: '请选择机构性质' }],
            })(
              <Select placeholder="请选择">
                {
                  this.state.hospitalPropertys.map((item,index)=>{
                    return <Option key={index} value={item.TF_CLO_CODE}>{item.TF_CLO_NAME}</Option>
                  })
                }
              </Select>
            )}
          </FormItem> 
          <FormItem
            label='机构地址'
            {...formItemLayout}
          >  
            {form.getFieldDecorator('address', {
              rules: [{ required: true, message: '请选择机构地址' }],
            })(
              <Cascader options={this.state.address} changeOnSelect placeholder="请选择"/>
            )}
          </FormItem> 
          <FormItem
            label='医疗机构类型'
            {...formItemLayout}
            >  
            {form.getFieldDecorator('hospitalType', {
              rules: [{ required: true, message: '请选择医疗机构类型' }],
            })(
              <Select placeholder="请选择">
              {
                this.state.hospitalTypes.map((item,index)=>{
                  return <Option key={index} value={item.TF_CLO_CODE}>{item.TF_CLO_NAME}</Option>
                })
              }
              </Select>
            )}
          </FormItem> 
          <FormItem
            label='医院教学类型'
            {...formItemLayout}
          >  
            {form.getFieldDecorator('hospitalTeaching', {
              rules: [{ required: true, message: '请选择医院教学类型' }],
            })(
              <Select placeholder="请选择">
                {
                  getLocalOption('hospitalTeaching')
                }
              </Select>
            )}
          </FormItem> 
          <FormItem
            label='医院等级'
            {...formItemLayout}
          >  
            {form.getFieldDecorator('hospitalLevel', {
              rules: [{ required: true, message: '请选择等级' }],
            })(
              <Select placeholder="请选择">
              {
                this.state.hospitalLevels.map((item,index)=>{
                  return <Option key={index} value={item.TF_CLO_CODE}>{item.TF_CLO_NAME}</Option>
                })
              }
            </Select>
            )}
          </FormItem> 
          <FormItem
            label='医院编制床位数'
            {...formItemLayout}
          >  
            {form.getFieldDecorator('planBedSum', {
              rules: [{ required: true, message: '请输入医院编制床位数' }],
            })(
              <Input placeholder='请输入数字，例如2000'/>
            )}
          </FormItem> 
          <FormItem
            label='医院开放床位数'
            {...formItemLayout}
          >  
            {form.getFieldDecorator('actualBedSum', {
              rules: [{ required: true, message: '请输入医院开放床位数' }],
            })(
              <Input placeholder='请输入数字，例如2000'/>
            )}
          </FormItem> 
          <FormItem
            label='职工总数'
            {...formItemLayout}
          >  
            {form.getFieldDecorator('staffSum', {
              rules: [{ required: true, message: '请输入职工总数' }],
            })(
              <Input placeholder='请输入数字，例如2000'/>
            )}
          </FormItem> 
          <Col push={24} style={{textAlign: 'center'}}>
            <Button htmlType='submit' type='primary'>提交</Button>
            <Button 
              type="danger" 
              style={{marginLeft: 10}} 
              onClick={() => form.resetFields()}
            >
              重置
            </Button>
          </Col>
        </Form>  
        <BackTop/>
      </Row>
    )
  }
}
const RegisterForm = Form.create()(RegisterFormWrapper);
class OrgAdd extends Component {
  submit = postData => {
    console.log('提交数据:', postData);
    fetchData({
      url: api.ADD_ORG,
      body: JSON.stringify(postData),
      success: data => {
        if (data.status) {
          message.success('操作成功!')
          hashHistory.push('/user/add')
        } else {
          message.error(data.msg);
        }
      },
      type: 'application/json'
    })
  }
  render () {
    return (
      <RegisterForm submit={this.submit}/>
    )
  }
}

export default OrgAdd;