import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Modal, StyleSheet, Image, ScrollView } from 'react-native';
import { images,icons } from "../../constants";



const passLists = {
  pass1: {
    title: "General Cleaning",
    instructions: [
      "5:30–6:30: Clean entrance halls and public toilets at 261.",
      "6:30–7:00: Operate the floor scrubbers in the restaurant.",
      "7:00–8:00: Playground (with bar) + 2 public toilets in the playground.",
      "8:00–8:15: Dust in the pool club.",
      "8:15–8:45: Breakfast.",
      "8:45–11:00: Clean luggage area + passage and stairs to 281.",
      "8:45–11:00: Clean corridor at reception to 151 + stairs (288) and service elevator.",
      "8:45–/11:00: Clean corridor 101–118, stairs, and elevator.",
      "8:45–11:00: Fold napkins.",
      "10:30–11:00–11:30: Vacuum the restaurant SC.",
      "11:00-11:30: Check all public toilets SC, MAM, HH. Check over gym.",
      "11:30/12:00–13:00/13:30: Extra tasks / fold napkins.",
      "13:00-13:30: Check all public toilets SC, MAM, HH. Check over gym.",
      "13:00–14:00: Fold napkins.",
      "14:00–14:30: Lunch.",
    ],
  },
  pass2: {
    title: "Public area and room cleaning",
    instructions: [
      "5:30–7:00: Clean ½ of the restaurant on the lower floor.",
      "7:00–7:30: Operate the floor scrubbers in the pool club.",
      "7:30–8:00: Clean the elderly relaxation area.",
      "8:00–8:15: Clean passageways.",
      "8:15–8:45: Breakfast.",
      "8:45–9:00: Briefing.",
      "9:00–14:00: Room cleaning.",
      "14:00–14:30: Lunch.",
    ],
  },
  pass3: {
    title: "Test Data",
    instructions: [
      "5:30–6:30: Test Data",
      "6:30–7:00: Test Data",
      "7:00–8:00: Test Data",
      "8:00–8:15: Test Data",
      "8:15–8:45: Test Data",
      "8:45–11:00: Test Data",
    ],
  },
  // Add other passes here...
};

const Profile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
  const [currentPass, setCurrentPass] = useState(null); // State to track the selected pass

  const openModal = (passKey) => {
    setCurrentPass(passKey); // Set the selected pass
    setIsModalVisible(true); // Show the modal
  };

  const closeModal = () => {
    setIsModalVisible(false); // Close the modal
  };

  const currentData = passLists[currentPass]; // Get the current pass data

  return (
    <View style={styles.container}>
      {/* Render buttons dynamically */}
      <View className="mt-10 w-4/5">
      <MenuItem onPress={() => openModal("pass1")} label="Pass 1" label2="5.30 AM - 2.30 PM" />
        <MenuItem onPress={() => openModal("pass2")} label="Pass 2" label2="5.30 AM - 2.30 PM" />
        <MenuItem onPress={() => openModal("pass3")} label="Pass 3" label2="5.30 AM - 2.30 PM" />
        <MenuItem  label="Pass 4" label2="5.30 AM - 2.30 PM"/>
        <MenuItem  label="Pass 5" label2="3.00 PM - 9.00 PM"/>
        <MenuItem  label="Pass 6" label2="6.00 PM - 2.30 PM"/>
        <MenuItem label="Pass 7" label2="8.45 AM - 2.15 PM"/>
        <MenuItem  label="Pass 8" label2="8.45 AM - 2.15 PM"/>
        <MenuItem  label="Pass 9" label2="8.45 AM - 2.15 PM"/>
        <MenuItem  label="Pass 10" label2="8.45 AM - 2.15 PM"/>
      </View>

      {/* Modal */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal} // Close modal when back button pressed (Android)
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {currentData && (
              <>
                <Text style={styles.modalTitle}>{currentData.title}</Text>

                <ScrollView contentContainerStyle={styles.instructionContainer}>
                  {currentData.instructions.map((instruction, index) => (
                    <View key={index} className="flex-1 flex-row">
                      <Image
                        source={icons.circle}
                        className="w-6 h-6 pr-2"
                        resizeMode="contain"
                      />
                      <Text style={styles.instructionText}>
                        {instruction}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </>
            )}

            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};



const MenuItem = ({ onPress, label , label2}) => (
  <TouchableOpacity onPress={onPress}  className="flex-row justify-between items-center bg-[#161622] py-4 px-6 rounded-lg mb-4 border border-[#D4AF37]">
    <View className="flex-row items-center">
    <Text style={styles.buttonText}>{label}</Text>
    </View>
    <View className="flex-row items-center">
    <Text style={styles.buttonText2}>{label2}</Text>
    </View>
    <Image
            source={icons.next}
            className="w-4 h-4"
            resizeMode="contain"
          />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#161622',
  },
  button: {
    width: 256, // Adjust the width to your preference
    paddingVertical: 16,
    marginBottom: 12,
    backgroundColor: 'transparent',
    borderColor: '#D4AF37', // Border color for yellow
    borderWidth: 2,
    borderRadius: 12, // Reduced corner roundness
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  buttonText2: {
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker semi-transparent black background
  },
  modalContent: {
    backgroundColor: '#2D2D37', // Darker background for modal
    padding: 15,
    borderRadius: 15,
    width: '95%',
    maxHeight: '80%',
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white', // Light yellow color for title
    marginBottom: 20,
    textAlign: 'center',
  },
  instructionContainer: {
    paddingBottom: 20,
    alignItems: 'flex-start',
  },
  instructionText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 24,
  },
  closeButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#161622',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Profile;
