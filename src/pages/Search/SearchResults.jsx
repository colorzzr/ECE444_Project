import React, { Component } from 'react';
import { Tabs, PageHeader, Button, Input, Card, Spin, Col, Row } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
const { TabPane } = Tabs;
const { Search } = Input;

import FilterConfig from './FilterConfig.jsx';

import defaultSettings from '../../../config/defaultSettings';
const { api_endpoint } = defaultSettings;

// https://quaranteam-group3.atlassian.net/browse/CCP-74
class SearchResults extends Component {
  state = {
    hasErrors: false,
    isFetching: true,
    recipeList: [],
    fastReadingMode: false,
  };

  componentDidMount() {
    this.setState({ isFetching: true });
    axios.get(api_endpoint + '/v1/recipes/', {}).then((response) => {
      console.log(response);
      this.setState({ recipeList: response['data']['result'], isFetching: false });
    });
  }

  render() {
    // if your component is while fetching shows a loading to the user
    if (this.state.isFetching) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Spin size="large" />
        </div>
      );
    } else {
      var buttonList = [];
      for (let i = 0; i < this.state.recipeList.length; i++) {
        console.log(this.state.recipeList[i].title);
        const recipeDetail = this.state.recipeList[i];
        buttonList.push(
          <div className="site-card-wrapper">
            <Row gutter={16}>
              <Col span={8}>
                <Card
                  hoverable
                  style={{ width: 300 }}
                  cover={
                    <img
                      alt="example"
                      width={300}
                      //height={300}
                      src="https://ww4.publix.com/-/media/aprons/images/2017/01/r0000816_600x440.jpg"
                    />
                  }
                >
                  <Button
                    key={recipeDetail.id}
                    size="large"
                    block
                    href={'/recipe/' + recipeDetail.id}
                  >
                    {recipeDetail.title}
                  </Button>
                </Card>
              </Col>
            </Row>
          </div>,
        );
        buttonList.push(<br key={recipeDetail.id + 'br1'} />);
        buttonList.push(<br key={recipeDetail.id + 'br2'} />);
      }
      return (
        <Card>
          <FilterConfig />
          <PageHeader title="Search Results"></PageHeader>
          {buttonList}
        </Card>
      );
    }
  }
}

export default SearchResults;
