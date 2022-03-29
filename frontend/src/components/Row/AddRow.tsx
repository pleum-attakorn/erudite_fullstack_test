import React, {FunctionComponent, useState} from "react";
import { useRecoilState } from "recoil";
import { SheetSizeState } from "../../store/SheetSizeState";
import {CELL_HEIGHT} from "../Cell/Cell";
import classes from "./AddRow.module.css";

export type AddRowProps = {};

const Addrow: FunctionComponent<AddRowProps> = (props) => {
    const [sheetSize, setSheetSize] = useRecoilState(SheetSizeState);
    const doClick = () => {
        setSheetSize({
            width: 600,
            height: 600 + CELL_HEIGHT * counter,
        });
    }

    const [counter, setcounter] = useState<number>(0);
    const incCounter = () => {
        setcounter(counter + 1);
        doClick();
    }    

    return <div onClick={incCounter} className={classes.Addrow} />;
};

export default Addrow;