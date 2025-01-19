import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Modal, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { icons } from "../constants";

const CustomDatePicker = ({onDateChange}) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    if (onDateChange) {
      onDateChange(currentDate);
    }
  };

  return (
    <View className="space-y-2">
      {/* Input Field */}
      <View className="w-full h-12 px-4 flex flex-row items-center  bg-black-100  rounded-2xl border-2 border-black-200">
        <TextInput
          value={date.toDateString()} // Show selected date
          editable={false} // Make input field read-only
          className="text-base mt-0.5 text-place flex-1 font-pregular"
          placeholder="Select Date"
          placeholderTextColor="#CDCDE0"
        />
        {/* Calendar Icon */}
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <Image
            source={icons.calendar}
               className="w-6 h-6"
               style={{ tintColor: "#ffffff" }}
              resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Date Picker Modal */}
      {showPicker && (
        <Modal transparent={true} animationType="fade" visible={showPicker}>
          <View style={styles.modalBackground}>
            <View style={[styles.pickerContainer, { backgroundColor: "rgba(45, 45, 55, 0.8)" }]}>
              {/* Date Picker */}
              <DateTimePicker
                value={date}
                mode="date"
                display="spinner" // Change to 'calendar' or 'default' as needed
                onChange={handleDateChange}
                textColor="white"
                maximumDate={new Date()} // Disable future dates
                style={{ width: "100%" }}
              />

              {/* Close Button */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowPicker(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  pickerContainer: {
    width: "90%",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "black",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "gray",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CustomDatePicker;
