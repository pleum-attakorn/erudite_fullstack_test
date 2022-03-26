import React, {ComponentType, FunctionComponent} from "react";
import Sheet from "../components/Sheet/Sheet";
import classes from "./SheetContainer.module.css";

export type SheetsContainerProps = {};

const SheetContainer: FunctionComponent<SheetsContainerProps> = (props) => {
    return <Sheet />;
};

export default SheetContainer;