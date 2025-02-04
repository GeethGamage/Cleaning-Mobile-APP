import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

import { icons } from "../../constants";


const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center  mt-6">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-7 h-7"
      />
      <Text
        style={{
          color: color,
          fontSize: 12, // Smaller font size to fit text in one line
          marginTop: 4,
          fontFamily: "Arial", // Adjust font family for better consistency
          width: 60, // Limit the width of the text container to avoid wrapping
          textAlign: "center", // Ensure text is centered
        }}
        numberOfLines={1} // Ensure the text is limited to one line
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#D4AF37",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 2,
            borderTopColor: "#232533",
            height: 70,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
                <Tabs.Screen
          name="pass"
          options={{
            title: "Passes",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.pass}
                color={color}
                name="Passes"
                focused={focused}
              />
            ),
          }}
        />


        <Tabs.Screen
          name="create"
          options={{
            title: "Report",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.report}
                color={color}
                name="Report"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="view"
          options={{
            title: "Log",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.log}
                color={color}
                name="Log"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>

      
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
}

export default TabsLayout