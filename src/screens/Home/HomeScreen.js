import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

import {icons, images, SIZES, COLORS, FONTS} from '../../../constants';
import {  SearchBar } from 'react-native-elements';
export default HomeScreen = ({navigation}) => {
  const categoryData = [
    {
      id: 1,
      name: 'Dessert',
      icon: icons.donut,
    },
    {
      id: 2,
      name: 'Bread',
      icon: icons.hotdog,
    },

    {
      id: 3,
      name: 'Beverages',
      icon: icons.drink,
    },
    {
        id: 4,
        name: 'Rice',
        icon: icons.rice_bowl,
      },
      {
        id: 5,
        name: 'Salad',
        icon: icons.salad,
      },
  ];

  const [categories, setCategories] = React.useState();
  const [selectedCategory, setSelectedCategory] = React.useState();
  const [menu, setMenu] = React.useState();
  const [search,setSearch ] = React.useState('')
//   const URL = 'http://192.168.1.107:3000/';
const URL="https://yummy1server.herokuapp.com/"
 

  useEffect(() => {
    fetch(URL + 'Category')
      .then((response) => response.json())
      .then((responseJson) => {
        setCategories(responseJson);
        
    }).then(()=>setMenu(categories))
      .catch((error) => {
        console.error(error);
      });
  }, []);
  function onSelectCategory(item) {
    let menuList = categories.filter((a) => a.category.includes(item.name));
    setMenu(menuList);
    setSelectedCategory(item);
  }


  const searchFilterFunction = text => {    
    const newData = categories.filter(item => {      
      const itemData = `${item.name.toUpperCase()}`   
      
       const textData = text.toUpperCase();
        
       return itemData.indexOf(textData) > -1;    
    });
    setSearch(text)
    setMenu( newData );  
  };

  
  function renderHeader() {
    return (
        
        <SearchBar        
        placeholder="Search"        
        style={{backgroundColor:"white"}}       
        round        
        onChangeText={text => searchFilterFunction(text)}
        autoCorrect={false}   
        value={search}          
      /> 
        
    )
}

  function renderMainCategories() {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            padding: SIZES.padding,
            // paddingBottom: SIZES.padding * 2,
            backgroundColor:
              selectedCategory?.name === item.name
                ? COLORS.primary
                : COLORS.white,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: SIZES.padding,
            ...styles.shadow,
          }}
          onPress={() => onSelectCategory(item)}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                selectedCategory?.name == item.name
                  ? COLORS.white
                  : COLORS.lightGray,
            }}>
            <Image
              source={item.icon}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
              }}
            />
          </View>

          <Text
            style={{
              marginTop: SIZES.padding,
              color:
                selectedCategory?.id == item.id ? COLORS.white : COLORS.black,
              ...FONTS.body5,
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View >
        <FlatList
          data={categoryData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{paddingVertical: SIZES.padding * 2}}
        />
      </View>
    );
  }

  function renderRestaurantList() {
    const renderItem = ({item}) => {
        return (
      <TouchableOpacity
        style={{marginBottom: SIZES.padding * 2}}
        onPress={() =>
          navigation.navigate('Menu', {
            item : item
          })
        }>
        <View
          style={{
            marginBottom: SIZES.padding,
          }}>
          <Image
            source={{
              uri: item.img,
            }}
            resizeMode="cover"
            style={{
              width: '100%',
              height: 200,
              borderRadius: SIZES.radius,
            }}
          />

          <View
            style={{
              position: 'absolute',
              bottom: 0,
              height: 50,
              width: SIZES.width * 0.3,
              backgroundColor: COLORS.white,
              borderTopRightRadius: SIZES.radius,
              borderBottomLeftRadius: SIZES.radius,
              alignItems: 'center',
              justifyContent: 'center',
              ...styles.shadow,
            }}>
            <Text style={{...FONTS.h4}}>{item.duration}</Text>
          </View>
        </View>

        <Text style={{...FONTS.body2}}>{item.name}</Text>

        <View
          style={{
            marginTop: SIZES.padding,
            flexDirection: 'row',
          }}>
          <Image
            source={icons.star}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.primary,
              marginRight: 10,
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
            }}>
            {item.category.map((m, index) => {
              return (
                <View style={{flexDirection: 'row'}} key={index}>
                  <Text style={{...FONTS.body3}}>{m}</Text>
                  <Text style={{...FONTS.h3, color: COLORS.darkgray}}> . </Text>
                </View>
              );
            })}
          </View>
        </View>
      </TouchableOpacity>
    )
};

    return (
      <FlatList
        data={menu?menu:categories}
        keyExtractor={(item) => `${item._id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 30,
        }}
      />
    );
  }

  return (
    !categories? <Text style={{display:'flex',alignItems:"center" ,justifyContent: 'center' , ...FONTS.h3}}>Loading...</Text> :
        <SafeAreaView style={styles.container}>
        {renderHeader()}
      {renderMainCategories()}
      {renderRestaurantList()}
        
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});
