// app/components/ThemedView.tsx
import { Box } from "native-base";
import React from "react";

interface ThemedViewProps {
    children: React.ReactNode;
    style?: any;
    [key: string]: any;
}
export function ThemedView({ children, style, ...props }: ThemedViewProps) {
    return (
        <Box
            bg="white"
            _dark={{ bg: "coolGray.900" }}
            p={4}
            borderRadius={12}
            shadow={3}
            {...props}
            style={style}
        >
            {children}
        </Box>
    );
}
