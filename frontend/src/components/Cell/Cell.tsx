import React, {ChangeEvent, ComponentType, FunctionComponent, useEffect, useRef, useState} from "react";
import classes from './Cell.module.css';
import {atom, useRecoilState } from "recoil";
import { CellValueState } from "../../store/CellValueState";

export const CELL_WIDTH = 100;
export const CELL_HEIGHT = 25;

export type CellProps = {
    cellId: string;
};

const Cell: FunctionComponent<CellProps> = (props) => {
    const [cellValue, setCellvalue] = useRecoilState<string>(
        CellValueState(props.cellId)
    );
    const [isEditMode, setIsEditMode] = useState(false);
    const inputRef = useRef(null);

    const changeLabeltoInput = () => setIsEditMode(true);
    const changeInputtoLabel = () => setIsEditMode(false);
    const onClickOutsideInputHandler = (event: MouseEvent) => {
        if((event.target as HTMLElement)?.dataset?.cellId !== props.cellId) {
            changeInputtoLabel();        
        }
    };
    const updateCellValueState = (event: ChangeEvent<HTMLInputElement>) =>
        setCellvalue(event.target.value);

    useEffect(() => {
        document.addEventListener("click", onClickOutsideInputHandler);

        return document.addEventListener("click", onClickOutsideInputHandler);
    }, []);

    return isEditMode ? (
        <input 
            ref={inputRef}
            data-cell-id={props.cellId}
            value={cellValue}
            onChange = {updateCellValueState}
        />        
    ) : (
        <div data-cell-id={props.cellId} onClick={changeLabeltoInput}>
            {cellValue}
        </div>
    );
};

export default Cell;