import React, { useState } from "react";
import { Overlay, ListItem, Text, Button, Divider } from "react-native-elements";
import { View } from "react-native";

const IngredientOverlay = ({ ingredient }) => {

    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => { setVisible(!visible); };

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <ListItem>
            <ListItem.Content>
                <ListItem.Title style={{ fontFamily: 'Montserrat-Bold', fontWeight: 'normal', fontSize: 20 }}>{capitalize(ingredient.key)}</ListItem.Title>
                <ListItem.Subtitle style={{ fontFamily: 'Montserrat-Regular' }}>{ingredient.name}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron onPress={toggleOverlay} />
            <Overlay isVisible={visible}>
                <Text h4 >{ingredient.name}</Text>
                <Divider style={{marginBottom: 10}}/>
                {
                    Object.entries(ingredient).map(([key, value]) => key === 'name' ? null : <View key={key}><Text style={{ fontFamily: 'Montserrat-Bold' }}>{capitalize(key)}: </Text><Text style={{ fontFamily: 'Montserrat-Regular' }}>{capitalize(value)}</Text></View>)
                }
                <Button buttonStyle={{marginTop: 10, backgroundColor: '#ED5c5e'}} title="OK" onPress={toggleOverlay} />
            </Overlay>
        </ListItem>
    );
};

export default IngredientOverlay;