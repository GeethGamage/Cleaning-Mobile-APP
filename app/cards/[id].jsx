import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { ChevronDownIcon, ChevronUpIcon } from "react-native-heroicons/outline"; // Install heroicons
import { SafeAreaView } from "react-native-safe-area-context";
import { images,icons } from "../../constants";
import { router, useLocalSearchParams } from "expo-router";


const Cards = () => {

  const { id } = useLocalSearchParams();
  const [showEquipment, setShowEquipment] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([])

  // List of equipment
  const equipmentList = [
    "microfiber cleaning cloth",
    "all-purpose cleaner",
    "vacuum cleaner or broom and dustpan",
  ];

  // Cleanup steps
  const cleanupSteps = [
    "Remove all dirty dishes, glasses, and utensils from the table and counters",
    "Load the dishwasher or wash dirty dishes by hand",
    "Wipe surfaces: table, chairs, and countertops to eliminate crumbs and spills",
    "Wipe down the stovetop and microwave after use",
    "Sweep or vacuum the floors in the dining and kitchen areas",
  ];

  const toggleStepCompletion = (index) => {
    setCompletedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="flex  px-4 space-y-6">
        <View className="flex justify-between items-start flex-row mb-4">

            <TouchableOpacity
              onPress={() => router.back()}
            >
              <Image
                source={icons.back}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <View className="flex-1 pl-4"> 
              <Text className="text-2xl font-psemibold text-white">
              How to clean the Rooms
              </Text>
            </View>
        </View>

        <View className="flex  items-start flex-row">

          <View className="w-[78px] h-[96px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={images.playground}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="flex-1 pl-2"> 
            <Text className="font-pmedium text-m text-gray-100">
              By following these quick steps, you can maintain a clean and organized kitchen and dining area after breakfast,
              making the rest of your day more enjoyable and efficient!
            </Text>
          </View>
        </View>


     
      <TouchableOpacity
        style={{
          marginTop: 24,
          backgroundColor: "#D4AF37",
          padding: 12,
          borderRadius: 8,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onPress={() => setShowEquipment(!showEquipment)}
      >
        <Text style={{ color: "#161622", fontWeight: "600" }}>Gather your equipment</Text>
        {showEquipment ? (
          <ChevronUpIcon size={20} color="#161622" />
        ) : (
          <ChevronDownIcon size={20} color="#161622" />
        )}
      </TouchableOpacity>

      {showEquipment && (
        <View style={{ backgroundColor: "#2A2A34", padding: 16, marginTop: 12, borderRadius: 8 }}>
          {equipmentList.map((item, index) => (
            <View key={index} style={{ backgroundColor: "#161622", padding: 8, borderRadius: 6, marginVertical: 4 }}>
              <Text style={{ fontSize: 14, color: "grey" }}>{item}</Text>
            </View>
          ))}
        </View>
      )}

      
      
      <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 24, marginBottom: 12, color: "white" }}>
        Cleanup Steps
      </Text>
      <FlatList
        data={cleanupSteps}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => toggleStepCompletion(index)} // Mark item as completed
            style={{
              backgroundColor: "#2D2D37",
              marginBottom: 12,
              padding: 12,
              borderRadius: 8,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/* Circular Icon */}
            <View
              style={{
                width: 20,
                height: 20,
                borderWidth: 2,
                borderColor: completedSteps.includes(index) ? "#D4AF37" : "#8F8F99",
                backgroundColor: completedSteps.includes(index) ? "#D4AF37" : "transparent",
                borderRadius: 10,
                marginRight: 12,
              }}
            />
            <View className="flex-1 pr-2"> 
            <Text
              style={{
                color: completedSteps.includes(index) ? "#707070" : "#8F8F99",
                fontSize: 14,
                textDecorationLine: completedSteps.includes(index) ? "line-through" : "none",
              }}
            >
              {item}
            </Text>
            </View>
          </TouchableOpacity>
        )}
      />
      </View>
    </SafeAreaView>
  );
};

export default Cards;