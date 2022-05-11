import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, FlatList, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import { ListItem, Icon } from 'react-native-elements';


export default function MealDetails({ route }) {
    const { item } = route.params;
    const [resepti, setResepti] = useState([]);
    const [ainesosaLista, setAinesosaLista] = useState([]);
    const [määrät, setMäärät] = useState([]);
    const [suosikit, setSuosikit] = useState([]);
    
    const db = SQLite.openDatabase('recipes.db');

   useEffect(() =>
        {db.transaction(tx => {
            tx.executeSql('create table if not exists recipes(idMeal integer primary key not null, strMeal text);'
        );  },
        null, updateList);
    }, []);

    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from recipes;', [], (_, { rows }) =>
                setSuosikit(rows._array)
            );
        }, null, null);
    }
    
    const addToFavorites = () => {
        db.transaction(tx => {
        tx.executeSql('insert into recipes(idMeal, strMeal) values (?, ?);',
        [resepti.idMeal, resepti.strMeal]);
        }, null, updateList);
        viewTable();
    };

    //apufunktio jolla tietokantataulu tulostuu konsoliin
    const viewTable = () => {
        db.transaction((tx) => {
            tx.executeSql(
            'SELECT * FROM recipes',
            [],
            (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
                console.log(temp);
                
            }
            );
        });
   
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
            .then(updateList)
            .catch(err => console.log("Error", "something went wrong"))
        }, [item]))


    return (
        <ScrollView>
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 20, marginRight: 15}}>{resepti.strMeal}</Text>
                <Icon type="material" color="red" name="favorite-border" onPress={addToFavorites} />
            </View>
            <Image style={{height: 200, width: 200, alignItems: 'right'}} source={{uri: resepti.strMealThumb }}></Image>
            <Text style={{fontSize: 18}}>Ingredients:</Text>
            <FlatList style={{flex: 1, width: 80 + '%', height: 50 + '%'}}
                data={ainesosaLista}
                extraData={määrät}
                keyExtractor={item => item.index}
                renderItem={({ item, index }) => (
                    <ListItem>
                        <ListItem.Content>
                            <ListItem.Title>{item}</ListItem.Title>
                            <ListItem.Subtitle>{määrät[index]}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                )}/>
            <Text style={{fontSize: 18}}>How to make</Text>
            <Text>{resepti.strInstructions}</Text>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textinput: {
      borderColor: 'grey',
      width: 70 + '%',
      margin: 8
    }
  
  });