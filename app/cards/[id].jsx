import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList , StyleSheet} from "react-native";
import { ChevronDownIcon, ChevronUpIcon } from "react-native-heroicons/outline"; // Install heroicons
import { SafeAreaView } from "react-native-safe-area-context";
import { images,icons } from "../../constants";
import { router, useLocalSearchParams } from "expo-router";
import Modal from 'react-native-modal';

const Cards = () => {

  const { id } = useLocalSearchParams();
  const [showEquipment, setShowEquipment] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);

  const [isModalVisible, setModalVisible] = useState(false);

  const handleInfoPress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const data   = [
    { id: "1", name: "How to clean the Play Ground", uri: images.playground, des: "playground"  },
    { id: "2", name: "How to clean the Pool Club", uri: images.poolclub, des: "poolclub" },
    { id: "3", name: "How to clean the Reception", uri: images.reception, des: "reception"   },
    { id: "4", name: "How to clean the Resturent", uri: images.resturent , des: "resturent" },
    { id: "5", name: "How to clean the Room", uri: images.room, des: "rooms"   },
    { id: "6", name: "How to clean the Toilet", uri: images.toilet , des: "toilets"  }
  ];

  
  // Cleanup steps Unble to scrool this
  const List1 = [
    { id: "1", name: "Open windows (if possible) to let fresh air in while cleaning.", image:false},
    { id: "2",name: "Remove used bedding and towels, placing them in the dirty wagon.", image:false},
    { id: "3", name: "Replace linens and make the bed neatly with fresh sheets and pillowcases.", image:true},
    { id: "4",name: "Scrub the sink, toilet, and shower thoroughly. Replace toiletries and towels, and disinfect surfaces." , image:false},
    { id: "5",name: "Dust all surfaces, including furniture, light fixtures, and bed frame.", image:false},
    { id: "6",name: "Vacuum carpets or rugs and mop toilet floors." , image:false},
    { id: "7",name: "Check for missed spots, adjust curtains, and ensure the room smells fresh and inviting." , image:false},
    { id: "8",name: "Update the status in the system, and report any issues or damages.", image:false}
  ];

  const List2 = [
    { id: "1", name: "Cleaning step 1", image:true},
    { id: "2",name: "Cleaning step 2", image:true},
    { id: "3", name: "Cleaning step 3", image:true},
    { id: "4",name: "Cleaning step 4" , image:true},
    { id: "5",name: "Cleaning step 5", image:true},
    { id: "6",name: "Cleaning step 6" , image:true},
  ];

  const getObjectById = (id) => {
    return data.find((item) => item.id === id) || null; // Return null if not found
    
  };

  const getListById = (id) => {

    if(id == "5"){
      return List1;
    }else{
      return List2;
    }
  };


  const result = getObjectById(id);

  const cleanupSteps = getListById(id);



  // List of equipment
  const equipmentList = [
    "Microfiber cleaning cloth",
    "R1 cleaner (Toilet)",
    "R2 cleaner (Surfaces)",
    "Fast cleaner",
    "One roll of sanitary bags",
    "Vacuum cleaner",
  ];


  const toggleStepCompletion = (index) => {
    setCompletedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      
      <View className="flex  px-4 space-y-6">
      <View className="flex justify-between items-center flex-row mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              source={icons.previous}
              resizeMode="contain"
              className="w-8 h-8"
            />
          </TouchableOpacity>
          <View className="flex-1 pl-4">
            <Text className="text-2xl font-psemibold text-white">
              {result.name}
            </Text>
          </View>
      </View>
      

        <View className="flex  items-start flex-row">

          <View className="w-[88px] h-[108px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={result.uri}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="flex-1 pl-2"> 
            <Text className="font-pregular text-m text-gray-100">
            By following these quick and effective steps, you can clean a Maryhill hotel {result.des} in a fast and efficient way, ensuring a spotless environment and an excellent guest experience.
            </Text>
          </View>
        </View>
      <TouchableOpacity
        style={{
          marginTop: 22,
          backgroundColor: "#D4AF37",
          padding: 8,
          borderRadius: 8,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onPress={() => setShowEquipment(!showEquipment)}
      >
        <Text className="font-psemibold text-lg text-black">
        Gather Your Equipment
        </Text>
        {showEquipment ? (
          <ChevronUpIcon size={20} color="#161622" />
        ) : (
          <ChevronDownIcon size={20} color="#161622" />
        )}
      </TouchableOpacity>

      {showEquipment && (
        <View style={{ backgroundColor: "#2A2A34", padding: 8, marginTop: 8, borderRadius: 8 }}>
          {equipmentList.map((item, index) => (
            <View key={index} style={{ backgroundColor: "#161622", padding: 8, borderRadius: 6, marginVertical: 4 }}>
              <Text style={{ fontSize: 16, color: "#9D9D9D" }}>{item}</Text>
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
          <View style={{
            backgroundColor: "#2D2D37",
            marginBottom: 12,
            padding: 12,
            borderRadius: 8,
            flexDirection: "row",
            alignItems: "center",
          }}>
            <TouchableOpacity
              onPress={() => toggleStepCompletion(index)} // Mark item as completed
              
            >
            <Image
              source={completedSteps.includes(index) ? icons.tick : icons.circle}
              className="w-8 h-8 pr-2"
              resizeMode="contain"
            />
              {/* Circular Icon */}

              </TouchableOpacity>
              <View className="flex-1 pr-2"> 
                  <Text
                    style={{
                      color: completedSteps.includes(index) ? "#707070" : "#E0E0E0",
                      fontSize: 17,
                      textDecorationLine: completedSteps.includes(index) ? "line-through" : "none",
                    }}
                  >
                    {item.name}
                  </Text>
              </View>


              {item.image && (
               <TouchableOpacity onPress={handleInfoPress}>
               <Image
                 source={icons.image}
                 className="w-6 h-6"
                 resizeMode="contain"
               />
           </TouchableOpacity>
      )}

            </View>
        )}
      />
      </View>

      <View style={styles.container}>
      {/* Bottom Sheet Modal */}
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={closeModal}
          style={styles.modal}
        >
          <View style={styles.card}>
            {/* Image Section */}
            <Image
              source={images.room} // Replace with your image source
              style={styles.cardImage}
            />

            {/* Text Content */}
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Make the bed nicely</Text>
              <Text style={styles.cardDescription}>
              Replace linens and make the bed neatly with fresh sheets and pillowcases.
              </Text>
            </View>

            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#161622', // Dark background
  },
  infoButton: {
    backgroundColor: '#D4AF37', // Gold button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  infoButtonText: {
    color: '#1F1F2E', // Darker gray text for contrast on the gold button
    fontSize: 16,
    fontWeight: 'bold',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  card: {
    backgroundColor: '#202034', // Slightly lighter shade than the main background
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
    paddingBottom: 20,
  },
  cardImage: {
    width: '100%',
    height: 350, // Adjust height as needed
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white', // Gold color for the title
  },
  cardDescription: {
    fontSize: 14,
    color: '#B8B8D2', // Softer grayish-blue for the description
    lineHeight: 20,
  },
  closeButton: {
    backgroundColor: '#D4AF37', // Muted purple for the button
    marginHorizontal: 16,
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#1F1F2E', // Gold text for the close button
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default Cards;