import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';

export default function Profile({ suosikit }) {
    //const [empty, setEmpty] = useState([]);
    var jsonResepti = JSON.stringify(suosikit);

/* 
    useEffect(() =>
        {db.transaction(tx => {
            tx.executeSql('create table if not exists recipe(id integer primary key not null, content text);'
        );  },
        null, updateList);
    }, []);

    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from recipe;', [],
            (tx, results => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i)
                    temp.push(results.rows.item(i));
            setSuosikit(temp);
            if (results.rows.length >= 1) {
                setEmpty(false);
              } else {
                setEmpty(true)
              }
     
            }
            ));
        });
    }

    const emptyMSG = (status) => {
        return (
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Text style={{ fontSize: 25, textAlign: 'center' }}>
              You have no favorite recipes yet!
            </Text>
          </View>
        );
      } */
      console.log(jsonResepti)

    return (
        <View>
            <Text>Favourite recipes:</Text>
            {/* {empty ? emptyMSG(empty) : */}
            <FlatList style={{width: 80 + '%'}}
                data={jsonResepti}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => 
                <View style={{margin: 10}}>
                    <Text
                        style={{fontSize: 18, fontWeight: 'bold'}}
                        onPress={() => navigation.navigate("MealDetails", { item })}>{item.strMeal}
                    </Text>
                    <Image style={{height: 50, width: 50}} source={{uri: item.strMealThumb}}></Image>
                </View>
                }
            />
            {/* } */}
        </View>
    );
};