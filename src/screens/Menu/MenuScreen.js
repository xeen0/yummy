import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';

import {icons, COLORS, SIZES, FONTS} from '../../../constants';

const Restaurant = ({route, navigation}) => {
  // const URL = 'http://192.168.1.107:3000/Recipe?';
const URL="https://yummy1server.herokuapp.com/Recipe?"


  const scrollX = new Animated.Value(0);
  const [rec, setRec] = React.useState([]);
  React.useEffect(() => {
    let {item} = route.params;
    fetch(URL + 'id1=' + item.menu[0] + '&id2=' + item.menu[1])
      .then((r) => r.json())
      .then((r) => setRec(r));
  },[]);
 
  function renderFoodInfo() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={
            Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},

        )}>
        {rec?.map((item) => {

            return (
          <View key={item._id} style={{alignItems: 'center'}}>
            <View style={{height: SIZES.height * 0.4}}>
              <Image
                source={{
                  uri: item.ImageURI,
                }}
                resizeMode="cover"
                style={{
                  width: SIZES.width,
                  height: '100%',
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 30,
              }}>
              <Image
                source={icons.clock}
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 10,
                }}
              />

              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.darygray,
                }}>
                {item.duration}
              </Text>
            </View>
            {/* Name & Description */}
            <View
              style={{
                width: SIZES.width,
                alignItems: 'center',
                marginTop: 15,
                paddingHorizontal: SIZES.padding * 2,
              }}>
              <Text
                style={{marginVertical: 10, textAlign: 'center', ...FONTS.h1}}>
                {item.name}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
              }}></View>
              <View>
          {renderDots()}
          <View
            style={{
              backgroundColor: COLORS.white,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            }}>
            {/* Order Button */}
            <View
              style={{
                padding: SIZES.padding * 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{
                  width: SIZES.width * 0.9,
                  padding: SIZES.padding,
                  backgroundColor: COLORS.primary,
                  alignItems: 'center',
                  borderRadius: SIZES.radius,
                }}
                onPress={() =>{
                     
                     navigation.navigate('ViewIngredients', {ingredients:item})}}>
                <Text style={{color: COLORS.white, ...FONTS.h2}}>
                  View Ingredients
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                padding: SIZES.padding * 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{
                  width: SIZES.width * 0.9,
                  padding: SIZES.padding,
                  backgroundColor: COLORS.primary,
                  alignItems: 'center',
                  borderRadius: SIZES.radius,
                }}
                onPress={() =>
                  navigation.navigate('Steps', {
                    steps:item.steps
                  })
                }>
                <Text style={{color: COLORS.white, ...FONTS.h2}}>
                  View Steps
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
          </View>
        )})}
      </Animated.ScrollView>
    );
  }

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View style={{height: 30}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: SIZES.padding,
          }}>
          {rec?.map((item, index) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: 'clamp',
            });

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={`dot-${index}`}
                opacity={opacity}
                style={{
                  borderRadius: SIZES.radius,
                  marginHorizontal: 6,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }

  return (
    !rec? <Text style={{display:'flex',alignItems:"center" ,justifyContent: 'center' , ...FONTS.h3}}>Loading...</Text> :
    <SafeAreaView style={styles.container}>
      {renderFoodInfo()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
});

export default Restaurant;
