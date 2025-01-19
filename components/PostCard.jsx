import { useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground, Image } from "react-native";
import { format } from "date-fns";
import { icons } from "../constants";

const PostCard = ({ itemImage, itemName, onPress }) => {

  
  const [play, setPlay] = useState(false);
  

  return (
    <View className="flex flex-col items-center px-4 mb-2">
     

      {(
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPress}
          className="w-full h-80 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={itemImage}
            className="w-full h-full rounded-xl mt-3 border-2 border-black-200 focus:border-secondary"
            resizeMode="cover"
          />

          <View className="absolute bottom-1 justify-center items-center">
              <Text
                style={{
                  fontSize: 20, // Adjust as needed
                  fontWeight: 'bold',
                  color: 'white',
                  textShadowColor: 'black',
                  textShadowOffset: { width: 1, height: 1 }, // Adjust the offset for stroke thickness
                  textShadowRadius: 1, // Adjust the blur radius for stroke softness
                }}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {itemName}
              </Text>
           </View>
        </TouchableOpacity>
          
      )}
    </View>
  );
};



export default PostCard;
