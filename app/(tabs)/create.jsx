import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { icons } from "../../constants";
import { CustomButton, FormField, NumberFormField, CustomDatePicker  } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { createLostAndFound } from "../../lib/appwrite";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [form, setForm] = useState({
    room_no: "",
    item_name:"",
    item_image: null,
    created_date: null,
  });

  const openPicker = async (selectType) => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
  if (permissionResult.granted === false) {
    Alert.alert('Permission required', 'You need to grant camera permission to use this feature.');
    return;
  }

  // Open the camera to take a photo
  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,  // Only allow images
    allowsEditing: true, // Optional: allows editing of the image after capture
    aspect: [4, 3], // Optional: aspect ratio for image
    quality: 1, // Optional: image quality (1 is the highest)
  });
    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          item_image: result.assets[0],
        });
      }
    } else {
      // setTimeout(() => {
      //   Alert.alert("Document picked", JSON.stringify(result, null, 2));
      // }, 100);
    }
  };
 

  const submit = async () => {
    if (
      (form.room_no === "") |
      (form.item_name === "") |
      !form.item_image 
    ) {
      return Alert.alert("Please provide all fields");
    }

    setUploading(true);
    try {
      await createLostAndFound({
        ...form,
        userId: user.$id,
        created_date: selectedDate,
      });

      Alert.alert("Success", "Item submitted successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        room_no: "",
        item_image: null,
        item_name: "",
        created_date: null,
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Report Lost And Found</Text>

        <NumberFormField
          title="Room No"
          value={form.room_no}
          placeholder="Enter room no"
          handleChangeText={(e) => setForm({ ...form, room_no: e })}
          otherStyles="mt-10"
        />

        <FormField
          title="Item Name"
          value={form.item_name}
          placeholder="Enter the name of the lost item"
          handleChangeText={(e) => setForm({ ...form, item_name: e })}
          otherStyles="mt-10"
        />



        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Item Image
          </Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.item_image ? (
              <Image
                source={{ uri: form.item_image.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center">
                   <View className="w-14 h-14 border border-dashed border-secondary flex justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    className="w-10 h-10"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
        <Text className="text-base text-gray-100 font-pmedium">
            Date
          </Text>
          <CustomDatePicker
            onDateChange={(date) => setSelectedDate(date)}
          />
        </View>

        <CustomButton
          title="Submit"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
