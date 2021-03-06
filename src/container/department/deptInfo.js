import React, { Component } from 'react';
import { renderStatus } from 'utils/common';
import api from 'api';
import { Row, Col, Progress } from 'antd';
import { fetchData } from 'utils/tools';
import { Link } from 'react-router';
import DeptSearchForm from 'component/search';
import CircleProgress from 'component/circleProgress';
import LoadMore from 'component/loadMore';
import querystring from 'querystring';

const year = new Date().getFullYear() - 1;

class DeptInfo extends Component {
  state = {
    hospital: [],
    pYear: year,
    loadMore: true,
    page: 1
  }
  componentDidMount = () => {
    this.addHospital();
  }
  addHospital = (query={}, pager) => {
    let { hospital, page, loadMore, pYear } = this.state;
    let postData = {
      pagesize: 20, 
      page: pager || page, 
      fstateType: 1,
      pYear: pYear
    }
    fetchData({
      url: api.SELECT_SCOPE_LIST,
      body: querystring.stringify(Object.assign({}, postData, query)),
      success: data => {
        if (data.status) {
          if (pager) {
            hospital = [];
          }
          loadMore = (hospital.length + data.result.rows.length ) < data.result.records ? true : false; 
          data.result.rows.map(item => hospital.push(item))
          this.setState({hospital: hospital, page: page + 1, loadMore});
        }
      }
    })
  }
  loadMore = () => {
    this.addHospital();
  }
  search = (values) => {
    this.setState({
      pYear: values.pYear
    })
    this.addHospital(values, 1)
  }
  render () {
    const { hospital, pYear } = this.state;
    return (
      <Row style={{padding: 8, minHeight: 480}} span={6} className={'right_content'}>
        <Col span={24} style={{ marginTop: 10}}>
          <DeptSearchForm submit={this.search}/>
        </Col>
        {
          hospital.map((item, index) => 
            <Col span={6} push={2} key={index} style={{marginTop: 10}}>
              <Link to={{pathname: `/department/deptInfo/${item.orgId}`, state: {deptName: item.orgName, pYear}}}>
                <Progress 
                  width={150}
                  type="circle" 
                  percent={Number(`${item.schedule * 100}`)} 
                  status={renderStatus.call(null, Number(`${item.schedule * 100}`))}
                  format={() => <CircleProgress percent={Number(`${item.schedule * 100}`)} title={item.orgName}/>}
                />
              </Link>
            </Col>)
        }
        <Col span={24} style={{textAlign: 'center', marginTop: 40}}>
          <LoadMore ending={this.state.loadMore} onClick={this.loadMore}/>
        </Col>
      </Row>
    )
  }
}

export default DeptInfo;