import { RowDataType } from '../@types/common';
interface TableRowsProps<Row, Key> {
    prefix: (str: string) => string;
    wordWrap?: boolean | 'break-all' | 'break-word' | 'keep-all';
    data: readonly Row[];
    expandedRowKeys: readonly Key[];
}
/**
 * The row information of the table, get the DOM of all rows, and summarize the row height.
 * @param props
 * @returns
 */
declare const useTableRows: <Row extends RowDataType<never>, Key>(props: TableRowsProps<Row, Key>) => {
    bindTableRowsRef: (index: number | string, rowData: any) => (ref: HTMLElement) => void;
    tableRowsMaxHeight: any;
    tableRows: any;
};
export default useTableRows;
