import React, { useState } from 'react';
import { View, Button, Modal, StyleSheet } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

const SelecionaData = ({onDataSelecionada}) => {
  const [date, setDate] = useState(dayjs());
  const [modalVisible, setModalVisible] = useState(false);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    // study the output but 
    const jsDate = dayjs(selectedDate).toDate();
    onDataSelecionada(jsDate);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Button title="Select Date" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          
          <DateTimePicker
              mode="single"
              date={date}
              initialView="day"
              onChange={ (output) => handleDateChange(output.date)}
          />
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default SelecionaData;