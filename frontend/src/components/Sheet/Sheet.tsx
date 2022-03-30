import React, {ComponentType, FunctionComponent} from "react";
import Column from "../Column/Column";
import Row from "../Row/Row";
import AxisCell from "../AxisCell/AxisCell";
import Addrow from "../Row/AddRow";
import Resizer from "../Resizer/Resizer";
import Cell, {CELL_HEIGHT, CELL_WIDTH} from "../Cell/Cell";
import classes from "./Sheet.module.css";
import { useRecoilValue } from "recoil";
import { numberToChar } from "../../utils/numberToChar";
import { SheetSizeState } from "../../store/SheetSizeState";

export type SheetProps = {};

const Sheet: FunctionComponent<SheetProps> = (props) => {
    const sheetSize = useRecoilValue(SheetSizeState);

    const numberOfColumns = Math.ceil(sheetSize.width/CELL_WIDTH);
    const numberOfRows = Math.ceil(sheetSize.height/CELL_HEIGHT);

    const saveData = () => {
        fetch("http://127.0.0.1:5000/save/", {
        method: 'POST',
        headers: {'content-type': 'application/json'},        
    })
    }

    return (
        <div>
            <button onClick={saveData}>save</button>
        <div className={classes.SheetWrapper}>
            <table className={classes.Sheet}>
            <tbody>
                <Row>
                    {[...Array(numberOfColumns + 1)].map((column, columnIndex) =>
                     columnIndex !== 0 ? (
                        <AxisCell>{numberToChar(columnIndex - 1)}</AxisCell>
                     ) : (
                         <AxisCell />
                     )
                    )}
                </Row>
                {[...Array(numberOfRows)].map((row, rowIndex) => (
                    <Row key={rowIndex}>
                        <AxisCell>{rowIndex + 1}</AxisCell>
                        {[...Array(numberOfColumns)].map((column, columnIndex) => (
                            <Column key={columnIndex}>
                                <Cell cellId={`${rowIndex},${columnIndex}`} />
                            </Column>
                        ))}
                    </Row>
                ))}        
            </tbody>
            </table>
            <Addrow />
        </div>
        </div>
    );
};

export default Sheet;