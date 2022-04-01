import React, {ComponentType, FunctionComponent, useEffect, useState} from "react";
import Column from "../Column/Column";
import Row from "../Row/Row";
import AxisCell from "../AxisCell/AxisCell";
import Cell, {CELL_HEIGHT, CELL_WIDTH} from "../Cell/Cell";
import { baseUrl } from "../../store/const";
import { Button } from "react-bootstrap";
import Alert from "./aleart";
import classes from "./Sheet.module.css";
import { useRecoilState } from "recoil";
import { numberToChar } from "../../utils/numberToChar";
import { SheetRowSizeState, SheetColumnSizeState } from "../../store/SheetSizeState";

export type SheetProps = {};

const Sheet: FunctionComponent<SheetProps> = (props) => {
    
    const [sheetRowSize, setSheetRowSize] = useRecoilState(SheetRowSizeState);
    const [sheetColumnSize, setSheetColumnSize] = useRecoilState(SheetColumnSizeState);  

    const numberOfColumns = Math.ceil(sheetColumnSize.width/CELL_WIDTH);
    const numberOfRows = Math.ceil(sheetRowSize.height/CELL_HEIGHT);    

    const saveData = () => {
        fetch(`${baseUrl}/save/`, {
        method: 'POST',
        headers: {'content-type': 'application/json'},      
    })
        // alert('save successful')
        
    }
    const [data, setData] = useState<any[]>([]);    

    const loadData = () => {
        fetch(`${baseUrl}/load/`, {
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

    const [rowcounter, setrowcounter] = useState<number>(0);
    const [columncounter, setcolumncounter] = useState<number>(0);
    const updateRow = () => {
        setSheetRowSize({
            height: 600 + CELL_HEIGHT * rowcounter,
        });
    }
    const updateColumn = () => {
        setSheetColumnSize({
            width: 600 + CELL_WIDTH * columncounter,
        });
    }
    const incRowCounter = () => {
        setrowcounter(rowcounter + 1);
        updateRow();
    }
    const incColumnCounter = () => {
        setcolumncounter(columncounter+1);
        updateColumn();
    }


    
    return (
        <div>
            {/* <button onClick={saveData}>save</button> */}
            <Alert/>{' '}
            <Button variant="outline-secondary" onClick={loadData}>load</Button>{' '}
            <Button variant="outline-success" onClick={incRowCounter}>insert row</Button>{' '}
            <Button variant="outline-info" onClick={incColumnCounter}>insert column</Button>{' '}
        
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
                                        {/* {data[rowIndex][columnIndex]? <Cell cellId={`${rowIndex},${columnIndex}`} cellvalue={data[rowIndex][columnIndex]} />
                                            : <Cell cellId={`${rowIndex},${columnIndex}`} />
                                        }                                         */}
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