import React, { PureComponent } from 'react';
import { Form, Button, Select, DatePicker, Switch, Checkbox, Row, Col, Modal } from 'antd';
import { recipes } from '../../../recipes/recipes.js';
import axios from 'axios';

const { Option } = Select;
const { RangePicker } = DatePicker;

import defaultSettings from '../../../config/defaultSettings';
const { api_endpoint } = defaultSettings;

// {
//   /* Setup for recipe select list */
// }
// const recipeList = [];
// for (let i = 0; i < Object.keys(recipes).length; i++) {
//   recipeList.push(
//     <Option key={i} value={i}>
//       {recipes[i].title}
//     </Option>,
//   );
// }

{
  /* Formatting */
}
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const rangeConfig = {
  rules: [
    {
      type: 'array',
      required: true,
      message: 'Please select time',
    },
  ],
};

// https://quaranteam-group3.atlassian.net/browse/CCP-36
class FilterConfig extends PureComponent {
  /* For Modal View */

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  /* Need to add ability to hit ok, but with save config*/
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  constructor(props) {
    super(props);

    const { newItemFunc } = this.props;

    this.onFinish = this.onFinish.bind(this);
    this.closeForm = this.closeForm.bind(this);

    // console.log(newItemFunc)
    this.state = {
      visible: false,
      recipes: [],
    };
  }

  // after the component is rendered
  componentDidMount() {
    axios
      .get(api_endpoint + 'v1/recipes/', {
        'Access-Control-Allow-Origin': '*',
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response['data']['result'])
        this.setState({
          recipes: response['data']['result'],
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChange(value) {
    console.log(`selected ${value}`);
  }

  closeForm(e) {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  onFinish(values) {
    console.log('Success:', values);
    const { recipes } = this.state;

    // update the name of attribute later
    var recipe_id = values['recipe'];
    var rp = recipes[recipe_id];
    console.log(rp);

    //close the modal
    this.setState({
      visible: false,
    });

    const { newItemFunc } = this.props;
    newItemFunc(rp, meal, days);
  }

  render() {
    // start to prepare the drop down
    const { recipes } = this.state;
    var recipeList = [];
    for (let i = 0; i < recipes.length; i++) {
      recipeList.push(
        <Option key={i} value={i}>
          {recipes[i].title}
        </Option>,
      );
    }

    return (
      /* Modal view */
      <>
        <Button type="primary" onClick={this.showModal}>
          Add Filter
        </Button>
        <Modal
          title="Filter Configuration"
          visible={this.state.visible}
          // onOk={this.handleOk}
          footer={null}
          onCancel={this.closeForm}
        >
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
            preserve={false}
          >
            {/* Save button */}
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default FilterConfig;
