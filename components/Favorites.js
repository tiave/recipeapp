import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';

export default function Profile({navigation}) {
    //const [empty, setEmpty] = useState([]);
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
        viewTable();
    }

    const deleteItem = (idMeal) => {
        db.transaction(tx => {
            tx.executeSql('delete from recipes where idMeal = ?;',
            [idMeal]);
        }, null, updateList);
    };

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


    return (
        <View>
            <Text style={{marginBottom: 10, fontSize: 25}}>Favourite recipes:</Text>
            <FlatList style={{width: 80 + '%'}}
                data={suosikit}
                keyExtractor={item => item.idMeal.toString()}
                renderItem={({ item }) => 
                <View style={{margin: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text
                        style={{fontSize: 18, fontWeight: 'bold'}}
                        onPress={() => navigation.navigate("MealDetails", { item })}>{item.strMeal}
                    </Text>
                    <Icon type="material" color="red" name="delete" onPress={() => deleteItem(item.idMeal)} />
                </View>
                }
            />
        </View>
    );
};

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