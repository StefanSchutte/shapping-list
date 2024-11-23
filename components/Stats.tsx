import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatsProps {
    items: { id: number; description: string; quantity: number; packed: boolean }[];
}

export default function Stats({ items }: StatsProps): JSX.Element {
    if (!items.length) {
        return (
            <View style={styles.statsContainer}>
                <Text style={styles.statsText}>
                    <em>Start adding items to your list.</em>
                </Text>
            </View>
        );
    }

    const numItems = items.length;
    const numPacked = items.filter((item) => item.packed).length;
    const percentage = Math.round((numPacked / numItems) * 100);

    return (
        <View style={styles.statsContainer}>
            <Text style={styles.statsText}>
                {percentage === 100
                    ? "You got everything!"
                    : `You have ${numItems} items on your list, and obtained ${numPacked} (${percentage}%)`}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    statsContainer: {
        padding: 16,
        marginTop: 16,
        alignItems: 'center',
    },
    statsText: {
        fontSize: 13,
        color: '#c8c3c3',
        fontStyle: 'italic',
        textAlign: 'center',
    },
});