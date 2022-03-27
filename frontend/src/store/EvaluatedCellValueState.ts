import {selector} from "recoil";
import { memoize } from "../utils/memoize";
import { CellValueState } from "./CellValueState";
import { evaluate } from "mathjs";
import { getEquationExpressionFromState } from "../utils/getEquationExpressionFromState";

export const EvaluatedCellValueState = (cellId: string) =>
    memoize(`evaluatedCell_${cellId}`, () => 
        selector({
            key: `evaluatedCell_${cellId}`,
            get: ({get}) => {
                const value = get(CellValueState(cellId)) as string;

                if (value.startsWith('=')) {
                    try {
                        const evaluatedExpression = getEquationExpressionFromState(
                            get,
                            value.slice(1)
                        );

                        // if (evaluatedExpression === "!ERROR") {
                        //     return "!ERROR"
                        // }

                        return evaluate(evaluatedExpression);
                    } catch {
                        return value;
                    }
                }
                return value;
            },
        })
    );