import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import { View } from "react-native";

interface FormatSheet {
    isVisible: boolean
    setIsVisible: Dispatch<SetStateAction<boolean>>
    openBottomSheet:  () => void
    closeBottomSheet: () => void
}
export const ContextSheet = createContext<FormatSheet>({} as FormatSheet)

export default function ButtonSheetPrivider({ children }: PropsWithChildren) {

    const [isVisible, setIsVisible] = useState(true);

    const openBottomSheet = () => setIsVisible(true);
    const closeBottomSheet = () => setIsVisible(false);

    return (
        <ContextSheet.Provider value={{ isVisible, setIsVisible, openBottomSheet, closeBottomSheet }}>
            {children}
        </ContextSheet.Provider>
    )
}