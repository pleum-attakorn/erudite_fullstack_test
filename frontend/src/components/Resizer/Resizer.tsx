import React, {FunctionComponent} from "react";
import classes from "./Resizer.module.css";

export type ResizerProps = {};

const Resizer: FunctionComponent<ResizerProps> = (props) => {
    return <div className={classes.Resizer} />;
};

export default Resizer;