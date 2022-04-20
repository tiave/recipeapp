import React, { useState } from 'react';
import { StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Picker,
    FlatList,
    Image }
from 'react-native';

 // varmaan joku alasvetovalikko mistä valitsee esim.
    // "raaka-aine" "maa" "ainesosa" "kategoria" tms.
    // sen jälkeen hakusana
    // omat napit "näytä kaikki reseptit" ja "random resepti"
    // maksullinen versio mahdollistaisi myös checkbox-tyyppisen haun usean kriteerin perusteella

export default function Search({ navigation }) {
    const [hakusana, setHakusana] = useState('');
    const [hakuehto, setHakuehto] = useState(''); //alasvetovalikosta otetaan steittiin
    const [reseptit, setReseptit] = useState([]);

    const haeReseptit = () => {
        if (hakuehto === "ainesosa") {
            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${hakusana}`)
            .then(response => response.json())
            .then((data) => {
            if (data.meals == null) {
                alert("No results");
            } else {
                setReseptit(data.meals)
            }
            })
            .catch(err => Alert.alert("Error", "something went wrong"))
        }
        else if (hakuehto === "maanosa") {
            // hae maanosan perusteella
            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${hakusana}`)
            .then(response => response.json())
            .then((data) => {
            if (data.meals == null) {
                alert("No results");
            } else {
                setReseptit(data.meals)
            }
            })
            .catch(err => Alert.alert("Error", "something went wrong"))
        }
        else if (hakuehto === "nimi") {
            // hae nimellä esim. kalapuikko :D
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${hakusana}`)
            .then(response => response.json())
            .then((data) => {
            if (data.meals == null) {
                alert("No results");
            } else {
                setReseptit(data.meals)
            }
            })
            .catch(err => Alert.alert("Error", "something went wrong"))
        }
    }



  /*   const haeAinesosalla = () => {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${hakusana}`)
        .then(response => response.json())
        .then((data) => {
        if (data.meals == null) {
            alert("No results");
        } else {
            setReseptit(data.meals)
        }
        })
        .catch(err => Alert.alert("Error", "something went wrong"))
    } */

    return(
    <View style={styles.container}>
        <Picker
        selectedValue={hakuehto}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setHakuehto(itemValue)} >
            <Picker.Item label="ainesosa" value="ainesosa" />
            <Picker.Item label="maanosa" value="maanosa" />
            <Picker.Item label="nimi" value="nimi" />
        </Picker>
        <TextInput
            style={{ width: 200, borderColor: 'grey', borderWidth: 1}}
            placeholder="hakusana"
            onChangeText={text => setHakusana(text)}
            value={hakusana}
        />
        <Button title="Hae" onPress={haeReseptit} />
        <FlatList
            data={reseptit}
            keyExtractor={item => item.idMeal}
            renderItem={({item}) => 
            <View style={{margin: 10}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}} onPress={() => navigation.navigate("MealDetails", { item })}>{item.strMeal}</Text>
                <Image style={{height: 50, width: 50}} source={{uri: item.strMealThumb }}></Image>
            </View>
            }
        />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
    marginTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});