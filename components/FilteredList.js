// tänne tulee esim. kategorialistalta klikattuna dessert -> kaikki dessertit -> täältä taas navilla meal details
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function FilteredList({ route }) {
    const { item } = route.params;
    const [reseptit, setReseptit] = useState([]);

    
    useFocusEffect(
        useCallback(() => {
            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${item.strCategory}`)
                    .then(response => response.json())
                    .then((data) => {
                    if (data.meals == null) {
                        alert("No results");
                    } else {
                        setReseptit(data.meals)
                        console.log(kategoria)
                        console.log('kategorian perusteella')
                    }
                    })
                    .catch(err => console.error("something went wrong"))
                })
            , [item])


    return (
    <FlatList style={{width: 80 + '%'}}
    data={reseptit}
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
    )

}