import React, {createContext, useEffect, useState} from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// Define the item type
interface Item {
    id: number;
    description: string;
    quantity: number;
    packed: boolean;
}

interface SharedStateContextProps {
    items: Item[];
    addItem: (item: Item) => void;
    deleteItem: (id: number) => void;
    toggleItem: (id: number) => void;
    clearItems: () => void;
}

export const SharedStateContext = createContext<SharedStateContextProps | null>(null);

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const storageKey = '@packingList:items';
    // Shared state for items
    const [items, setItems] = useState<Item[]>([]);

    // Load items from AsyncStorage when the component mounts
    useEffect(() => {
        (async () => {
            try {
                const storedItems = await AsyncStorage.getItem(storageKey);
                if (storedItems) {
                    setItems(JSON.parse(storedItems));
                }
            } catch (error) {
                console.error('Failed to load items from storage:', error);
            }
        })();
    }, []);

    // Save items to AsyncStorage whenever they change
    useEffect(() => {
        (async () => {
            try {
                await AsyncStorage.setItem(storageKey, JSON.stringify(items));
            } catch (error) {
                console.error('Failed to save items to storage:', error);
            }
        })();
    }, [items]);

    // Handlers
    function handleAddItems(item: Item): void {
        setItems((prevItems) => [...prevItems, item]);
    }

    function handleDeleteItem(id: number): void {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }

    function handleToggleItem(id: number): void {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, packed: !item.packed } : item
            )
        );
    }

    function handleClearList(): void {
        setItems([]);
    }

    const sharedStateValue: SharedStateContextProps = {
        items,
        addItem: handleAddItems,
        deleteItem: handleDeleteItem,
        toggleItem: handleToggleItem,
        clearItems: handleClearList,
    };

    return (
        <SharedStateContext.Provider value={sharedStateValue}>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                    headerShown: useClientOnlyValue(false, true),
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Shapping List',
                        tabBarIcon: ({ color }) => <FontAwesome name="list" color={color} size={24} />,
                    }}
                />
                <Tabs.Screen
                    name="two"
                    options={{
                        title: 'Add Item',
                        tabBarIcon: ({ color }) => <FontAwesome name="plus" color={color} size={24} />,
                    }}
                />
            </Tabs>
        </SharedStateContext.Provider>
    );
}