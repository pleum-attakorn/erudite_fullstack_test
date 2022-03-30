import React, {ChangeEvent, ComponentType, FunctionComponent, useEffect, useRef, useState, KeyboardEvent} from "react";
import classes from './Cell.module.css';
import {useRecoilState, useRecoilValue } from "recoil";
import { CellValueState } from "../../store/CellValueState";
import { EvaluatedCellValueState } from "../../store/EvaluatedCellValueState";

export const CELL_WIDTH = 100;
export const CELL_HEIGHT = 25;

export type CellProps = {
    cellId: string;
};

const Cell: FunctionComponent<CellProps> = (props) => {
    const [cellValue, setCellvalue] = useRecoilState<string>(
        CellValueState(props.cellId)
    );
    const evaluatedCellValueState = useRecoilValue<string>(
        EvaluatedCellValueState(props.cellId)
    );
    const [isEditMode, setIsEditMode] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const changeLabeltoInput = () => {
        setIsEditMode(true);
        setTimeout(() => {
            inputRef.current?.focus();
        });
    };
    const changeInputtoLabel = () => setIsEditMode(false);
    
    const onClickOutsideInputHandler = (event: MouseEvent) => {
        if((event.target as HTMLElement)?.dataset?.cellId !== props.cellId) {
            changeInputtoLabel();        
        }
    };

    const onDefocusInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            setIsEditMode(false);
        }
    };

    const updateCellValueState = (event: ChangeEvent<HTMLInputElement>) =>
        setCellvalue(event.target.value);

    useEffect(() => {
        document.addEventListener("click", onClickOutsideInputHandler);

        return document.addEventListener("click", onClickOutsideInputHandler);
    }, []);
    // {console.log({'cellid': props.cellId})}
    fetch("http://127.0.0.1:5000/getcelldata/", {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({'cellid': props.cellId, 'cellvalue' : cellValue}),
    })

    return isEditMode ? (
        <input
            className={classes.CellInput} 
            ref={inputRef}
            data-cell-id={props.cellId}
            value={cellValue}
            onChange = {updateCellValueState}
            onKeyDown = {onDefocusInputHandler}
        />        
    ) : (
        <div
            className={classes.CellLabel}
            data-cell-id={props.cellId}
            onClick={changeLabeltoInput}
        >
            {evaluatedCellValueState}
        </div>
    );
};

export default Cell;