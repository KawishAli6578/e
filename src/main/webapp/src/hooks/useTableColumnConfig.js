import { useEffect, useMemo } from "react";
import useUIContext from "contexts/UIContext";

export default function useTableColumnConfig(tableId, tableCols) {
  // const [tableConfigStorage, setTableConfigStorage] = useLocalStorage(LOCAL_STORAGE_CONSTANTS.TABLE_CONFIG, {});

  const { updateTableConfig, allTableConfig } = useUIContext();

  const currentTableConfig = tableId ? allTableConfig?.[tableId] ?? {} : {};

  // useEffect(() => {
  //   if (tableId) {
  //     fetchTableConfig(tableId);
  //   }
  // }, [fetchTableConfig, tableId]);

  const displayCols = useMemo(() => {
    let obj = {};
    const currentVisibility = currentTableConfig?.displayCols ?? {};
    obj = tableCols.reduce(
      (prev, next) => ({
        ...prev,
        [next.id]: currentVisibility?.[next.id] ?? true,
      }),
      {}
    );
    return obj;
  }, [currentTableConfig?.displayCols, tableCols]);

  const changeColDisplay = (id, display) => {
    const temp = JSON.parse(JSON.stringify(currentTableConfig));
    if (!temp.displayCols) temp.displayCols = {};
    temp.displayCols[id] = display;
    if (tableId) {
      updateTableConfig(tableId, temp);
    }
  };

  const columns = useMemo(() => {
    let columnsOrder = {};
    const currentOrder = currentTableConfig?.columnsOrder ?? {};
    columnsOrder = tableCols.reduce(
      (prev, next, index) => ({
        ...prev,
        [next.id]: currentOrder?.[next.id] ?? Math.abs(index),
      }),
      {}
    );
    const arr = tableCols.toSorted(
      (a, b) => columnsOrder[a.id] - columnsOrder[b.id]
    );
    return arr;
  }, [currentTableConfig?.columnsOrder, tableCols]);

  const reorderColumn = (draggedCol, targetCol) => {
    const draggedColIndex = columns.findIndex((a) => a.id === draggedCol);
    const targetColIndex = columns.findIndex((a) => a.id === targetCol);
    const tempData = [...columns];
    tempData.splice(targetColIndex, 0, tempData.splice(draggedColIndex, 1)[0]);
    const columnsOrder = tempData.reduce(
      (prev, next, index) => ({ ...prev, [next.id]: Math.abs(index) }),
      {}
    );
    const temp = JSON.parse(JSON.stringify(currentTableConfig));
    temp.columnsOrder = columnsOrder;
    if (tableId) {
      updateTableConfig(tableId, temp);
    }
  };

  return { columns, displayCols, changeColDisplay, reorderColumn };
}
