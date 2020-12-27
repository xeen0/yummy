import React from 'react';
import {View, Text, Image ,ScrollView} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import {FONTS } from '../../../constants'
const ViewIngredientsScreen = ({route}) => {
  let {ingredients} = route.params;
  return (
    <ScrollView>
      {ingredients.ingredients.map((item, index) => (
        <View  key={index}>
          <Text style={{marginLeft:10,padding:10,...FONTS.h2}}>{item}</Text>
          <Card.Divider />
        </View>
      ))}
    </ScrollView>
  );
};

export default ViewIngredientsScreen;
