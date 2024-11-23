import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Item from './Item';

interface PackingListProps {
    items: { id: number; description: string; quantity: number; packed: boolean }[];
    onDeleteItem: (id: number) => void;
    onToggleItem: (id: number) => void;
    onClearList: () => void;
}

export default function PackingList({
                                        items,
                                        onDeleteItem,
                                        onToggleItem,
                                        onClearList,
                                    }: PackingListProps): JSX.Element {
    const [sortBy, setSortBy] = useState<string>('input');

    let sortedItems = items;

    if (sortBy === 'description') {
        sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
    }

    if (sortBy === 'packed') {
        sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));
    }

    return (
        <View style={styles.listContainer}>
            <FlatList
                data={sortedItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Item
                        item={item}
                        onDeleteItem={onDeleteItem}
                        onToggleItem={onToggleItem}
                    />
                )}
                contentContainerStyle={styles.list}
            />
            <View style={styles.actions}>
                <RNPickerSelect
                    onValueChange={(value) => setSortBy(value)}
                    value={sortBy}
                    style={{
                        inputIOS: styles.picker,
                        inputAndroid: styles.picker,
                    }}
                    items={[
                        { label: 'Sort by input order', value: 'input' },
                        { label: 'Sort by description', value: 'description' },
                        { label: 'Sort by status', value: 'packed' },
                    ]}
                />
                <TouchableOpacity onPress={onClearList} style={styles.clearButton}>
                    <Text style={styles.clearButtonText}>Clear list</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        padding: 24,
        backgroundColor: '#979494',
        flex: 1,
        borderRadius: 8,
        boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)',
    },
    list: {
        marginBottom: 16,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    picker: {
        flex: 1,
        height: 50,
        marginRight: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff',
    },
    clearButton: {
        backgroundColor: '#ff6347',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    clearButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});