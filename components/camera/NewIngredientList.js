import React, { useEffect, useState } from "react";
import { FlatList, LayoutAnimation } from "react-native";
import NewIngredient from "./NewIngredient";


const NewIngredientList = ({detectedItems}) => {

    const [currItems, setCurrItems] = useState([]);

    const deleteItem = (item) => {
        setCurrItems((prevItems) => prevItems.filter(it => it.name !== item.name))
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    };

    useEffect(() => {
        if(detectedItems.length !== 0) {
            let newItem = detectedItems.pop();
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
            setCurrItems([...currItems, newItem]);
            setTimeout(() => deleteItem(newItem), 5000);
        }
    }, [detectedItems])

    return (
        <FlatList
        contentContainerStyle={{height: 10000}}
        data={currItems}
        keyExtractor={(item) => item.name}
        renderItem={({item}) => <NewIngredient item={item}/>}
        />
    );
};


export default NewIngredientList;