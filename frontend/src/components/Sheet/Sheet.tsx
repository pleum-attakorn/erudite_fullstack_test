import React, {ComponentType, FunctionComponent, useEffect, useState} from "react";
import Column from "../Column/Column";
import Row from "../Row/Row";
import AxisCell from "../AxisCell/AxisCell";
import Addrow from "../Row/AddRow";
import Resizer from "../Resizer/Resizer";
import Cell, {CELL_HEIGHT, CELL_WIDTH} from "../Cell/Cell";
import classes from "./Sheet.module.css";
import { useRecoilState } from "recoil";
import { numberToChar } from "../../utils/numberToChar";
import { SheetSizeState } from "../../store/SheetSizeState";

export type SheetProps = {};

const Sheet: FunctionComponent<SheetProps> = (props) => {
    
    const [sheetSize, setSheetSize] = useRecoilState(SheetSizeState);

    const [rowcounter, setrowcounter] = useState<number>(0);
    const updateRoworColumn = () => {
        setSheetSize({
            width: 600,
            height: 600 + CELL_HEIGHT * rowcounter,
        });
    }
    const incRowCounter = () => {
        setrowcounter(rowcounter + 1);
        updateRoworColumn();
    }

    const numberOfColumns = Math.ceil(sheetSize.width/CELL_WIDTH);
    const numberOfRows = Math.ceil(sheetSize.height/CELL_HEIGHT);

    

    const saveData = () => {
        fetch("http://127.0.0.1:5000/save/", {
        method: 'POST',
        headers: {'content-type': 'application/json'},        
    })
        
    }
    const [data, setData] = useState<any[]>([]);    

    const loadData = () => {
        fetch("http://127.0.0.1:5000/load/", {
        method: 'POST',
        headers: {'content-type': 'application/json'},        
    })
        .then(res =>
            res.json()                       
            )
        .then(obj => {                  
            setData(obj)
        })
        
    }
    
    return (
        <div>
            <button onClick={saveData}>save</button>
            <button onClick={loadData}>load</button>
            <button onClick={incRowCounter}>insert row</button>
            {/* <Addrow />            */}
        
        {data.length === 0?
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
                { 
                // data.length === 0?
                [...Array(numberOfRows)].map((row, rowIndex) => (
                    <Row key={rowIndex}>
                        <AxisCell>{rowIndex + 1}</AxisCell>
                        {[...Array(numberOfColumns)].map((column, columnIndex) => (
                            <Column key={columnIndex}>
                                <Cell cellId={`${rowIndex},${columnIndex}`} />
                            </Column>
                        ))}
                    </Row>
                ))                
                }        
            </tbody>
            </table>
            
        </div>
        :
        
        <div className={classes.SheetWrapper}>
            <table className={classes.Sheet}>
                <tbody>
                    <Row>
                        {[...Array(data[0].length + 1)].map((column, columnIndex) =>
                            columnIndex !== 0 ? (
                                <AxisCell>{numberToChar(columnIndex - 1)}</AxisCell>
                            ) : (
                                <AxisCell />
                            )
                        )
                        }
                    </Row>
                    {
                        [...Array(data.length)].map((row, rowIndex) => (
                            <Row key={rowIndex}>
                                <AxisCell>{rowIndex + 1}</AxisCell>
                                {[...Array(data[0].length)].map((column, columnIndex) => (
                                    <Column key={columnIndex}>
                                        <Cell cellId={`${rowIndex},${columnIndex}`} cellvalue={data[rowIndex][columnIndex]} />
                                    </Column>
                                ))}
                            </Row>
                        )
                            )
                    }
                </tbody>
            </table>
        </div>
        }
        </div>
    );
};

export default Sheet;