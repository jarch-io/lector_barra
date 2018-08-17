import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class ScannerBarCode extends React.Component {
  state = {
    message : "",
    hasCameraPermission : null,
    isLoading : false
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = ({ type, data }) => {
    const { isLoading } = this.state;
    const { navigate } = this.props.navigation;

    if(!isLoading) {
      this.setState({isLoading : true, message : "Cargando..."});

      fetch("http://50.19.207.136:8098/wadp/HProducto.ashx", {
        method: 'POST',
        headers: {
          //Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "idProducto": data,
            "idTienda": "118"
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({isLoading : false, message : responseJson.data == null ? "El producto no fue encontrado." : ""});
        if(responseJson.data != null) {
          navigate('Info', {product : responseJson.data});
        }
      })
      .catch((err) => {
        this.setState({isLoading : false, message : "Ocurrio un error al conectar con el servidor."});
      });

    }
  }

  render() {
    const { message } = this.state

    return (
      <View style={{padding : 5}}>
        <Text style={{padding : 5}}>
          <Image source={require("../assets/images/bar_code.png")} style={{ width : 40, height : 40 }} /> Scanee el producto
        </Text>
        <View style={{padding : 40, height : 250}}>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
        </View>
        <Text style={{ padding : 10 }}>
          { message }
        </Text>
      </View>
    );
  }
}
