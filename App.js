import { useState } from "react";
import {
  Button,
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableHighlight,
  View
} from "react-native";

export default function App() {
  const [items, setItems] = useState(new Map([[1, { id: 1, name: "Leche" }]]));
  const [inputText, setInputText] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const updateProduct = () => {
    if (!inputText || !items.has(selectedProduct.id)) return;

    const newItems = new Map(items);

    newItems.set(selectedProduct.id, { ...selectedProduct, name: inputText });

    setItems(newItems);
    setInputText("");
    setSelectedProduct(null);
  };

  const addProduct = () => {
    if (!inputText || items.has(inputText)) return;
    const newProduct = {
      id: items.size,
      name: inputText
    };

    const newItems = new Map(items);

    newItems.set(newProduct.id, newProduct);

    setItems(newItems);
    setInputText("");
  };

  const removeProduct = (id) => {
    if (!id || !items.has(id)) return;

    const newItems = new Map(items);

    newItems.delete(id);

    setItems(newItems);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Mi Lista de Compra</Text>
      <View>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ingrese su producto..."
          style={styles.input}
          defaultValue={inputText}
        />
        <View style={{ marginHorizontal: 15 }}>
          <Button
            onPress={selectedProduct ? updateProduct : addProduct}
            title={selectedProduct ? "Actualizar" : "Añadir"}
            accessibilityLabel="añadir or actualizar un producto a la lista"
          />
        </View>
        <FlatList
          style={{ margin: 15 }}
          data={Array.from(items.values())}
          renderItem={({ item }) => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 10
              }}>
              <Text>{item.name}</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center"
                }}>
                <TouchableHighlight
                  onPress={(e) => removeProduct(item.id)}
                  style={{
                    backgroundColor: "#f00",
                    padding: 10,
                    marginHorizontal: 5
                  }}>
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold"
                    }}>
                    Eliminar
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => {
                    setSelectedProduct(item);
                    setInputText(item.name);
                  }}
                  style={{
                    backgroundColor: "#00f",
                    padding: 10,
                    marginHorizontal: 5
                  }}>
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Seleccionar
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgrey",
    height: Dimensions.get("screen").height
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    backgroundColor: "#FFC107",
    color: "#555",
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 10
  },
  input: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
    marginVertical: 15,
    marginHorizontal: 15
  }
});
