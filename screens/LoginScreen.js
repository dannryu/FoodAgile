import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Simulated authentication
    const validUsername = 'admin';
    const validPassword = '1234';

    if (username === validUsername && password === validPassword) {
      navigation.navigate('Products');
    } else {
      Alert.alert('Erro', 'Nome de usuário ou senha inválidos');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/foodagile/logo.png')} style={styles.logo} />
      
      <TextInput
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFDD1', // Altere a cor de fundo aqui
  },
  logo: {
    width: 200, // Ajuste o tamanho conforme necessário
    height: 200, // Ajuste o tamanho conforme necessário
    marginBottom: 20,
    borderRadius: 100,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#DD4E50', // Cor de fundo do botão
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    elevation: 2, // Sombra do botão (Android)
    shadowColor: '#000', // Cor da sombra (iOS)
    shadowOffset: { width: 0, height: 2 }, // Offset da sombra (iOS)
    shadowOpacity: 0.2, // Opacidade da sombra (iOS)
    shadowRadius: 3, // Raio da sombra (iOS)
    marginTop: 20,
  },
  buttonText: {
    color: '#fff', // Cor do texto do botão
    fontSize: 20,
    textAlign: 'center',
  },
});

export default LoginScreen;
