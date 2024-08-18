import React, { PropsWithChildren, useContext, useEffect } from 'react'
import { BackHandler, ScrollView, View } from 'react-native'
import { Sheet } from 'tamagui'
import { ContextSheet } from '../context/BottomSheetContex'
import HeaderSheet from './HeaderSheet'

interface FormatBottonSheetProps {
    snapPoints: Array<number>;
    children: React.ReactNode
}
export default function BottonSheet({ snapPoints, children }: FormatBottonSheetProps) {
    const { isVisible, closeBottomSheet, openBottomSheet } = useContext(ContextSheet)
    
    useEffect(() => {
        const handleBackPress = () => {
            if (isVisible) {
                closeBottomSheet();
                return true; // Retorna true para indicar que o evento foi tratado
            }
            return false; // Retorna false para permitir o comportamento padrão do botão de voltar
        };

        BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        // Limpeza do listener
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
            <Sheet.Frame style={{ borderTopEndRadius: 15, borderTopStartRadius: 15 }}>
                <HeaderSheet />
                {children}
            </Sheet.Frame>
        </Sheet>


    )
}
