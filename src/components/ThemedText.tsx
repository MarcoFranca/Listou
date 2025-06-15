// app/components/ThemedText.tsx
import { Text } from "native-base";
import React from "react";

interface ThemedTextProps {
    children: React.ReactNode;
    style?: any;
    [key: string]: any;
}
export function ThemedText({ children, style, ...props }: ThemedTextProps) {
    return (
        <Text
            color="coolGray.900"
            _dark={{ color: "coolGray.100" }}
            fontSize="md"
            fontFamily="Poppins-Medium"
            {...props}
            style={style}
        >
            {children}
        </Text>
    );
}
