// src/components/ui/TabBarBackground.tsx
import React from "react";
import { BlurView } from 'expo-blur';
import { Platform, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from "react-native";

export function TabBarBackground() {
    const colorScheme = useColorScheme();

    // iOS: BlurView premium
    if (Platform.OS === "ios") {
        return (
            <BlurView
                tint={colorScheme === "dark" ? "dark" : "light"}
                intensity={90}
                style={{
                    flex: 1,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    overflow: "hidden"
                }}
            />
        );
    }

    // Android: Gradiente premium ou fallback em cor
    return (
        <LinearGradient
            colors={
                colorScheme === "dark"
                    ? ["#17181d", "#22253a"]
                    : ["#f9fafe", "#d8e3fc"]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
                flex: 1,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                overflow: "hidden"
            }}
        />
    );
}
