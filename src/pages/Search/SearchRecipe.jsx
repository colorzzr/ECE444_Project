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

// https://quaranteam-group3.atlassian.net/browse/CCP-60 and https://quaranteam-group3.atlassian.net/browse/CCP-63
class SearchRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientsTagsList: [],
    };

    this.updateTags = this.updateTags.bind(this);
    this.searchByIngredients = this.searchByIngredients.bind(this);
    this.searchByName = this.searchByName.bind(this);
    this.searchByPantry = this.searchByPantry.bind(this);
  }

  updateTags(inputTags) {
    console.log(inputTags);
    let { ingredientsTagsList } = this.state;
    ingredientsTagsList = inputTags;
    this.setState({
      ingredientsTagsList,
    });
  }

  searchByIngredients() {
    // back end api calls required
    console.log(this.state.ingredientsTagsList);
  }

  searchByName(value) {
    // back end api calls required
    console.log(value);
  }

  searchByPantry() {
    // back end api calls required
    console.log('search by pantry');
  }

  render() {
    return (
      <Tabs defaultActiveKey="1" onChange={changeSearchOption}>
        <TabPane tab="Search Recipe by Ingredients" key="1">
          <Card style={{ width: '40%' }}>
            <PageHeader title="Find a Recipe"></PageHeader>
            <Button onClick={this.searchByIngredients} type="primary" icon={<SearchOutlined />}>
              Search
            </Button>
            <br /> <br />
            <IngredientTag updateIngredientsTagsList={this.updateTags} />
            {/*Need to somehow pass ingredient tag values*/}
          </Card>
        </TabPane>
        <TabPane tab="Search Recipe by Name" key="2">
          <Card style={{ width: '40%' }}>
            <PageHeader title="Find a Recipe"></PageHeader>
            <Search
              placeholder="Enter name or keyword"
              onSearch={this.searchByName}
              enterButton
              style={{ width: '100%', lineHeight: '32px', fontSize: '20px' }}
            />
          </Card>
        </TabPane>
        <TabPane tab="Search Recipe by Pantry Items" key="3">
          <Card style={{ width: '40%' }}>
            <PageHeader
              title="Find a Recipe"
              subTitle={
                <span>Search for recipes based on items available in the virtual pantry</span>
              }
            ></PageHeader>
            <Button onClick={this.searchByPantry} type="primary" icon={<SearchOutlined />}>
              Search
            </Button>
          </Card>
        </TabPane>
      </Tabs>
    );
  }
}

export default SearchRecipe;
