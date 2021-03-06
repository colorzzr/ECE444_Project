import {Avatar, Col, Divider, Image, Layout, List, Rate, Row, Switch, Table, Tag, Typography} from 'antd';
import React from "react";
import {CheckOutlined, CloseOutlined, FieldTimeOutlined, FireOutlined, RocketOutlined} from '@ant-design/icons';
import styles from './RecipeLayout.less'
import NutritionLabel from "../components/NutritionLabel/NutritionLabel";
import constructTag from '../helper_functions/constructTag.jsx';
import CommentSection from "../components/recipeComments/recipeComments";
import convertTime from "../helper_functions/convertTime";

const { Content } = Layout;
const { Title } = Typography;

// Dictionary item used to store color tag mapping or known ingredient tags
const tagColor = {'vegetable': 'green', 'spice': 'red', 'seafood': 'blue', 'oil': 'yellowgreen',
'meat': 'darksalmon', 'condiment': 'orange', 'flour': 'sandybrown',
  'nut': 'brown', 'baking': 'pink','dairy': 'darkorange','pasta': 'gold',
  'protein': 'gold', 'misc.':'lightblue', 'grain': 'peru', 'seasoning': 'firebrick'}

/**
 * This function is used to construct a summary view of a recipe including its rating, difficulty,
 * and prep time needed. This row will be displayed just below each recipe title.
 *
 * @param {number} rating rating of the recipe
 * @param {number} difficulty difficulty level of a recipe
 * @param {number} prepTime Preparation time of the recipe in minutes
 *
 * @return react components for recipe summary part in one row
 */
const recipeSummary = (rating, difficulty, prepTime) => {
  let ratingNum;

  // If no rating is available, just use dash
  if (!rating){
    ratingNum = '-'
  } else{
    ratingNum = Math.round(rating * 10) / 10
  }

  // Calculate difficulty based on prep time
  if (prepTime <= 10){
    difficulty = 1;
  } else if (prepTime <= 30){
    difficulty = 2;
  } else if (prepTime <= 60){
    difficulty = 3;
  } else if (prepTime <= 120){
    difficulty = 4;
  } else{
    difficulty = 5;
  }

  return(
    <Row className={ styles.rowContent } align="bottom">
      {/* Col1: Rating */}
      <Col span={6}>
          <span>
            <Rate disabled value={ Math.round(rating * 10) / 10 } allowHalf={true} />
            <span className={ styles.labelText }>{"Rating: " + ratingNum + "/5"}</span>
          </span>
      </Col>

      {/* Col2: difficulty */}
      <Col span={6}>
          <span>
            <Rate character={ <RocketOutlined /> } disabled defaultValue={ difficulty } allowHalf={true} />
            <span className={ styles.labelText }>{"Difficulty: " + difficulty + "/5"}</span>
          </span>
      </Col>

      {/* Col3: Prep time */}
      <Col span={12}>
          <span className={ styles.labelText } >
            <FieldTimeOutlined />
            <span className={ styles.labelText }>{ "Prep Time: " + convertTime(prepTime) }</span>
          </span>
      </Col>
    </Row>
  );
}

/**
 * This function is used to construct the fast-reading mode switch
 *
 * @param {function} onSwitchChanged callback function used to set state fastReadingMode in Recipe.jsx
 *
 * @return React component for fast-reading mode switch
 */
const fastreadingMode = (onSwitchChanged) => {
  return(
    <Row align="bottom" className={styles.rowContentBody}>
        <span>
            <span className={ styles.labelText } style = {{marginLeft: '0px'}}>Fast-reading Mode</span>
            <Switch
              checkedChildren={ <CheckOutlined /> }
              unCheckedChildren={ <CloseOutlined /> }
              defaultChecked={false}
              style = {{marginBottom: '5px'}}
              onChange={onSwitchChanged}
            />
          </span>
    </Row>
  );
}

/**
 * This function is used to construct a row to display all tags associated with a recipe
 *
 * @param {[string]} recipeTagList A list of strings showing all tags associated with the recipe
 *
 * @return React component for tag row
 */
const recipeTags = (recipeTagList) => {
  return(
    <Row align="bottom" className={ styles.rowContent }>
      <span style = {{marginRight: '8px'}}>{ "Recipe Tags: " }</span>
      <div>
        { constructTag(recipeTagList) }
      </div>
    </Row>
  );
}

/**
 * This function is used to construct a row to display all ingredients in a table and
 * one recipe media content
 *
 * @param {[object]} recipeIngredients A list of strings showing all tags associated with the recipe
 * @param {object} recipeMediaURL A dictionary showing both media type (image or video) and media URL
 * @param {boolean} fastReading A boolean indicating if fast-reading mode has been activated or not
 * @param {number} servings Number of servings per recipe
 *
 * @return React component for ingredient and recipe media content row
 */
const ingredientAndImage = (recipeIngredients, recipeMediaURL, servings, fastReading) => {
  // Preprocess ingredient to add keys
  let preprocessedIngredientInfo = recipeIngredients.map(function(o) {
    o.key = "ingredient-" + recipeIngredients.indexOf(o);
    return o;
  })

  // Column attributes for rendering ingredient table
  const columns = [
    {
      title: 'Ingredient',
      dataIndex: 'name',
      key: 'name',
      render: name => (
        <Typography.Text className={ styles.ingredientName }>{name}</Typography.Text>
      )
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Special Notes',
      dataIndex: 'notes',
      key: 'notes',
    }
  ];

  if (!fastReading){
    columns.push({
      title: 'Tags',
      key: 'type',
      dataIndex: 'type',
      render: type => {
        let color;
        if (type in tagColor) {
          color = tagColor[type];
        } else {
          color = 'volcano'
        }
        return (
          <Tag color={color} key={type}>
            {type.toUpperCase()}
          </Tag>
        );
      }
    });

    return(
      <Row className={ styles.rowContentBody } style = {{margin: '30px 0px'}} align="middle">
        {/* Col1: Ingredients */}
        <Col span={16} >
          <Title level={2}> INGREDIENTS: </Title>
          <span className={ styles.labelText } >
              <FireOutlined />
              <span className={ styles.labelText } style={{marginBottom: '20px'}} >{ "Servings: " + servings }</span>
          </span>
          <Table columns={columns} dataSource={preprocessedIngredientInfo}
                 size="small" pagination={false} style = {{width: '98%'}}/>
        </Col>

        {/* Col2: Recipe image */}
        {/* TODO: Hacking for now, not considering video here */}
        <Col span={8}>
          <div style={{maxHeight: '700px', width: '100%', overflow: 'hidden', textAlign: 'center',
          }}>
            <Image src= { recipeMediaURL.url } style={{verticalAlign: 'middle', maxHeight: '100%', maxWidth: '100%'}}/>
          </div>
        </Col>
      </Row>
    );
  } else {
    return(
      <Row className={ styles.rowContentBody } style = {{margin: '30px 0px'}} align="middle">
        {/* Col1: Ingredients */}
        <Col span={14} >
          <Title level={2}> INGREDIENTS: </Title>
          <span className={ styles.labelText } >
              <FireOutlined />
              <span className={ styles.labelText } style={{marginBottom: '20px'}} >{ "Servings: " + servings }</span>
          </span>
          <Table columns={columns} dataSource={preprocessedIngredientInfo}
                 size="small" pagination={false} style = {{width: '98%'}}/>
        </Col>
      </Row>
    );
  }
}


/**
 * This function is used to construct a List to display all instruction steps of a recipe
 *
 * @param {[object]} recipeInstructionList A list of objects containing information about each recipe step
 * @param {boolean} fastReading A boolean indicating if fast-reading mode has been activated or not
 *
 * @param {[object]} nutritionDetails A json object containing nutrition info of the recipe
 * @param {int} servingSize Integer value specifying serving size of one recipe
 * @return React component for a List
 */
const instructionList = (recipeInstructionList, fastReading, nutritionDetails, servingSize) => {
  const processedList = [];
  for (let i = 0; i < recipeInstructionList.length; i++){
    processedList.push({
      key: 'recipe-instruction-' + i,
      description: 'Step ' + (i + 1) + ': ' + recipeInstructionList[i].description,
      mediaURL: recipeInstructionList[i].mediaURL
    });
  }

  let avatarLink;
  let colWidth;

  if (fastReading) {
    avatarLink = null;
    colWidth = 14;
  } else {
    avatarLink = <Avatar src="https://www.flaticon.com/svg/static/icons/svg/843/843260.svg" />;
    colWidth = 16;
  }
  return(
    <Row className={ styles.rowContentBody } align="top" >
      <Col span={colWidth}>
        <Title level={2}> INSTRUCTIONS: </Title>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={processedList}
          renderItem={item => {
            const imageList = [];
            if ("mediaURL" in item && item.mediaURL[0] != null && !fastReading) {
              for (let i = 0; i < item.mediaURL.length; i++) {
                imageList.push(
                  <Row key={"instruction-photo-" + i}>
                    <img
                      width={260}
                      alt="logo"
                      src={item.mediaURL[i].url}
                    />
                  </Row>);
              }
            }
            return (<List.Item key={item.key} extra={imageList}>
              <List.Item.Meta
                avatar={avatarLink}
                title={item.description}
              />
            </List.Item>)
          }}
        />
      </Col>
      <Col span={2} style={{marginTop: '50px'}}>
        <NutritionLabel nutritionFact={nutritionDetails} servingSize={servingSize}/>
      </Col>
    </Row>
  );
}


/**
 * This function is used to construct a componenet for submitting ratings
 *
 * @param {function} onRatingChanged Callback function used to handle state updates after user submit a rating
 * @param {boolean} ratingSubmitted A boolean indicating if the user has submitted a rating
 *
 * @return React component submitting ratings and give feedback to user

 */
const ratingBar = (onRatingChanged, ratingSubmitted) => (
  <div className={ styles.rowContentBody }>
    <Title level={2} style={{display: 'inline'}}> Give your rating: </Title>
      <span>
        <Rate onChange={onRatingChanged} disabled={ratingSubmitted} />
          {ratingSubmitted ? <span className={ styles.labelText }>Thanks for your feedback!</span> : ''}
        </span>
  </div>
)

/**
 * This function is used to construct a layout of the entire recipe layout page
 *
 * @param {object} recipeDetail A JSON containing all information about the recipe to display
 * @param {boolean} fastReading A boolean indicating if fast-reading mode has been activated or not
 * @param {function} onSwitchChanged callback function used to set state fastReadingMode in Recipe.jsx
 *
 * @param {number} rating A integer value indicating current rating of this recipe
 * @param {function} onRatingChanged Callback function used to handle state updates after user submit a rating
 * @param {boolean} ratingSubmitted A boolean indicating if the user has submitted a rating
 *
 * @param commentData
 * @return Ant design Layout element for the entire recipe detail page
 */
const RecipeLayout = ({ recipeDetail, fastReading,
                        onSwitchChanged, rating, onRatingChanged, ratingSubmitted,
                        commentData}) => {
  console.log(recipeDetail)
  return (
    <Layout className={ styles.recipeLayout }>
      <Content>
        {/* Recipe Title */}
        <Title className={ styles.recipeTitle } style = {{fontSize: '55px'}}>
          { recipeDetail.title.toUpperCase() }
        </Title>

        {/* Divider */}
        <Divider />

        {/* Row 1: Recipe summary (rating, difficulty, prep time) */}
        { recipeSummary(rating, recipeDetail.difficulty, recipeDetail["total time"]) }

        {/* Row 2: Tags associated with a recipe */}
        { recipeTags(recipeDetail.tags) }

        {/* Row 3: Fast-reading mode switch */}
        { fastreadingMode(onSwitchChanged) }

        {/* Row 4: Ingredient and recipe media content */}
        { ingredientAndImage(recipeDetail.ingredients, recipeDetail.mediaURL, recipeDetail.servings, fastReading) }

        {/* Row 5: Instructions and nutrition facts */}
        { instructionList(recipeDetail.instructions, fastReading,
          recipeDetail["nutritional info"], recipeDetail.servings) }

        {/* Row 6: Allow users to give rating */}
        { ratingBar(onRatingChanged, ratingSubmitted) }

        {/* Row 7: Display users' comments */}
        <CommentSection commentData={commentData} recipeID={recipeDetail['_id']}/>

      </Content>
    </Layout>
  );
}


export default RecipeLayout;
