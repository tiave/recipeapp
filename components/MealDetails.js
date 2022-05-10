import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, FlatList, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import { ListItem, Icon } from 'react-native-elements';


export default function MealDetails({ route }) {
    const { item } = route.params;
    const [resepti, setResepti] = useState([]);
    const reseptiTeksti = JSON.stringify(resepti); //tietokantaan tekstimuodossa?
    const [ainesosaLista, setAinesosaLista] = useState([]);
    const [määrät, setMäärät] = useState([]);
    const [suosikit, setSuosikit] = useState([]);
    // const [empty, setEmpty] = useState([]);
    
    const db = SQLite.openDatabase('recipes.db');

    useEffect(() =>
        {db.transaction(tx => {
            tx.executeSql('create table if not exists recipe(id integer primary key not null, name text);'
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
        tx.executeSql('insert into recipe (id, name) values (?, ?);',
        [resepti.idMeal, resepti.strMeal]);
        }, null, updateList);
        console.log(suosikit)
    };

    const deleteItem = (id) => {
        db.transaction(tx => {
            tx.executeSql('delete from recipe where id = ?;',
            [id]);
        }, null, updateList);
        viewTable();
    };


    const viewTable = () => {
        db.transaction((tx) => {
            tx.executeSql(
            'SELECT * FROM recipe',
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

        //pitäisi saada lähetettyä ajantasainen suosikit-lista profile-komponenttiin

    // TODO: ehdollisuus suosikkinappulaan eli renderöikö "lisää" vai "poista"

    return (
        <ScrollView>
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 18, marginRight: 15}}>{resepti.strMeal}</Text>
                <Icon type="material" color="red" name="favorite-border" onPress={addToFavorites} />
            </View>
            <Button title="delete fav" onPress={() => deleteItem(resepti.idMeal)} />
            <Image style={{height: 200, width: 200}} source={{uri: resepti.strMealThumb }}></Image>
            <Text style={{fontSize: 18}}>Ingredients:</Text>
            <FlatList style={{width: 80 + '%'}}
                data={ainesosaLista}
                extraData={määrät}
                keyExtractor={item => item.index}
                renderItem={({ item, index }) => (
                    <ListItem bottomDivider>
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
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textinput: {
      borderColor: 'grey',
      width: 70 + '%',
      margin: 8
    }
  
  });