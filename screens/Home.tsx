import React, { useReducer, useState, useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  StyleSheet,
  Switch,
  Button,
} from 'react-native';
import { Appbar, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { useForm, Controller } from 'react-hook-form';
import { booleanLiteral } from '@babel/types';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';


// Getting Dimensions, useful for styling
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function reducer(state, action) {
  switch (action.type) {
    case 'height':
      return { ...state, height: action.value };
    case 'weight':
      return { ...state, weight: action.value };
  }
}

export default function Home({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [state, dispatch] = useReducer(reducer, { height: '', weight: '' });
  const [metricHeight, setMetricHeight] = useState(null);
  const [metricWeight, setMetricWeight] = useState(null);

  // If enabled, Use Metric
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  // Function for Getting saved data from Async Storage
  const getSaved = () => {
    // Breaks app bc of state, Asking if switch is. suitable
    AsyncStorage.getItem('lastUnits').then((value: string) => {
      if (typeof value === 'string') {
        setLastSavedUnits(value);
      }
    });

    // AsyncStorage returns a promise so adding a callback to get the value
    AsyncStorage.getItem('height').then((value: string) => {
      if (typeof value === 'string') {
        setHeight(value);
      }
    });

    // getting an item from storage is always a string
    AsyncStorage.getItem('weight').then((value: string) => {
      {
        if (typeof value === 'string') {
          setWeight(~~value);
        }
      }
    });

    if (weight && height && units)
      console.log('Got saved data: ', weight, height, units);
    return;
  };


  // Function for converting to metric units
  const convertToMetric = () => {
    // Convert to metric Height
    if (state.height) {
      // For PC
      // const footdec: number = parseInt(state.height.replace(/"/g, '').split(`'`)[0],10);
      // const inchdec: number = parseInt(state.height.replace(/"/g, '').split(`'`)[1],10);
      // For Phone 
      const footdec: number = parseInt(state.height.replace(/"/g, '').split(`’`)[0], 10);
      const inchdec: number = parseInt(state.height.replace(/"/g, '').split(`’`)[1], 10);

      const mtcHeight = (footdec + inchdec / 12) / 3.28084;

      console.log(
        'Imperial To Metric Height ',
        state.height,
        footdec,
        'ft',
        inchdec,
        'inches',
        mtcHeight,
        'm'
      );

      if (mtcHeight) {
        setMetricHeight(mtcHeight);
        return state.height;
      }
    }

    if (state.weight) {
      // Convert to metric weight
      const weight: number = parseInt(state.weight, 10);
      const mtcWeight = weight / 2.204623;
      console.log('Imperial To Metric Weight ', weight, 'lbs', mtcWeight, 'kg');
      if (mtcWeight) {
        setMetricWeight(mtcWeight);
        return state.weight;
      }
    }
  };


  // Function for converting to Imperial Units
  const convertToImperial = () => {
    if (metricHeight && !isEnabled) {
      let imperialHeight = metricHeight * 3.28084
      if (imperialHeight) {
        let imperialFeet: number = parseInt(imperialHeight.toString().split('.')[0], 10)
        let imperialInches: number = Math.round((imperialHeight - imperialFeet) * 12)
        let formattedImperial = imperialFeet + `'` + imperialInches
        if (state.height !== formattedImperial) dispatch({ type: 'height', value: formattedImperial });
        console.log('Converting to Imperial Height', metricHeight, ' m to', imperialFeet, 'ft', imperialInches, 'inches is', formattedImperial);
      }
    }

    if (metricWeight && !isEnabled) {
      let imperialWeight = metricWeight * 2.204623
      console.log('Converting to Imperial Weight', metricWeight, ' kg to', imperialWeight, 'lbs');
      if (state.weight !== imperialWeight) dispatch({ type: 'weight', value: imperialWeight.toString() });
    }
  };


  // Fetch/Calculate Data after compenents rendered
  useEffect(() => {
    console.log('UseEffect Running...');
    // First check for Saved Data

    // If no saved data, Validate If inputs
    // let pattern=/^(3-7)$/
    // console.log(pattern.test(state.height))

    if (isEnabled) {
      // Convert Height and Weight to Metric
      console.log('UseEffect converting to Metric');
      convertToMetric();
    } else {
      // Convert Metric Data to Imperial
      console.log('UseEffect converting to Imperial');
      convertToImperial();
    }
  }),
    [isEnabled];

  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Appbar.Header style={styles.header}>
          <Appbar.Content title="Passio RN Code Challenge" />
        </Appbar.Header>
      </TouchableWithoutFeedback>

      <View style={styles.container}>
        <Text style={styles.instructions}>
          Height Weight Calc
        </Text>

        <TextInput
          style={{ fontSize: 22 }}
          placeholder={isEnabled ? '2 m' : `6'7 ft`}
          value={state.height}
          onChangeText={(text) => {
            dispatch({ type: 'height', value: text });
          }}
        />
        <TextInput
          style={{ fontSize: 22 }}
          placeholder={isEnabled ? '190 kg' : '420 lbs'}
          value={state.weight}
          onChangeText={(number) => {
            dispatch({ type: 'weight', value: number });
          }}
        />

        <View style={{ alignItems: 'center' }}>
          <Text style={{ margin: 22, color: 'white' }}>
            Units: {isEnabled ? 'Metric' : 'Imperial'}
          </Text>

          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />

          <Text style={{ fontSize: 22, padding: 10, color: 'white' }}>
            Height: {isEnabled ? metricHeight : state.height}{' '}
            {isEnabled ? 'm' : `ft/inches`}
          </Text>
          <Text style={{ fontSize: 22, color: 'white' }}>
            Weight: {isEnabled ? metricWeight : state.weight}{' '}
            {isEnabled ? `kg` : 'lbs'}
          </Text>
        </View>
        <View style={styles.button}>
          <Button
            color="purple"
            title="Save"
          // onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    // alignItems: 'center',
    // marginTop: '35%',
    // padding: 10,
  },
  header: {
    backgroundColor: 'purple',
    // alignItems: 'center',
  },
  label: {
    color: 'white',
    margin: 10,
    marginLeft: '5%',
  },
  unitText: {
    margin: 10,
    color: 'white',
    marginLeft: 1,
    fontSize: 10,
  },
  instructions: {
    color: 'white',
    // marginTop: '20%',
    paddingHorizontal: '20%',
    padding: 10,
    //marginBottom: '-40%',
  },
  form: {
    // alignItems: 'center',
    marginVertical: '50%',
    padding: -100,
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'none',
    height: 40,
    margin: 2,
    marginLeft: 1,
    borderRadius: 4,
  },
  feild: {
    flexDirection: 'row',
    // flexDirection: 'start',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  dropdownText: {
    color: 'white',
    margin: 10,
    alignSelf: 'center',
  },
  button: {
    marginTop: 20,
    color: 'white',
    height: 40,
    width: windowWidth * 0.5,
    backgroundColor: 'white',
    borderRadius: 4,
    alignSelf: 'center',
  },
  error: {
    color: 'red',
  },
});
