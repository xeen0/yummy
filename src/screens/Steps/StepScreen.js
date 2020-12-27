import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import {FONTS } from '../../../constants'
const StepScreen = ({route}) => {
  let {steps} = route.params;
  return (
    <ScrollView>
      {steps.map((item, index) => (
        <View  key={index}>
          <Text style={{marginLeft:10,padding:10,...FONTS.h4}}>{index+1}. {item}</Text>
          <Card.Divider />
        </View>
      ))}
    </ScrollView>
  );
};

export default StepScreen;
