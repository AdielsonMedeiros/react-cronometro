import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';


let timer = null;
let ss= 0;
let mm= 0;
let hh= 0;

export default function App() {

  const [numero, setNumero] = useState ('zerado');
  const [botao, setBotao] = useState ('GO');
  const [ultimo, setultimo] = useState (null);


  function vai(){

    // vai parar o timer
    if(timer !== null){
      clearInterval(timer);
      timer = null;
      setBotao('GO')

    }else{

      //começa a girar o timer
      timer = setInterval(()=>{
        ss++;
        if( ss== 60){
          ss = 0;
          mm++;
        }

        if(mm == 60){

          mm= 0;
          hh++;
        }
        let format = (hh < 10 ? '0' + hh :  hh ) + ':' + (mm < 10 ? '0' + mm : mm) + ':'+ (ss <10 ? '0' + ss : ss)
        setNumero(format)
      }, 1000);
      setBotao ('PARAR')
    }
  }

  function limpar(){
    if(timer !== null){
      //parar timer
      clearInterval(timer)
      timer = null
    }
    setultimo(numero)
    setNumero(0);
    ss= 0;
    mm= 0;
    hh= 0;
    setBotao ('GO')
  }



  return (
    <View style={styles.container}>
      <Image source={require('./src/crono.png')}/>
      <Text style={styles.timer}> {numero} </Text>

        <View style={styles.btnArea}>

          <TouchableOpacity style={styles.btn} onPress={vai}>
            <Text style={styles.btnTexto}>{botao}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={limpar}>
            <Text style={styles.btnTexto}>LIMPAR</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.areaUltima}>
          <Text style={styles.textoCorrida}> {ultimo ? 'Ultimo tempo: ' + ultimo : ''} </Text>
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00aeef'

  },
  timer:{

    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#fff'

  },
  btnArea:{

    flexDirection: 'row',
    marginTop: 130,
    height: 40,

  },
  btn:{

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    margin: 17,
    borderRadius: 10,

  },
  btnTexto:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef'
  },
  areaUltima:{
    marginTop:40,

  },
  textoCorrida:{
    fontSize: 25,
    color: '#FFF',
    fontStyle: 'italic'
  }
});

