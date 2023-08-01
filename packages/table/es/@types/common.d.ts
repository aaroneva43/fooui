import React from 'react';
export interface StandardProps extends React.HTMLAttributes<HTMLElement> {
    /** The prefix of the component CSS class */
    classPrefix?: string;
    /** Additional classes */
    className?: string;
    /** Primary content */
    children?: React.ReactNode;
    /** Additional style */
    style?: React.CSSProperties;
}
export type SortType = 'desc' | 'asc';
export type TableSizeChangeEventName = 'bodyHeightChanged' | 'bodyWidthChanged' | 'widthChanged' | 'heightChanged';
export interface RowDataType<T = never> {
    dataKey?: string;
    children?: T[];
    [key: string]: any;
}
export type RowKeyType = string | number;
export interface TableLocaleType {
    emptyMessage?: string;
    loading?: string;
}
export type ListenerCallback = {
    off: () => void;
};
export type ElementOffset = {
    top: number;
    left: number;
    width: number;
    height: number;
};
export interface TableProps<Row, Key> extends Omit<StandardProps, 'onScroll'> {
    /**
     * The height of the table will be automatically expanded according to the number of data rows,
     * and no vertical scroll bar will appear
     * */
    autoHeight?: boolean;
    /**
     * Force the height of the table to be equal to the height of its parent container.
     * Cannot be used together with autoHeight.
     */
    fillHeight?: boolean;
    /** Affix the table header to the specified position on the page */
    affixHeader?: boolean | number;
    /** Affix the table horizontal scrollbar to the specified position on the page */
    affixHorizontalScrollbar?: boolean | number;
    /** Show the border of the table */
    bordered?: boolean;
    /** Display the borders of table cells */
    cellBordered?: boolean;
    /** Default sort type */
    defaultSortType?: SortType;
    /** Disable scroll bar */
    disabledScroll?: boolean;
    /** Expand all nodes By default */
    defaultExpandAllRows?: boolean;
    /** Specify the default expanded row by  rowkey */
    defaultExpandedRowKeys?: readonly Key[];
    /** Table data */
    data?: readonly Row[];
    /** Specify the default expanded row by  rowkey (Controlled) */
    expandedRowKeys?: readonly Key[];
    /** The visible height of the table (the height of the scrollable container). */
    height?: number;
    /** The minimum height of the table. The height is maintained even when the content is not stretched. */
    minHeight?: number;
    /** The row of the table has a mouseover effect */
    hover?: boolean;
    /** The height of the table header */
    headerHeight?: number;
    /** The component localized character set. */
    locale?: TableLocaleType;
    /** Show loading */
    loading?: boolean;
    /** Whether to enable loading animation */
    loadAnimation?: boolean;
    /** The row height of the table */
    rowHeight?: number | ((rowData?: Row) => number);
    /** Each row corresponds to the unique key in  data */
    rowKey?: RowKeyType;
    /** The table will be displayed as a tree structure */
    isTree?: boolean;
    /** Set the height of an expandable area */
    rowExpandedHeight?: number;
    /** Add an optional extra class name to row */
    rowClassName?: string | ((rowData: Row, rowIndex: number) => string);
    /** Whether to display the header of the table */
    showHeader?: boolean;
    /** Sort Column Name */
    sortColumn?: string;
    /** Sort type */
    sortType?: SortType;
    /**
     * Use the return value of `shouldUpdateScroll` to determine
     * whether to update the scroll after the table size is updated.
     */
    shouldUpdateScroll?: boolean | ((event: TableSizeChangeEventName) => {
        x?: number;
        y?: number;
    });
    /** Enable 3D transition rendering to improve performance when scrolling. */
    translate3d?: boolean;
    /** Right to left */
    rtl?: boolean;
    /** The width of the table. When it is not set, it will adapt according to the container */
    width?: number;
    /**
     * Whether to appear line breaks where text overflows its content box
     * https://developer.mozilla.org/en-US/docs/Web/CSS/word-break
     */
    wordWrap?: boolean | 'break-all' | 'break-word' | 'keep-all';
    /** Effectively render large tabular data */
    virtualized?: boolean;
    /** Tree table, the callback function in the expanded node */
    renderTreeToggle?: (expandButton: React.ReactNode, rowData?: Row, expanded?: boolean) => React.ReactNode;
    /** Customize what you can do to expand a zone */
    renderRowExpanded?: (rowData?: Row) => React.ReactNode;
    /** Custom row element */
    renderRow?: (children?: React.ReactNode, rowData?: Row) => React.ReactNode;
    /** Customized data is empty display content */
    renderEmpty?: (info: React.ReactNode) => React.ReactNode;
    /** Customize the display content in the data load */
    renderLoading?: (loading: React.ReactNode) => React.ReactNode;
    /** Click the callback function after the row and return to rowDate */
    onRowClick?: (rowData: Row, event: React.MouseEvent) => void;
    /** Callback after right-click row */
    onRowContextMenu?: (rowData: Row, event: React.MouseEvent) => void;
    /** Callback function for scroll bar scrolling */
    onScroll?: (scrollX: number, scrollY: number) => void;
    /** Click the callback function of the sort sequence to return the value sortColumn, sortType */
    onSortColumn?: (dataKey: string, sortType?: SortType) => void;
    /** Tree table, the callback function in the expanded node */
    onExpandChange?: (expanded: boolean, rowData: Row) => void;
    /** Callback for the `touchstart` event. */
    onTouchStart?: (event: React.TouchEvent) => void;
    /** Callback for the `touchmove` event. */
    onTouchMove?: (event: React.TouchEvent) => void;
    /** Callback for the `touchend` event. */
    onTouchEnd?: (event: React.TouchEvent) => void;
    /**
     * Callback after table data update.
     * @deprecated use `shouldUpdateScroll` instead
     **/
    onDataUpdated?: (nextData: Row[], scrollTo: (coord: {
        x: number;
        y: number;
    }) => void) => void;
    /**
     * A ref attached to the table body element
     * @deprecated use `ref` instead (see `ref.current.body`)
     **/
    bodyRef?: (ref: HTMLElement) => void;
}
export interface RowProps extends StandardProps {
    width?: number;
    height?: number;
    headerHeight?: number;
    top?: number;
    isHeaderRow?: boolean;
    rowRef?: any;
    rowSpan?: number;
}
export interface TableRowProps extends RowProps {
    key?: string | number;
    rowIndex: number;
    depth?: number;
    onClick?: (event: React.MouseEvent) => void;
    onContextMenu?: (event: React.MouseEvent) => void;
}
export interface TableInstance<Row, Key> extends React.FunctionComponent<TableProps<Row, Key>> {
    /** The table body element */
    readonly body: HTMLDivElement;
    /** The table root element */
    readonly root: HTMLDivElement;
    /** Scroll the table to the specified vertical position */
    scrollTop: (top: number) => void;
    /** Scroll the table to the specified horizontal position */
    scrollLeft: (left: number) => void;
}