/**
 * @file 加载更多组件
 * @summary 点击加载更多
 * @author Vania
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const LoadMore = ({ending, onClick}) => (
  ending ? <Button type="dashed" onClick={onClick} size='large'>加载更多</Button> : <h2 style={{color: '#e5e5e5'}}>没有数据</h2>
)

LoadMore.propTypes = {
  ending: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}


export default LoadMore;