import React, { PropsWithChildren, useContext, useEffect } from 'react'
import { BackHandler, ScrollView, View } from 'react-native'
import { Sheet } from 'tamagui'
import { ContextSheet } from '../context/BottomSheetContex'
import HeaderSheet from './HeaderSheet'

interface FormatButtonSheetProps {
    snapPoints: Array<number>;
    children: React.ReactNode
}
export default function ButtonSheet({ snapPoints, children }: FormatButtonSheetProps) {
    const { isVisible, closeBottomSheet, openBottomSheet } = useContext(ContextSheet)
    
    useEffect(() => {
        const handleBackPress = () => {
            if (isVisible) {
                closeBottomSheet();
                return true; 
            }
            return false; 
        };

        BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
    }, [isVisible, closeBottomSheet]);


    return (
        <Sheet
            modal
            open={isVisible}
            dismissOnSnapToBottom
            animation="medium"
            native
            onOpenChange={closeBottomSheet}
            snapPoints={snapPoints}
        >

            <Sheet.Overlay />
            <Sheet.Frame>
                <HeaderSheet />
                {children}
            </Sheet.Frame>
        </Sheet>


    )
}
