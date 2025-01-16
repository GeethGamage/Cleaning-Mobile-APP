
import React from 'react';
import {  View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

const NumberFormField = ({ title,value, onChange, placeholder, handleChangeText, label, otherStyles, errorMessage, ...props }) => {



  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          keyboardType="numeric"  // Ensures the numeric keyboard appears
          {...props}  // Additional props passed to TextInput
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default NumberFormField;
