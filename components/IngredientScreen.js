import React, { useEffect, useState } from "react";
import { View, Image, ScrollView, } from "react-native";
import { Divider, Header, ListItem, SearchBar, Text, Icon } from "react-native-elements";
import logo from '../logoerecognition.png'
import IngredientOverlay from "./ingredients/IngredientOverlay";

const IngredientScreen = ({ navigation, route}) => {

    const [search, setSearch] = useState('');
    const [ingredients, setIngredients] = useState([])
    const [title, setTitle] = useState([])

    useEffect(() => {
        setTitle(route.params.title);
        route.params.ingredients.sort((a, b) => {
            let fKey = parseInt(a.key.replace('e', ''))
            let sKey = parseInt(b.key.replace('e', ''))
            if(fKey < sKey)
                return -1;
            if(fKey > sKey)
                return 1;
            return 0;
        })
        setIngredients(route.params.ingredients);
    }, [route]);

    const updateSearch = (newValue) => {
        setSearch(newValue);
        setIngredients(route.params.ingredients.filter((element) => element.key.includes(newValue.toLowerCase())))
    };

    const onReturn = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={{backgroundColor: '#FBDEDE',}}>
            <Header
                elevated={true}
                containerStyle={{backgroundColor: '#ed5c5e', height: 90}}
                leftComponent={<Icon name='angle-left' type='font-awesome-5' onPress={onReturn} size={30} color='#393e5e'/>}
                centerComponent={<Image style={{flex: 1, width: 150, height: 150, resizeMode: 'contain'}} source={logo} />}
            />
            <Text style={{
                marginBottom: 20, 
                marginTop: 20, 
                padding: 5,
                textAlign: 'center',
                color: '#393e5e',
                fontFamily: 'Montserrat-Black',
                fontSize: 30}}>{title}</Text>
            <SearchBar
                placeholder="Type Here..." 
                onChangeText={updateSearch} 
                value={search} 
                lightTheme={true}
                platform='android'
                />
            <Divider />
            <ScrollView>
            {ingredients.map(ing => <IngredientOverlay key={ing.key} ingredient={ing}/>)}
            </ScrollView>
        </View>
    );
};

export default IngredientScreen;