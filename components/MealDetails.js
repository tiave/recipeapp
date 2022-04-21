import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';


export default function MealDetails({ route }) {
    const { item } = route.params;
    const [resepti, setResepti] = useState([]);
    const [ainesosaLista, setAinesosaLista] = useState([]);
    
    useFocusEffect(
        useCallback(() => {
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.idMeal}`)
            .then(response => response.json())
                .then((data) => {
                if (data.meals == null) {
                    alert("No results");
                } else {
                    setResepti(data.meals[0])
                    console.log('fetchaa')
                }
            })
            .catch(err => console.log("Error", "something went wrong"))
        }, [item]))


        // pitäisi käynnistyä kun resepti-state päivittynyt
        // nyt käynnistyy 2 kertaa per render
        useEffect(() => {
            aineksetListaksi();
        }, [resepti])

   
        // tehdään ainesosista taulukko
        const aineksetListaksi = () => {
            console.log('listan teossa')
            ainesosaLista.push(resepti.strIngredient1);
            ainesosaLista.push(resepti.strIngredient2);
            //jne
            console.log(ainesosaLista)
        }
   
    return (
        <View>
            <Text>{resepti.strMeal}</Text>
            <Image style={{height: 200, width: 200}} source={{uri: resepti.strMealThumb }}></Image>
            <FlatList>
                data={ainesosaLista}
                keyExtractor={ item => item.id}
                renderItem={({ item }) =>
                    <View>
                        <Text>{item}</Text>
                    </View>
                }
            </FlatList>
            <Text>{resepti.strInstructions}</Text>
        </View>
    );
};