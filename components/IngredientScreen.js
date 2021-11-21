import React, { useEffect, useState } from "react";
import { View, Image, } from "react-native";
import { Divider, Header, ListItem, SearchBar, Text, Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from '../logoerecognition.png'

const IngredientScreen = ({ navigation, route}) => {

    const [search, setSearch] = useState('');
    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        setIngredients(route.params.ingredients)
    }, [route]);

    const updateSearch = (newValue) => {
        setSearch(newValue);
    };

    const onReturn = () => {
        navigation.navigate('Home');
    };
    // { icon: 'menu', color: 'blue', iconStyle: { color: '#393e5e' }, onclick={onReturn}}
    return (
        <View style={{backgroundColor: '#FBDEDE',}}>
            <Header
                elevated={true}
                containerStyle={{backgroundColor: '#ed5c5e', height: 90}}
                leftComponent={<Icon name='angle-left' type='font-awesome-5' onPress={onReturn} size={30} color='#393e5e'/>}
                centerComponent={<Image style={{flex: 1, width: 150, height: 150, resizeMode: 'contain'}} source={logo} />}
            />
            <Text h2 style={{
                marginBottom: 20, 
                marginTop: 20, 
                padding: 5,
                textAlign: 'center',
                color: '#393e5e'}}>Detected ingredients</Text>
            <SearchBar
                placeholder="Type Here..." 
                onChangeText={updateSearch} 
                value={search} 
                lightTheme={true}
                platform='android'
                />
            <Divider />
            {ingredients.map(ing => (
                <ListItem key={ing.key}>
                <ListItem.Content>
                    <ListItem.Title h4>{ing.key}</ListItem.Title>
                    <ListItem.Subtitle>{ing.name}</ListItem.Subtitle>
                </ListItem.Content>
                </ListItem>
            ))}
        </View>
    );
};

export default IngredientScreen;