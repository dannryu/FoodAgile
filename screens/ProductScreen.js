import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

// Importar imagens locais
const productImages = {
  '1': require('../assets/foodagile/cafe.jpg'),
  '2': require('../assets/foodagile/suco.jpg'),
  '3': require('../assets/foodagile/hamburguer.jpg'),
  '4': require('../assets/foodagile/frangogrelhado.jpg'),
  '5': require('../assets/foodagile/feijoada.jpg'),
  // Adicione mais produtos conforme necessário
};

const logo = require('../assets/foodagile/logo.png'); // Substitua pelo caminho correto da imagem do logo

const products = [
  { id: '1', name: 'Café', price: 10, image: productImages['1'] },
  { id: '2', name: 'Suco', price: 20, image: productImages['2'] },
  { id: '3', name: 'Hamburguer', price: 39, image: productImages['3'] },
  { id: '4', name: 'Frango Grelhado', price: 45, image: productImages['4'] },
  { id: '5', name: 'Feijoada', price: 50, image: productImages['5'] },
  // Adicione mais produtos conforme necessário
];

const ProductScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    setCart([...cart, { ...product, quantity }]);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.title}>Escolha seu produto</Text>
        </View>
        {products.map((product) => (
          <View key={product.id} style={styles.product}>
            <Image source={product.image} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
              <TextInput
                placeholder="Quantidade"
                keyboardType="numeric"
                value={quantities[product.id]?.toString() || ''}
                onChangeText={(text) => setQuantities({ ...quantities, [product.id]: parseInt(text) || 1 })}
                style={styles.input}
              />
              <TouchableOpacity style={styles.button} onPress={() => handleAddToCart(product)}>
                <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.checkoutButton}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Checkout', { cart })}>
          <Text style={styles.buttonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDD1',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 75,
    height: 75,
    marginRight: 10,
    borderRadius: 100,
  },
  title: {
    fontSize: 24,
    flex: 1,
  },
  product: {
    flexDirection: 'row',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    width: 100,
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#DD4E50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  checkoutButton: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#FFFDD1',
  },
});

export default ProductScreen;
