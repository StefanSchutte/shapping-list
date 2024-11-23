import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

interface ItemProps {
    item: { id: number; description: string; quantity: number; packed: boolean };
    onDeleteItem: (id: number) => void;
    onToggleItem: (id: number) => void;
}

export default function Item({ item, onDeleteItem, onToggleItem }: ItemProps): JSX.Element {
    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                onPress={() => onToggleItem(item.id)}
                style={[styles.checkbox, item.packed && styles.packedCheckbox]}
            >
                <Text style={styles.checkboxText}>{item.packed ? '✔' : ''}</Text>
            </TouchableOpacity>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.textScroll}>
                <Text style={[styles.itemText, item.packed && styles.strikethrough]}>
                    {item.description} (x {item.quantity})
                </Text>
            </ScrollView>

            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => onDeleteItem(item.id)}
            >
                <Text style={styles.deleteButtonText}>❌</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
        width: '100%',
    },
    checkbox: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    packedCheckbox: {
        backgroundColor: '#32CD32',
    },
    checkboxText: {
        fontSize: 18,
    },
    textScroll: {
        flex: 1,
    },
    itemText: {
        fontSize: 16,
        color: '#333',
    },
    strikethrough: {
        textDecorationLine: 'line-through',
        color: '#888',
    },

    deleteButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#ff6347',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    deleteButtonText: {
        fontSize: 12,
    },
});