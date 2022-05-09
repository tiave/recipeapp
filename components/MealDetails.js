import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, FlatList, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';


export default function MealDetails({ route }) {
    const { item } = route.params;
    const [resepti, setResepti] = useState([]);
    const reseptiTeksti = resepti.toString(); //tietokantaan tekstimuodossa?
    const [ainesosaLista, setAinesosaLista] = useState([]);
    const [määrät, setMäärät] = useState([]);
    const [suosikit, setSuosikit] = useState([]);
    
    const db = SQLite.openDatabase('recipes.db');

    useEffect(() =>
        {db.transaction(tx => {
            tx.executeSql('create table if not exists recipe(id integer primary key not null, content text);'
        );  },
        null, updateList);
    }, []);

    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from recipe;', [], (_, { rows }) =>
            setSuosikit(rows._array)
            );
        }, null, null);
    }

    const addToFavorites = () => {
        db.transaction(tx => {
        tx.executeSql('insert into recipe (content) values (?);'
        ,  [reseptiTeksti]);
        }, null, updateList);
        console.log('tallennettu')
        console.log(suosikit)
    }


    useFocusEffect(
        useCallback(() => {
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.idMeal}`)
            .then(response => response.json())
            .then((data) => {
                if (data.meals == null) {
                    alert("No results");
                } else {
                    console.log('fetchaa')
                    setResepti(data.meals[0])
                    setAinesosaLista([
                        data.meals[0].strIngredient1,
                        data.meals[0].strIngredient2,
                        data.meals[0].strIngredient3,
                        data.meals[0].strIngredient4,
                        data.meals[0].strIngredient5,
                        data.meals[0].strIngredient6,
                        data.meals[0].strIngredient7,
                        data.meals[0].strIngredient8,
                        data.meals[0].strIngredient9,
                        data.meals[0].strIngredient10,
                        data.meals[0].strIngredient11,
                        data.meals[0].strIngredient12,
                        data.meals[0].strIngredient13,
                        data.meals[0].strIngredient14,
                        data.meals[0].strIngredient15,

                    ])
                    setMäärät([
                        data.meals[0].strMeasure1,
                        data.meals[0].strMeasure2,
                        data.meals[0].strMeasure3,
                        data.meals[0].strMeasure4,
                        data.meals[0].strMeasure5,
                        data.meals[0].strMeasure6,
                        data.meals[0].strMeasure7,
                        data.meals[0].strMeasure8,
                        data.meals[0].strMeasure9,
                        data.meals[0].strMeasure10,
                        data.meals[0].strMeasure11,
                        data.meals[0].strMeasure12,
                        data.meals[0].strMeasure13,
                        data.meals[0].strMeasure14,
                        data.meals[0].strMeasure15,

                    ])
                }
            })
            .catch(err => console.log("Error", "something went wrong"))
            console.log(item.idMeal)
        }, [item]))


        //pitäisi saada lähetettyä ajantasainen suosikit-lista profile-komponenttiin

    // TODO: ehdollisuus suosikkinappulaan eli renderöikö "lisää" vai "poista"

    return (
        <ScrollView>
            <Text style={{fontSize: 18}}>{resepti.strMeal}</Text>
            <Button title="add to favorites" onPress={addToFavorites} />
            <Image style={{height: 200, width: 200}} source={{uri: resepti.strMealThumb }}></Image>
            <Text style={{fontSize: 18}}>Ingredients:</Text>
            <FlatList style={{width: 80 + '%'}}
                data={ainesosaLista}
                extraData={määrät}
                keyExtractor={item => item.index}
                renderItem={({ item, index }) => (
                    <View>
                        <Text>{item}, {määrät[index]}</Text>
                    </View>
                )}/>
            <Text style={{fontSize: 18}}>How to make</Text>
            <Text>{resepti.strInstructions}</Text>
        </ScrollView>
    )

}