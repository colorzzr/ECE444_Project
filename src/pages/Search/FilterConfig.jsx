import React, { PureComponent } from 'react';
import {
  Form,
  Button,
  Select,
  DatePicker,
  Input,
  Checkbox,
  Row,
  Col,
  Modal,
  Typography,
  InputNumber,
} from 'antd';
import { recipes } from '../../../recipes/recipes.js';
import axios from 'axios';

const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
import IngredientTag from './IngredientTag';
import defaultSettings from '../../../config/defaultSettings';
const { api_endpoint } = defaultSettings;

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

const validateMessages = {
  required: 'Input is required!',
  types: {
    number: 'Input is not a validate number!',
  },
  number: {
    range: 'Input must be greater than ${min}',
  },
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
    this.updateTags = this.updateTags.bind(this);

    // console.log(newItemFunc)
    this.state = {
      visible: false,
      ingredientsTagsList: [],
      calorieLimit: -1,
      timeLimit: -1,
    };
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
    newItemFunc(tags, meal, days);
  }

  updateTags(inputTags) {
    console.log(inputTags);
    let { ingredientsTagsList } = this.state;
    ingredientsTagsList = inputTags;
    this.setState({
      ingredientsTagsList,
    });
  }

  render() {
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
              remember: false,
            }}
            onFinish={this.onFinish}
            preserve={false}
          >
            {/* Ingredient Exclude input tags */}
            <Form.Item>
              <Title level={5}>Enter ingredients to EXCLUDE from search results: </Title>
              <IngredientTag updateIngredientsTagsList={this.updateTags} />{' '}
              {/*Need to somehow pass ingredient tag values*/}
            </Form.Item>

            {/* Calorie per serving limit */}
            <Title level={5}>Enter a Calorie limit per serving: </Title>
            <Form.Item>
              <Form.Item name="calorieLimit" noStyle>
                <InputNumber min={0} />
              </Form.Item>
            </Form.Item>

            {/* Time limit */}
            <Title level={5}>Enter a Meal Preparation Time Limit(mins): </Title>
            <Form.Item>
              <Form.Item name="timeLimit" noStyle>
                <InputNumber min={0} />
              </Form.Item>
            </Form.Item>

            {/* Save button */}
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Go
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default FilterConfig;
