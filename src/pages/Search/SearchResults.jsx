import React, { Component } from 'react';
import { Tabs, PageHeader, Button, Input, Card, Spin, Col, Row, Rate } from 'antd';
import { SearchOutlined, RocketOutlined, FieldTimeOutlined } from '@ant-design/icons';
import axios from 'axios';
const { TabPane } = Tabs;
const { Search } = Input;

import styles from '../../layouts/RecipeLayout.less';
import FilterConfig from './FilterConfig.jsx';

import defaultSettings from '../../../config/defaultSettings';
const { api_endpoint } = defaultSettings;

const recipeSummary = (rating, difficulty, prepTime) => {
  return (
    <Col className={styles.rowContent} align="bottom">
      {/* Col1: Rating */}
      <Row span={6}>
        <span>
          <Rate disabled defaultValue={rating} allowHalf={true} />
          <span className={styles.labelText}>{'Rating: ' + rating + '/5'}</span>
        </span>
      </Row>

      {/* Col2: difficulty */}
      <Row span={6}>
        <span>
          <Rate
            character={<RocketOutlined />}
            disabled
            defaultValue={difficulty}
            allowHalf={true}
          />
          <span className={styles.labelText}>{'Difficulty: ' + difficulty + '/5'}</span>
        </span>
      </Row>

      {/* Col3: Prep time */}
      <Row span={12}>
        <span className={styles.labelText}>
          <FieldTimeOutlined />
          <span className={styles.labelText}>{'Prep Time: ' + prepTime}</span>
        </span>
      </Row>
    </Col>
  );
};

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
      // console.log(response);
      this.setState({ recipeList: response['data']['result'], isFetching: false });
    });

    axios.get(api_endpoint + '/v1/recipes/count', {}).then((response) => {
      this.setState({ totalPage: response['data']['result'], isFetching: false });
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
        console.log(this.state.recipeList[i]);
        const recipeDetail = this.state.recipeList[i];
        var img_url = this.state.recipeList[i].image;
        const isLongTag = this.state.recipeList[i].title.length > 35;
        if (img_url == null) {
          img_url =
            'https://ww4.publix.com/-/media/aprons/default/no-image-recipe_600x440.jpg?as=1&w=417&h=306&hash=CA8F7C3BF0B0E87C217D95BF8798D74FA193959C';
        }
        buttonList.push(
          <div className="site-card-wrapper">
            <Row gutter={16}>
              <Col span={8}>
                <Card
                  hoverable
                  style={{ width: 400 }}
                  cover={<img width={272} alt="recipe_image" src={img_url} />}
                >
                  <Button
                    key={recipeDetail.id}
                    size="large"
                    block
                    href={'/recipe/' + recipeDetail.id}
                  >
                    {isLongTag
                      ? `${this.state.recipeList[i].title.slice(0, 35)}...`
                      : this.state.recipeList[i].title}
                  </Button>
                  {/* NEED TO USE REAL DATA */}
                  {recipeSummary(3.5, 3, '20 Minutes')}
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
