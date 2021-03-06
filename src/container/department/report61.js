import React, { Component } from 'react';
import _ from 'lodash';
import { Form , Row , Col , Checkbox , Button , message} from 'antd';
import api from 'api';
import { fetchData } from 'utils/tools';
/**
 * @file 2医疗机构基本情况
 */

const FormItem = Form.Item;
const styles={
  container:{
    padding:'40px 80px'
  },
  head:{
    textAlign:'center',
    padding: 8,
    border:'1px solid #dcdcdc'
  },
  formWarp:{
    marginTop:30,
    border:'1px solid #dcdcdc',
    borderColor:'#dcdcdc',
    padding:20,
    marginBottom:30
  }
}
const formItemLayout = {
  labelCol: {
    xs: { span: 0 },
    sm: { span: 0 },
    md: { span: 0 },
    lg: { span: 0 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 24 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 14,
      offset:11,
    },
    md: { 
      span: 14,
      offset:11,
    },
    lg: { 
      span: 14,
      offset:11,
     },
  },
};

class RegistrationForm61 extends React.Component {
  state = {
    confirmDirty: false,
    data: {}
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        //这里的values是json数据。
        let arr = _.cloneDeep(values);
        let a = _.forIn(arr, (value,key)=>{
          if(values[key]){
            arr[key]="01"
          }else{
            arr[key]="00"
          }
        });
        fetchData({
          url: api.ADD_Equipment,
          body: JSON.stringify(a),//querystring.stringify(postData),
          type: 'application/json',
          success: data => {
            if (data.status) {
              message.success('操作成功')
            } else {
              message.error(data.msg);
            }
          }
        })
      }
    });
  }

  componentWillReceiveProps = nextProps => {
    this.setState({
      data: nextProps.formInfo
    })
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { data } = this.state;
    return (
      <div style={styles.container}>
      <h2 style={styles.head}>6.1设备新信息化现状</h2>
      <Form onSubmit={this.handleSubmit}>
        <div style={styles.formWarp}>
        <Row>
          <Col span={4} style={{textAlign: 'center'}}> &nbsp;</Col>
          <Col span={4} style={{textAlign: 'center'}}>设备资产管理</Col>
          <Col span={4} style={{textAlign: 'center'}}>设备采购管理OA</Col>
          <Col span={4} style={{textAlign: 'center'}}>维修/维护/计量等质量管理</Col>
          <Col span={4} style={{textAlign: 'center'}}>设备使用数据分析与应用</Col>
          <Col span={4} style={{textAlign: 'center'}}>成本效益分析</Col>
        </Row>

        <Row>
          <Col span={4} style={{textAlign: 'center', border:'1px'}}>是否建立</Col>
          <Col span={4} style={{textAlign: 'center'}}>
            <FormItem {...formItemLayout}>
              {getFieldDecorator('equipmentManagement', {
                valuePropName: 'checked',
                initialValue: data.equipmentManagement
              })(
                  <Checkbox value={'01'} ></Checkbox>
              )}
            </FormItem>
          </Col>
          <Col span={4} style={{textAlign: 'center'}}>
              <FormItem {...formItemLayout} >
              {getFieldDecorator('equipmentOa', {
                valuePropName: 'checked',
                initialValue: data.equipmentOa
              })(
                  <Checkbox value={'01'} ></Checkbox>
              )}
              </FormItem>
          </Col>
          <Col span={4} style={{textAlign: 'center'}}>
            <FormItem {...formItemLayout} >
            {getFieldDecorator('qcManagement', {
              valuePropName: 'checked',
              initialValue: data.qcManagement
            })(
                <Checkbox value={'01'} ></Checkbox>
            )}
            </FormItem>
          </Col>
          <Col span={4} style={{textAlign: 'center'}}>
            <FormItem {...formItemLayout} >
            {getFieldDecorator('equipmentBi', {
              valuePropName: 'checked',
              initialValue: data.equipmentBi
            })(
                <Checkbox value={'01'} ></Checkbox>
            )}
            </FormItem>
          </Col>
          <Col span={4} style={{textAlign: 'center'}}>
            <FormItem {...formItemLayout} >
            {getFieldDecorator('costAnalysis', {
              valuePropName: 'checked',
              initialValue: data.costAnalysis
            })(
                <Checkbox value={'01'} ></Checkbox>
            )}
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={4} style={{textAlign: 'center', border:'1px'}}>是否属于HRP中模块</Col>
          <Col span={4} style={{textAlign: 'center'}}>
            <FormItem {...formItemLayout}>
              {getFieldDecorator('equipmentManagementHrp', {
                valuePropName: 'checked',
                initialValue: data.equipmentManagementHrp
              })(
                  <Checkbox value={'01'} ></Checkbox>
              )}
            </FormItem>
          </Col>
          <Col span={4} style={{textAlign: 'center'}}>
              <FormItem {...formItemLayout} >
              {getFieldDecorator('equipmentOaHrp', {
                valuePropName: 'checked',
                initialValue: data.equipmentOaHrp
              })(
                  <Checkbox value={'01'} ></Checkbox>
              )}
              </FormItem>
          </Col>
          <Col span={4} style={{textAlign: 'center'}}>
            <FormItem {...formItemLayout} >
            {getFieldDecorator('qcHrp', {
              valuePropName: 'checked',
              initialValue: data.qcHrp
            })(
                <Checkbox value={'01'} ></Checkbox>
            )}
            </FormItem>
          </Col>
          <Col span={4} style={{textAlign: 'center'}}>
            <FormItem {...formItemLayout} >
            {getFieldDecorator('equipmentBiHrp', {
              valuePropName: 'checked',
              initialValue: data.equipmentBiHrp
            })(
                <Checkbox value={'01'} ></Checkbox>
            )}
            </FormItem>
          </Col>
          <Col span={4} style={{textAlign: 'center'}}>
            <FormItem {...formItemLayout} >
            {getFieldDecorator('costAnalysisHrp', {
              valuePropName: 'checked',
              initialValue: data.costAnalysisHrp
            })(
                <Checkbox value={'01'} ></Checkbox>
            )}
            </FormItem>
          </Col>
        </Row>
        </div>
        <Row>
          <FormItem {...tailFormItemLayout} >
            <Button type="primary" htmlType="submit" >保存</Button>
          </FormItem>
        </Row>
      </Form>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm61);

class Report61 extends Component {
    constructor(props){
      super(props);
      this.state = {
        formInfo: {}
      }
    }

    componentWillMount(){
      // 此处应该发出用户信息的请求，获取之前该表格内容回填
      let that = this; 
      fetchData({
        url: api.QUERY_Equipment,
        body: JSON.stringify({}),//querystring.stringify(postData),
        type: 'application/json',
        success: data => {
          if (data.status) {
            //回填数据操作
            var b =  _.forIn(data.result,(value,key)=>{
              if(data.result[key]==="01"){
                data.result[key]=true
              }else{
                delete data.result[key]
              }
            })
            that.setState({
              formInfo:b || {}
            })
          } else {
            message.error(data.msg);
          }  
        }
      })
    }
    render(){
      return(
        <WrappedRegistrationForm formInfo={this.state.formInfo} ></WrappedRegistrationForm>
      )
    }
}

export default Report61;