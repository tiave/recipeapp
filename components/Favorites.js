import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';

export default function Profile({navigation}) {
    //const [empty, setEmpty] = useState([]);
    const [suosikit, setSuosikit] = useState([]);
    const db = SQLite.openDatabase('recipes.db');

    useEffect(() => {
        {db.transaction(tx => {
            tx.executeSql('create table if not exists recipe(idMeal integer primary key not null, strMeal text);'
        );  },
        null, updateList);
    }}, [suosikit]);

    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from recipe;', [], (_, { rows }) =>
                setSuosikit(rows._array)
            );
        }, null, null);
    }

    const deleteItem = (idMeal) => {
        db.transaction(tx => {
            tx.executeSql('delete from recipe where idMeal = ?;',
            [idMeal]);
        }, null, updateList);
    };

    return (
        <View style={styles.container}>
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
                    <Icon type="material" color="blue" name="delete-outline" onPress={() => deleteItem(item.idMeal)} />
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