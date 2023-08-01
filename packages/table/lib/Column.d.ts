import React from 'react';
export interface ColumnProps {
    /** Alignment */
    align?: 'left' | 'center' | 'right';
    /** Merges column cells to merge when the dataKey value for the merged column is null or undefined. */
    colSpan?: number;
    /** Merges rows on the specified column. */
    rowSpan?: (rowData: any) => number;
    /** Fixed column */
    fixed?: boolean | 'left' | 'right';
    /** Whether to display the full text of the cell content when the mouse is hovered */
    fullText?: boolean;
    /** Vertical alignment */
    verticalAlign?: 'top' | 'middle' | 'bottom';
    /** Column width */
    width?: number;
    /** Customizable Resize Column width */
    resizable?: boolean;
    /** Sortable */
    sortable?: boolean;
    /** A column of a tree */
    treeCol?: boolean;
    /** Set the column width automatically adjusts, when set flexGrow cannot set resizable and width property */
    flexGrow?: number;
    /** When you use flexGrow, you can set a minimum width by  minwidth */
    minWidth?: number;
    /** Configure the cells of the column */
    children?: React.ReactNode;
    /** Callback function for resize the colum */
    onResize?: (columnWidth?: number, dataKey?: string) => void;
}
declare function Column(_props: ColumnProps): null;
declare namespace Column {
    var displayName: string;
    var defaultProps: {
        width: number;
    };
}
export declare const columnHandledProps: string[];
export default Column;