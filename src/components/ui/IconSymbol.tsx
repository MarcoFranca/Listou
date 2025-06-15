// app/components/ui/IconSymbol.tsx
import { Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";

interface IconSymbolProps {
    name: string;
    color?: string;
    size?: number;
    [key: string]: any;
}

export function IconSymbol({ name, color = "coolGray.700", size = 24, ...props }: IconSymbolProps) {
    return (
        <Icon as={MaterialIcons} name={name} size={size} color={color} {...props} />
    );
}
