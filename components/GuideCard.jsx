import { useState } from "react";
import * as Animatable from "react-native-animatable";
import Svg, { Text as SvgText } from 'react-native-svg';
import { View } from 'react-native';
import { router } from "expo-router";
import {
  FlatList,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";


  const handleCardPress = (id) => {
    router.push(`/cards/${id}`);
  };




const TrendingItem = ({ activeItem, item , onPress}) => {
const [play, setPlay] = useState(false);

  return (
    
    <Animatable.View
      className="mr-4"
      animation="bounce"
      duration={1500}
       style={{
        width: 140, // Custom width for the animatable container
        height: 220, // Custom height for the animatable container
      }}
    >
      {(
        <TouchableOpacity
          className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => handleCardPress(item.id)}
        >
          <ImageBackground
            source={item.uri}
            className="w-full h-full  border-2 border-gray-200 rounded-[18px] overflow-hidden shadow-lg shadow-black/40"
            resizeMode="covder"
          >
                    {/* Text inside the card */}
           <View className="absolute bottom-1 left-1 right-1">
              <Text className="font-psemibold"
                style={{
                  fontSize: 15, // Adjust as needed
                  color: 'white',
                  textShadowColor: 'black',
                  padding: 3,
                  textShadowOffset: { width: 1, height: 1 }, // Adjust the offset for stroke thickness
                  textShadowRadius: 1, // Adjust the blur radius for stroke softness
                }}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {item.name}
              </Text>
           </View>
          </ImageBackground>
        </TouchableOpacity>
      )}
    </Animatable.View>

  );
};

const GuideCard = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <TrendingItem activeItem={activeItem} item={item} />
        )}
      onViewableItemsChanged={viewableItemsChanged}
    viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 0 }}
      style={{ marginTop: 10 }}
    />
  );
};


export default GuideCard;
