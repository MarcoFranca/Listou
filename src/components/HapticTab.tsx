import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import {Platform} from "react-native";

// Suporte nativo a children
export function HapticTab(props: BottomTabBarButtonProps) {
    return (
        <PlatformPressable
            {...props}
            onPressIn={ev => {
                // iOS: só vibra em iOS
                if (process.env.EXPO_OS === 'ios' || Platform.OS === 'ios') {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }
                // Chama o handler original se existir
                props.onPressIn?.(ev);
            }}
        >
            {props.children}
        </PlatformPressable>
    );
}
