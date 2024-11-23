import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

interface FormProps {
    onAddItems: (item: { description: string; quantity: number; packed: boolean; id: number }) => void;
}

export default function Form({ onAddItems }: FormProps): JSX.Element {
    const [description, setDescription] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);

    function handleSubmit(): void {
        if (!description) return;

        const newItem = { description, quantity, packed: false, id: Date.now() };

        onAddItems(newItem);

        setDescription("");
        setQuantity(1);
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputs}>
                <Text style={styles.headerText}>Item:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Type Item ..."
                    value={description}
                    onChangeText={setDescription}
                />
                <Text style={styles.headerText}>Amount:</Text>
                <RNPickerSelect
                    onValueChange={(value) => setQuantity(value)}
                    items={Array.from({ length: 20 }, (_, i) => ({
                        label: String(i + 1),
                        value: i + 1,
                    }))}
                    placeholder={{ label: "Select a quantity", value: null }}
                    value={quantity}
                    style={{
                        inputAndroid: styles.pickerInput,
                        inputIOS: styles.pickerInput,
                        placeholder: { color: "#999" },
                    }}
                />
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button title="Add" onPress={handleSubmit} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 32,
        backgroundColor: "#979494",
        borderRadius: 8,
        boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
        minHeight: 250,
        justifyContent: "center",
    },
    header: {
        marginBottom: 16,
    },
    headerText: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "left",
    },
    inputs: {
        marginBottom: 16,
    },
    pickerInput: {
        height: 80, // Make height consistent
        borderColor: "#ccc",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        marginBottom: 12,
    },
    input: {
        height: 40, // Make height consistent
        backgroundColor: "#fff",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        marginBottom: 12,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
        width: "100%",
    },
    button: {
        width: "50%",
        borderRadius: 5,
        backgroundColor: "#007bff",
    },
});