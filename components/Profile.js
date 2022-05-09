import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';


export default function Profile({ props, navigation}) {

    

    return (
        <View>
            <Text>Favourite recipes:</Text>
             <FlatList style={{width: 80 + '%'}}
                data={props.favorites} //miten viitataan
                keyExtractor={item => item.idMeal}
                renderItem={({item}) => 
                <View style={{margin: 10}}>
                    <Text
                        style={{fontSize: 18, fontWeight: 'bold'}}
                        onPress={() => navigation.navigate("MealDetails", { item })}>{item.strMeal}
                    </Text>
                    <Image style={{height: 50, width: 50}} source={{uri: item.strMealThumb}}></Image>
                </View>
                }
            />
        </View>
    );
};