import React, { Component } from 'react';
import { Tabs, PageHeader, Button, Input, Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
const { TabPane } = Tabs;
const { Search } = Input;

import defaultSettings from '../../../config/defaultSettings';
import IngredientTag from './IngredientTag';
const { api_endpoint } = defaultSettings;

function changeSearchOption(key) {
  console.log(key);
}

const onSearch = (value) => console.log(value);

const SearchOptions = () => (
  <Tabs defaultActiveKey="1" onChange={changeSearchOption}>
    <TabPane tab="Search Recipe by Ingredients" key="1">
      <Card style={{ width: '40%' }}>
        <PageHeader title="Find a Recipe"></PageHeader>
        <Button type="primary" icon={<SearchOutlined />}>
          Search
        </Button>
        <IngredientTag />
        {/*Need to somehow pass ingredient tag values*/}
      </Card>
    </TabPane>
    <TabPane tab="Search Recipe by Name" key="2">
      <Card style={{ width: '40%' }}>
        <PageHeader title="Find a Recipe"></PageHeader>
        <Search
          placeholder="Enter name or keyword"
          onSearch={onSearch}
          enterButton
          style={{ width: '100%', lineHeight: '32px', fontSize: '20px' }}
        />
      </Card>
    </TabPane>
    <TabPane tab="Search Recipe by Pantry Items" key="3">
      <Card style={{ width: '40%' }}>
        <PageHeader
          title="Find a Recipe"
          subTitle={<span>Search for recipes based on items available in the virtual pantry</span>}
        ></PageHeader>
        <Button type="primary" icon={<SearchOutlined />}>
          Search
        </Button>
      </Card>
    </TabPane>
  </Tabs>
);

// https://quaranteam-group3.atlassian.net/browse/CCP-60 and https://quaranteam-group3.atlassian.net/browse/CCP-63
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
