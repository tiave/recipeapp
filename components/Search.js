import React, { useEffect, useState, useCallback } from 'react';
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
    const [hakuehto, setHakuehto] = useState('ainesosa'); //alasvetovalikosta otetaan steittiin
    const [reseptit, setReseptit] = useState([]);
    const [listaValinta, setListaValinta] = useState('kategoriat'); //alasvetovalikosta otetaan steittiin
    const [kategoriat, setKategoriat] = useState([]);
    const [maat, setMaat] = useState([]);
   
    const haeReseptit = () => {
        if (hakuehto === "ainesosa") {
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
        else if (hakuehto === "maanosa") {
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
        else if (hakuehto === "kategoria") {
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
        else if (hakuehto === "nimi") {
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

   /*  const haeLista = () => {
        if(listaValinta === "kategoriat") {
            fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
                .then(response => response.json())
                .then((data) => {
                if (data.meals == null) {
                    alert("No results");
                } else {
                    setKategoriat(data.meals)
                    console.log('kategorian perusteella')
                }
                })
                .catch(err => console.error("something went wrong"))
        }
        else if(listaValinta === "maat") {
            fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
            .then(response => response.json())
                    .then((data) => {
                    if (data.meals == null) {
                        alert("No results");
                    } else {
                        setMaat(data.meals)
                        console.log('maat')
                        console.log(hakuehto)
                    }
                    })
                    .catch(err => console.error("something went wrong"))
        }
    } */

    return(
        <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Picker
                selectedValue={hakuehto}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => setHakuehto(itemValue)} >
                    <Picker.Item label="ainesosa" value="ainesosa" />
                    <Picker.Item label="maanosa" value="maanosa" />
                    <Picker.Item label="kategoria" value="kategoria" />
                    <Picker.Item label="nimi" value="nimi" />
                </Picker>
                {/* <Picker
                selectedValue={listaValinta}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => setListaValinta(itemValue)} >
                    <Picker.Item label="kategoriat" value="kategoriat" />
                    <Picker.Item label="maat" value="maat" />
                </Picker> */}
                <TextInput
                    style={{ width: 200, borderColor: 'grey', borderWidth: 1}}
                    placeholder="hakusana"
                    onChangeText={text => setHakusana(text)}
                    value={hakusana}
                />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Button title="Hae" onPress={haeReseptit} />
                <Button title="Random" onPress={haeRandomResepti} />
                {/* <Button title="Listaa" onPress={haeLista} /> */}
            </View>
            <View style={{flexDirection: 'row'}}>
                {/* <Text onPress={listaaKategoriat}>categories</Text> */}
                {/* <Text onPress={() => }>areas, </Text>
                <Text onPress={() => }>ingredients </Text> */}
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
            {/* <FlatList style={{width: 80 + '%'}}
                data={kategoriat}
                keyExtractor={item => item.idMeal}
                renderItem={({item}) => 
                <View style={{margin: 10}}>
                    <Text
                        style={{fontSize: 18, fontWeight: 'bold'}}
                        onPress={() => navigation.navigate("FilteredList", { item })}>{item.strCategory}
                    </Text>
                    <Image style={{height: 50, width: 50}} source={{uri: item.strMealThumb}}></Image>
                </View>
                }
            /> */}
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