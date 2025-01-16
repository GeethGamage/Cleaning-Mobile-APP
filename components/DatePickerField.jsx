import React, { useState } from "react";
import { View, Text, Button, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePickerField = ({
  onDateChange
}) => {
  const [date, setDate] = useState(new Date()); // Initialize with the current date

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    if (onDateChange) {
      onDateChange(currentDate);
    }
  };



  return (
    <View>
      {
        <DateTimePicker
        value={new Date()} // Provide a default value if value is empty
        mode="date" // You can use "time" or "datetime" for different modes
        is24Hour={true}
        display="default"
        onChange={(event, selectedDate) => {
          onChange(selectedDate);
        }}
      />
      }
    </View>
  );
};

export default DatePickerField;
