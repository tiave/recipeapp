import React, { useState } from 'react';
import { StyleSheet,
    Text,
    View,
    TextInput,
    FlatList,
    Image }
from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { Icon } from 'react-native-elements';


export default function Search({ navigation }) {
    const [hakusana, setHakusana] = useState('');
    const [hakuehto, setHakuehto] = useState('ingredient'); //alasvetovalikosta otetaan steittiin
    const [reseptit, setReseptit] = useState([]);

   
    const haeReseptit = () => {
        if (hakuehto === "ingredient") {
            // hae ainesosan perusteella esim. tomato
            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${hakusana}`)
            .then(response => response.json())
            .then((data) => {
            if (data.meals == null) {
                alert("No results");
            } else {
                setReseptit(data.meals)
            }
            })
            .catch(err => console.error("something went wrong"))
        }
        else if (hakuehto === "area") {
            // hae maan perusteella esim. japanese
            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${hakusana}`)
            .then(response => response.json())
            .then((data) => {
            if (data.meals == null) {
                alert("No results");
            } else {
                setReseptit(data.meals)
            }
            })
            .catch(err => console.error("something went wrong"))
        }
        else if (hakuehto === "category") {
            // hae kategorialla esim. dessert
            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${hakusana}`)
            .then(response => response.json())
            .then((data) => {
            if (data.meals == null) {
                alert("No results");
            } else {
                setReseptit(data.meals)
                console.log('kategorian perusteella')
            }
            })
            .catch(err => console.error("something went wrong"))
        }
        else if (hakuehto === "name") {
            // hae nimellä esim. big mac
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${hakusana}`)
            .then(response => response.json())
            .then((data) => {
            if (data.meals == null) {
                alert("No results");
            } else {
                setReseptit(data.meals)
            }
            })
            .catch(err => console.error("something went wrong"))
        }
    }

    const haeRandomResepti = () => {
        fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then(response => response.json())
        .then((data) => {
        if (data.meals == null) {
            alert("No results");
        } else {
            setReseptit(data.meals)
            console.log('random')
        }
        })
        .catch(err => console.error("something went wrong"))
    }
    

    return(
        <View style={styles.container}>
            <Text style={{marginBottom: 10, fontStyle: 'italic', fontSize: 25}}>What would you like to eat?</Text>
            <View style={{marginLeft: 140, marginRight: 80, flexDirection: 'row', justifyContent: 'center'}}>
                <Picker
                selectedValue={hakuehto}
                style={{ height: 50, width: 140 }}
                onValueChange={(itemValue, itemIndex) => setHakuehto(itemValue)} >
                    <Picker.Item label="ingredient" value="ingredient" />
                    <Picker.Item label="area" value="area" />
                    <Picker.Item label="category" value="category" />
                    <Picker.Item label="name" value="name" />
                </Picker>
                <TextInput style={styles.textinput}
                    placeholder="type a keyword"
                    onChangeText={text => setHakusana(text)}
                    value={hakusana}
                />
                <Icon type="material" name="search" color="blue" size={35} onPress={haeReseptit} />
                <Icon type ="material" name="casino" color="blue" size={35} onPress={haeRandomResepti} />
            </View>
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
        </View>
    );
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