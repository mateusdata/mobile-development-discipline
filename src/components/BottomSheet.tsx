import React, { PropsWithChildren, useContext, useEffect } from 'react'
import { BackHandler, ScrollView, View } from 'react-native'
import { Sheet } from 'tamagui'
import { ContextSheet } from '../context/BottomSheetContex'
import HeaderSheet from './HeaderSheet'

interface FormatBottomSheetProps {
    snapPoints: Array<number>;
    children: React.ReactNode;
    id: string
}
export default function BottomSheet({ snapPoints, children, id }: FormatBottomSheetProps) {
    const {  closeBottomSheet, visibleSheetId} = useContext(ContextSheet)
    
    useEffect(() => {
        const handleBackPress = () => {
            if (visibleSheetId) {
                closeBottomSheet();
                return true; 
            }
            return false; 
        };

        BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
    }, [visibleSheetId, closeBottomSheet, id]);


    return (
        <Sheet
            modal
            open={visibleSheetId === id}
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
