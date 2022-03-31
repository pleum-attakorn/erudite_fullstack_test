import { atom } from "recoil";

export const SheetRowSizeState = atom({
    key: "SheetRowSizeState",
    default: {
        height: 600,
    },
});

export const SheetColumnSizeState = atom({
    key: "SheetColumnSizeState",
    default: {
        width: 600,
    },
});
