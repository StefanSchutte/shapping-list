import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import PackingList from '@/components/PackingList';
import Stats from '@/components/Stats';
import { SharedStateContext } from './_layout';

export default function Index(): JSX.Element {
    const sharedState = useContext(SharedStateContext);

    if (!sharedState) {
        throw new Error("SharedStateContext is not available");
    }

    const { items, deleteItem, toggleItem, clearItems } = sharedState;

    return (
        <View style={styles.container}>
            <PackingList
                items={items}
                onDeleteItem={deleteItem}
                onToggleItem={toggleItem}
                onClearList={clearItems}
            />
            <Stats items={items} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        padding: 16,
        justifyContent: 'flex-start', // Align items at the top
        alignItems: 'stretch', // Stretch children to fill the width
    },
});