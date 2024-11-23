import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import Form from '@/components/Form';
import { SharedStateContext } from './_layout';
import { useRouter } from 'expo-router';

export default function Two(): JSX.Element {
  const sharedState = useContext(SharedStateContext);
  const router = useRouter(); // Use the router hook

  if (!sharedState) {
    throw new Error("SharedStateContext is not available");
  }

  const { addItem } = sharedState;

  function handleAddItemAndNavigate(item: { description: string; quantity: number; packed: boolean; id: number }) {
    addItem(item); // Add the item to the list
    router.push('/'); // Navigate back to the shopping list tab (index)
  }

  return (
      <View style={styles.container}>
        <Form onAddItems={handleAddItemAndNavigate} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});