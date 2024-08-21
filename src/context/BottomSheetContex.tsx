import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import { View } from "react-native";

interface FormatSheet {
    visibleSheetId: string | null
    setVisibleSheetId?: Dispatch<SetStateAction<string | null>>
    openBottomSheet:  (id: string) => void
    closeBottomSheet: () => void
}
export const ContextSheet = createContext<FormatSheet>({} as FormatSheet)

export default function BottomSheetPrivider({ children }: PropsWithChildren) {

    const [visibleSheetId, setVisibleSheetId] = useState<string | null>(null);

    const openBottomSheet = (id:string) => setVisibleSheetId(id);
    const closeBottomSheet = () => setVisibleSheetId(null);

    return (
        <ContextSheet.Provider value={{ visibleSheetId, openBottomSheet, closeBottomSheet }}>
            {children}
        </ContextSheet.Provider>
    )
}