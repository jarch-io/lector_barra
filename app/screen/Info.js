import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class ScannerBarCode extends React.Component {
  state = {
    producto : null
  };

  componentDidMount() {
    const {navigation} = this.props;

    this.setState({
      producto : navigation.getParam("product")
    });
  }

  render() {
    const { producto } = this.state;

    if(producto == null) {
      return (
        <View>
          <Text>Cargando ...</Text>
        </View>
        );
    }

    return (
        <View style={{padding : 20}}>
          <Text style={styles.title}>NOMBRE : <Text style={styles.text}>{producto.nombreProducto}</Text> </Text>
          <Text style={styles.title}>CATEGORIA : <Text style={styles.text}>{producto.Categoria}</Text> </Text>
          <Text style={styles.title}>MARCA : <Text style={styles.text}>{producto.marca}</Text> </Text>
          <Text style={styles.title}>PRECIO : <Text style={styles.text}>S/ {producto.precioRegularActual.toFixed(2)}</Text> </Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  text: {
    fontWeight: 'normal',
    fontSize : 15
  },
});
