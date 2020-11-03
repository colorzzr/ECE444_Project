import React, { Component } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
const { TabPane } = Tabs;

import defaultSettings from '../../../config/defaultSettings';
const { api_endpoint } = defaultSettings;

function changeSearchOption(key) {
  console.log(key);
}

const SearchOptions = () => (
  <Tabs defaultActiveKey="1" onChange={changeSearchOption}>
    <TabPane tab="Search Recipe by Ingredients" key="1">
      Content of Tab Pane 1
    </TabPane>
    <TabPane tab="Search Recipe by Name" key="2">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Search Recipe by Pantry Items" key="3">
      Content of Tab Pane 3
    </TabPane>
  </Tabs>
);

class SearchRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listItem: [],
    };
  }

  render() {
    return <SearchOptions />;
  }
}

export default SearchRecipe;
