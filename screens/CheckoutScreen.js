import React, { useState } from 'react';
import { View, Text, FlatList, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { jsPDF } from 'jspdf';
import * as FileSystem from 'expo-file-system';

// Importar o logo
const logo = require('../assets/foodagile/logo.png'); // Substitua pelo caminho correto da imagem do logo

const CheckoutScreen = ({ route }) => {
  const { cart } = route.params;
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const calculateTotal = () => {
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (paymentMethod === 'card') {
      total += total * 0.01; // Adiciona 1% para pagamento com cartão
    }
    return total.toFixed(2);
  };

  const handlePayment = () => {
    Alert.alert(
      'Pedido Finalizado',
      `Forma de pagamento: ${paymentMethod === 'cash' ? 'Dinheiro' : 'Cartão'}\nTotal: R$ ${calculateTotal()}`
    );
    generatePDF().catch((error) => {
      console.error('Error generating PDF:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao gerar o PDF.');
    });
  };

  const generatePDF = async () => {
    try {
      const doc = new jsPDF();

      // Título
      doc.setFontSize(18);
      doc.text('Resumo do Pedido', 10, 10);

      // Adicionar linhas de produtos
      doc.setFontSize(12);
      cart.forEach((item, index) => {
        doc.text(`${item.name} - ${item.quantity} x R$ ${item.price.toFixed(2)}`, 10, 20 + index * 10);
      });

      // Total
      doc.text(`Total: R$ ${calculateTotal()}`, 10, 30 + cart.length * 10);

      // Forma de pagamento
      doc.text(`Forma de pagamento: ${paymentMethod === 'cash' ? 'Dinheiro' : 'Cartão'}`, 10, 40 + cart.length * 10);

      // Rodapé
      doc.setFontSize(10);
      doc.text('Obrigado pela sua compra!', 10, 290);

      // Gerar PDF em base64
      const pdfBase64 = doc.output('datauristring');
      const uri = FileSystem.documentDirectory + 'pedido.pdf';
      await FileSystem.writeAsStringAsync(uri, pdfBase64.split(',')[1], { encoding: FileSystem.EncodingType.Base64 });

      Alert.alert('Pedido Finalizado', `Resumo do pedido:\n${cart.map(item => `${item.name} - ${item.quantity} x R$ ${item.price.toFixed(2)}`).join('\n')}\nTotal: R$ ${calculateTotal()}\n\nPedido salvo em: ${uri}`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Resumo do Pedido</Text>
      </View>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDetails}>Quantidade: {item.quantity}</Text>
            <Text style={styles.itemDetails}>Preço unitário: R$ {item.price.toFixed(2)}</Text>
          </View>
        )}
      />
      <Text style={styles.total}>Total: R$ {calculateTotal()}</Text>
      <View style={styles.paymentMethods}>
        <TouchableOpacity
          style={[styles.paymentButton, paymentMethod === 'cash' && styles.selectedButton]}
          onPress={() => setPaymentMethod('cash')}
        >
          <Text style={styles.buttonText}>Pagar com Dinheiro</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentButton, paymentMethod === 'card' && styles.selectedButton]}
          onPress={() => setPaymentMethod('card')}
        >
          <Text style={styles.buttonText}>Pagar com Cartão</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.finalizeButton} onPress={handlePayment}>
        <Text style={styles.finalizeButtonText}>Finalizar Pedido</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFDD1',
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
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  itemName: {
    fontSize: 18,
  },
  itemDetails: {
    fontSize: 16,
    color: '#666',
  },
  total: {
    fontSize: 20,
    marginVertical: 20,
    textAlign: 'center',
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  paymentButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  finalizeButton: {
    backgroundColor: '#DD4E50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  finalizeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default CheckoutScreen;
