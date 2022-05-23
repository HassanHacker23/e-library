import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

import {
  Rajdhani_600SemiBold,
} from '@expo-google-fonts/rajdhani';

import * as Font from "expo-font"

export default class TransactionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domState: "normal",
      hasCameraPermissions: null,
      scanned: false,
      scannedData: "",
      fontLoaded : false
    };
  }
  
  async loadFonts(){
    await Font.loadAsync({Rajdhani_600SemiBold: Rajdhani_600SemiBold})
    this.setState({fontLoaded:true})
  }
  componentDidMount(){
    this.loadFonts()
  }
  getCameraPermissions = async domState => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
      hasCameraPermissions: status === "granted",
      domState: domState,
      scanned: false
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      scannedData: data,
      domState: "normal",
      scanned: true
    });
  };

  render() {
    const { domState, hasCameraPermissions, scannedData, scanned } = this.state;
    if (domState !== "normal") {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }

    /*return (
      <View style={styles.container}>
      <View style={styles.lowerContainer}>
      <View style={styles.Inputcontainer}>
       <TextInput style = {styles.textInput} placeholder = {"Book ID"} placeholderTextColor = {"white"} value = {"Book ID"}>
       <TouchableOpacity
          style={[styles.button, { marginTop: 25 }]}
          onPress={() => this.getCameraPermissions("scanner")}
        >
          <Text style={styles.buttonText}>Scan</Text>
        </TouchableOpacity>
        </TextInput>
      </View>
      <View style={styles.Inputcontainer}>
       <TextInput style = {styles.textInput} placeholder = {"Student ID"} placeholderTextColor = {"white"} value = {"Student ID"}>
       <TouchableOpacity
          style={[styles.button, { marginTop: 25 }]}
          onPress={() => this.getCameraPermissions("scanner")}
        >
          <Text style={styles.buttonText}>Scan</Text>
        </TouchableOpacity>
        </TextInput>
      </View>
      </View>
      </View>
    ); */
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  text: {
    color: "#ffff",
    fontSize: 15
  },
  button: {
    width: "43%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F48D20",
    borderRadius: 15
  },
  buttonText: {
    fontSize: 24,
    color: "#FFFFFF"
  },
  lowerContainer: {flex:.5,alignItems: "center"},
  Inputcontainer : {flexDirection: "row",backgroundColor: "yellow", borderColor: "black", },
  textInput:{width:"57%", height:50, fontFamily:"Rajdhani_600SemiBold",color:"white"}
});
