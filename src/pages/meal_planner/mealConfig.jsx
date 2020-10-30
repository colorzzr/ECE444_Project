import React, { PureComponent } from 'react';
import { Form, Button, Select, DatePicker, Switch, Checkbox, Row, Col, Modal } from 'antd';
import { recipes } from '../../../recipes/recipes.js';

const { Option } = Select;
const { RangePicker } = DatePicker;

{
  /* Setup for recipe select list */
}
const recipeList = [];
for (let i = 0; i < Object.keys(recipes).length; i++) {
  recipeList.push(
    <Option key={i} value={i}>
      {recipes[i].title}
    </Option>,
  );
}

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

// https://quaranteam-group3.atlassian.net/browse/CCP-6
class MealConfig extends PureComponent {
  /* For Modal View */

  state = { visible: false };

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
  }

  onChange(value) {
    console.log(`selected ${value}`);
  }


  closeForm(e){
    console.log(e);
    this.setState({
      visible: false,
    });
  };


  onFinish(values) {
    console.log('Success:', values);
    // update the name of attribute later
    var recipe_id = values['recipe'];
    var select_recipe_title = recipes[recipe_id].title
    console.log(recipes[recipe_id])

    var meal = values['meal-time-picker'];
    // const days_to_int = {"monday":1,"tuesday":2,"wednesday":3,"thursday":4,"friday":5,"saturday":6,"sunday":7}
    var days = values['checkbox-group'];

    //close the modal
    this.setState({
      visible: false,
    });

    const { newItemFunc } = this.props;
    newItemFunc({'title':select_recipe_title, 'id':recipe_id}, meal, days);
  }

  render() {
    return (
      /* Modal view */
      <>
        <Button type="primary" onClick={this.showModal}>
          Add Meal
        </Button>
        <Modal
          title="Meal Configuration"
          visible={this.state.visible}
          // onOk={this.handleOk}
          onCancel={this.closeForm}
        >
          {/* Select Recipe */}
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
            preserve={false}
          >
            <Form.Item
              label="Select Recipe"
              name="recipe"
              rules={[
                {
                  required: true,
                  message: 'Please choose a recipe',
                },
              ]}
            >
              <Select onChange={this.onChange} style={{ width: '100%' }} placeholder="e.g. Tomato Soup">
                {recipeList}
              </Select>
            </Form.Item>

            {/* Select days of the week */}
            <Form.Item
              name="checkbox-group"
              label="Day(s) of the week"
              rules={[
                {
                  required: true,
                  message: 'Please select at least one day',
                },
              ]}
            >
              <Checkbox.Group>
                <Row>
                  <Col span={8}>
                    <Checkbox
                      value="sunday"
                      style={{
                        lineHeight: '32px',
                      }}
                    >
                      Sunday
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox
                      value="monday"
                      style={{
                        lineHeight: '32px',
                      }}
                    >
                      Monday
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox
                      value="tuesday"
                      style={{
                        lineHeight: '32px',
                      }}
                    >
                      Tuesday
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox
                      value="wednesday"
                      style={{
                        lineHeight: '32px',
                      }}
                    >
                      Wednesday
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox
                      value="thursday"
                      style={{
                        lineHeight: '32px',
                      }}
                    >
                      Thursday
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox
                      value="friday"
                      style={{
                        lineHeight: '32px',
                      }}
                    >
                      Friday
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox
                      value="saturday"
                      style={{
                        lineHeight: '32px',
                      }}
                    >
                      Saturday
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>

            {/* Select Meal Time */}
            <Form.Item
              name="meal-time-picker"
              label="Meal Time"
              rules={[
                {
                  required: true,
                  message: 'Please select a meal time',
                },
              ]}
            >
              <Select placeholder="e.g. Breakfast">
                <Select.Option value="Breakfast">Breakfast</Select.Option>
                <Select.Option value="Lunch">Lunch</Select.Option>
                <Select.Option value="Dinner">Dinner</Select.Option>
              </Select>
            </Form.Item>

            {/* Select duration */}
            <Form.Item name="range-picker" label="Duration of Meal" {...rangeConfig}>
              <RangePicker />
            </Form.Item>

            {/* Switch to enable/disable notifications*/}
            <Form.Item name="noifications" label="Enable Notifications" valuePropName="checked">
              <Switch />
            </Form.Item>

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

export default MealConfig;