import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';


export default function MealDetails({ route }) {
    const { item } = route.params;
    const [ainesosaLista, setAinesosaLista] = useState([]);

    /* const haeRuoka = () => {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.idMeal}`)
        .then(response => response.json())
            .then((data) => {
            if (data.meals == null) {
                alert("No results");
            } else {
                setReseptit(data.meals)
                aineksetListaksi();
            }
            })
            .catch(err => console.log("Error", "something went wrong"))
    }

    const aineksetListaksi = () => {
        item.strIngredient1 = ainesosaLista.push();

        console.log(ainesosaLista)
    }


    useEffect(() => {
        haeRuoka();
    }, []);
 */
console.log(item.strInstructions)
console.log(item.idMeal)
    return (
        <View>
            <Text>{item.strMeal}</Text>
            <Image style={{height: 200, width: 200}} source={{uri: item.strMealThumb, }}></Image>
            <FlatList>
                data={ item }
                keyExtractor={ item => item.idMeal}
                renderItem={({item}) =>
                    <View>
                        <Text>{item.strIngredient1}</Text>
                    </View>
                }
            </FlatList>
            <Text>{item.strInstructions}</Text>
        </View>
    );
};