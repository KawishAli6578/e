import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";

import {
  Box,
  Checkbox,
  ClickAwayListener,
  Collapse,
  Divider,
  List,
  ListItem,
  Pagination,
  Paper,
  Popper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import {
  BarsOutlined,
  DownOutlined,
  RedoOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { alpha, useTheme } from "@mui/material/styles";

import IconButton from "./@extended/IconButton";
import Transitions from "./@extended/Transitions";
import { useDrag, useDrop } from "react-dnd";

import { DndProvider } from "react-dnd";
import { isMobile } from "react-device-detect";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import useTableColumnConfig from "hooks/useTableColumnConfig";
import Loader from "./Loader";
import { getDataFromObject } from "utils/common";

const defaultObj = {};
const defaultFunc = () => {};
const defaultArr = [];

const defaultPagination = {
  rowsPerPage: 10,
  page: 0,
  totalRecords: 0,
};

export default function CustomTable(props) {
  const {
    id,
    columns: tableColumns = defaultArr,
    fetcherFunction,
    pagination = true,
    onRowClick = defaultFunc,
    allowCheckbox = false,
    idLabel = "id",
    onSelectChange = defaultFunc,
    payload = defaultObj,
    refreshToggle = null,
    showTableAction = null,
    tableData: propsTableData = [],
    allowColumnReorder = false,
    collapsibleRow = false,
    collapsibleRowContent = defaultFunc,
    rowSelected: propsRowSelected = defaultArr,
    setRowSelected: propsSetRowSelected = defaultFunc,
    setTablePaginationData = defaultFunc,
    tableLoading = false,
    apiDataPath,
  } = props;

  const downMD = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const fetcherFunctionRef = useRef(fetcherFunction);

  const { columns, displayCols, changeColDisplay, reorderColumn } =
    useTableColumnConfig(id, tableColumns);

  const [tableData, setTableData] = useState(propsTableData);
  const [loading, setLoading] = useState(false);
  const [rowSelected, setRowSelected] = useState(propsRowSelected);

  const [rowOrder, setRowOrder] = useState("asc");
  const [rowOrderBy, setRowOrderBy] = useState("");

  const payloadRef = useRef(payload);
  const [shouldMakeCall, setShouldMakeCall] = useState(false);

  const [paginationData, setPaginationData] = useState(defaultPagination);

  useEffect(() => {
    if (fetcherFunction) {
      fetcherFunctionRef.current = fetcherFunction;
    }
  }, [fetcherFunction]);
  useEffect(() => {
    if (tableLoading) {
      setLoading(tableLoading);
    } else {
      setLoading(false);
    }
  }, [tableLoading]);

  useEffect(() => {
    if (!fetcherFunction && propsTableData) {
      setTableData(propsTableData);
    }
  }, [fetcherFunction, propsTableData]);

  useEffect(() => {
    if (payload) {
      payloadRef.current = payload;
      setPaginationData(defaultPagination);
    }
    setShouldMakeCall(true);
  }, [payload]);

  useEffect(() => {
    setShouldMakeCall(true);
  }, [refreshToggle]);

  useEffect(() => {
    if (paginationData) {
      setTablePaginationData(paginationData);
    }
  }, [paginationData]);
  // console.log(apiDataPath, "path");

  useEffect(() => {
    const controller = new AbortController();
    if (shouldMakeCall && fetcherFunctionRef.current) {
      (async () => {
        setShouldMakeCall(false);
        try {
          setLoading(true);
          const { data } = await fetcherFunctionRef.current(
            { ...payloadRef.current },
            paginationData.page + 1,
            paginationData.rowsPerPage
          );
          if (data?.data) {
            const rowsData = apiDataPath
              ? getDataFromObject(data, apiDataPath)
              : null;
            setTableData(rowsData || data?.data?.result || data?.data || []);
            setPaginationData((prev) => ({
              ...prev,
              totalRecords: data?.data?.totalRecords || 0,
            }));
            setRowSelected([]);
          }
        } catch (err) {
          //
        } finally {
          setLoading(false);
        }
      })();
    }
    return () => {
      controller.abort();
    };
  }, [
    apiDataPath,
    paginationData.page,
    paginationData.rowsPerPage,
    shouldMakeCall,
  ]);

  useEffect(() => {
    onSelectChange(rowSelected);
    propsSetRowSelected(rowSelected);
  }, [onSelectChange, propsSetRowSelected, rowSelected]);

  const refreshTable = () => setShouldMakeCall(true);

  const handleChangePage = (event, newPage) => {
    setPaginationData((prev) => ({ ...prev, page: newPage }));
    setShouldMakeCall(true);
  };

  const handleChangePageDirect = (event, newPage) => {
    setPaginationData((prev) => ({ ...prev, page: newPage - 1 }));
    setShouldMakeCall(true);
  };

  const handleChangeRowsPerPage = (event) => {
    setPaginationData((prev) => ({
      ...prev,
      page: 0,
      rowsPerPage: parseInt(event?.target.value, 10),
    }));
    setShouldMakeCall(true);
  };

  const isSelected = (id) => rowSelected.indexOf(id) !== -1;
  const getRowDataId = (row) => getDataFromObject(row, idLabel);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedId = tableData.map((r) => getRowDataId(r));
      setRowSelected(newSelectedId);
      return;
    }
    setRowSelected([]);
  };

  const onRowSelect = (checked, id) => {
    if (!id) return;
    if (checked) {
      setRowSelected((prev) => [...new Set([...prev, id])]);
    } else {
      setRowSelected((prev) => [...new Set([...prev.filter((a) => a !== id)])]);
    }
  };

  const sortHandler = (property) => {
    const isAsc = rowOrderBy === property && rowOrder === "asc";
    const tempOrder = isAsc ? "desc" : "asc";
    const tempProperty = property;
    setRowOrder(tempOrder);
    setRowOrderBy(tempProperty);
    const tempArr = tableData ? JSON.parse(JSON.stringify(tableData)) : [];
    if (tempProperty) {
      tempArr.sort((a, b) => {
        let comparatorValue = 0;
        if (isNaN(a?.[tempProperty])) {
          comparatorValue = String(a?.[tempProperty]).localeCompare(
            b?.[tempProperty]
          );
        } else {
          comparatorValue =
            Number(a?.[tempProperty]) - Number(b?.[tempProperty]);
        }
        return tempOrder === "desc" ? -comparatorValue : comparatorValue;
      });
    }
    setTableData(tempArr);
  };

  const tablePagination = (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Pagination
            component="div"
            count={
              paginationData.totalRecords
                ? Math.ceil(
                    paginationData.totalRecords / paginationData.rowsPerPage
                  )
                : 0
            }
            page={paginationData.page + 1}
            onChange={handleChangePageDirect}
            showFirstButton
            showLastButton
            boundaryCount={downMD ? 0 : 1}
            siblingCount={downMD ? 0 : 1}
          />
        </Box>
        <Box>
          <TablePagination
            rowsPerPageOptions={[10, 15, 20, 25, 30]}
            component="div"
            count={paginationData.totalRecords}
            rowsPerPage={paginationData.rowsPerPage}
            page={paginationData.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              "& .MuiToolbar-root": {
                marginRight: { xs: 0, md: "15px" },
                paddingLeft: { xs: 0, md: "1rem" },
              },
              "& .MuiTablePagination-actions": {
                display: "none",
              },
            }}
          />
        </Box>
      </Stack>
    </>
  );

  const tableHeaderCell = (label, sortSelector) =>
    sortSelector ? (
      <TableSortLabel
        active={rowOrderBy === sortSelector}
        direction={rowOrderBy === sortSelector ? rowOrder : "asc"}
        onClick={() => sortHandler(sortSelector)}
      >
        {label}
      </TableSortLabel>
    ) : (
      label
    );

  return (
    <>
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <TableContainer>
          <Stack direction={{ md: "row" }} sx={{ width: "100%" }}>
            <Box sx={{ flexGrow: "1" }}>{pagination && tablePagination}</Box>
            {showTableAction && (
              <Toolbar
                sx={{
                  px: { xs: 1 },
                  py: 0,
                  justifyContent: "end",
                  gap: 2,
                }}
              >
                <Tooltip title="refreshTable">
                  <IconButton variant="outlined" onClick={refreshTable}>
                    <RedoOutlined />
                  </IconButton>
                </Tooltip>
                <ManageColumns
                  columns={tableColumns}
                  showColumns={displayCols}
                  setShowColumns={changeColDisplay}
                />
              </Toolbar>
            )}
          </Stack>
          <Box width="100%" sx={{ overflowX: "auto" }}>
            <Table aria-labelledby="tableTitle" size={"medium"}>
              <TableHead>
                <TableRow>
                  {collapsibleRow && <TableCell sx={{ pl: 3 }} width={72} />}
                  {allowCheckbox && columns.length > 0 && (
                    <TableCell padding="checkbox" sx={{ pl: 3 }}>
                      <Checkbox
                        color="primary"
                        indeterminate={
                          rowSelected.length > 0 &&
                          rowSelected.length < tableData.length
                        }
                        checked={
                          tableData.length > 0 &&
                          rowSelected.length === tableData.length
                        }
                        onChange={handleSelectAllClick}
                        inputProps={{
                          "aria-label": "select all",
                        }}
                      />
                    </TableCell>
                  )}
                  {columns.map((column, cIndex) => {
                    const { id, label, sortable, sortSelector, ...other } =
                      column;
                    delete other.render;
                    return displayCols[id] ? (
                      <DraggableColumns
                        key={`${id}-${cIndex}`}
                        sx={{
                          textWrap: "nowrap",
                          cursor: allowColumnReorder ? "move" : "inherit",
                        }}
                        {...other}
                        column={column}
                        reorderColumn={
                          allowColumnReorder ? reorderColumn : defaultFunc
                        }
                        active={allowColumnReorder}
                      >
                        {tableHeaderCell(
                          label,
                          sortable ? sortSelector : false
                        )}
                      </DraggableColumns>
                    ) : (
                      <Fragment key={`${id}-${cIndex}`}></Fragment>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length + 5} align="center">
                      <Loader.Spinner />
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {tableData.length ? (
                      tableData.map((row, index) => {
                        const rowId = getRowDataId(row);
                        const isItemSelected = isSelected(rowId);
                        return (
                          <Fragment key={`${rowId}-${index}`}>
                            <Row
                              row={row}
                              index={index}
                              onRowClick={onRowClick}
                              allowCheckbox={allowCheckbox}
                              columns={columns}
                              isItemSelected={isItemSelected}
                              onRowSelect={(e) => {
                                e.stopPropagation();
                                onRowSelect(e.target.checked, rowId);
                              }}
                              displayCols={displayCols}
                              collapsibleRow={collapsibleRow}
                              collapsibleRowContent={collapsibleRowContent}
                            />
                          </Fragment>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={columns.length + 5} align="center">
                          No Data Found
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                )}
              </TableBody>
            </Table>
          </Box>
        </TableContainer>
        {pagination && (
          <>
            <Divider />
            {tablePagination}
          </>
        )}
      </DndProvider>
    </>
  );
}

CustomTable.propTypes = {
  id: PropTypes.string,
  columns: PropTypes.array.isRequired,
  tableData: PropTypes.array,
  fetcherFunction: PropTypes.func,
  pagination: PropTypes.bool,
  onRowClick: PropTypes.func,
  allowCheckbox: PropTypes.bool,
  idLabel: PropTypes.string,
  onSelectChange: PropTypes.func,
  payload: PropTypes.any,
  refreshToggle: PropTypes.any,
  showTableAction: PropTypes.bool,
  allowColumnReorder: PropTypes.bool,
  collapsibleRow: PropTypes.bool,
  collapsibleRowContent: PropTypes.func,
  setTablePaginationData: PropTypes.func,
  tableLoading: PropTypes.bool,
  apiDataPath: PropTypes.string,
};

const Row = ({
  row,
  index,
  onRowClick,
  allowCheckbox,
  columns,
  isItemSelected,
  onRowSelect,
  displayCols,
  collapsibleRow,
  collapsibleRowContent,
}) => {
  const theme = useTheme();
  const backColor = alpha(theme.palette.primary.lighter, 0.1);
  const [open, setOpen] = useState(false);
  const checkboxLabelId = `enhanced-table-checkbox-${index}`;

  const content = useMemo(
    () => collapsibleRowContent(row, index),
    [collapsibleRowContent, index, row]
  );

  return (
    <>
      <TableRow
        hover
        onClick={(event) => {
          onRowClick(event, row, index);
        }}
        sx={{
          cursor: onRowClick === defaultFunc ? "initial" : "pointer",
          "& > *": { borderBottom: "unset" },
        }}
      >
        {collapsibleRow && (
          <TableCell sx={{ pl: 3 }} onClick={(e) => e.stopPropagation()}>
            {content && (
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <UpOutlined /> : <DownOutlined />}
              </IconButton>
            )}
          </TableCell>
        )}
        {allowCheckbox && columns.length > 0 && (
          <TableCell
            sx={{ pl: 3 }}
            padding="checkbox"
            onClick={(e) => e.stopPropagation()}
          >
            <Checkbox
              color="primary"
              checked={isItemSelected}
              onChange={onRowSelect}
              inputProps={{
                "aria-labelledby": checkboxLabelId,
              }}
            />
          </TableCell>
        )}
        {columns.map((column, cIndex) => {
          const { id, render, ...other } = column;
          delete other.label;
          delete other.sortable;
          delete other.sortSelector;
          return displayCols[id] ? (
            <TableCell key={`${id}-${cIndex}`} {...other}>
              {render && typeof render === "function" ? (
                render(row, index)
              ) : (
                <></>
              )}
            </TableCell>
          ) : (
            <Fragment key={`${id}-${cIndex}`}></Fragment>
          );
        })}
      </TableRow>
      <TableRow
        sx={{
          bgcolor: backColor,
          "&:hover": { bgcolor: `${backColor} !important` },
        }}
      >
        <TableCell sx={{ py: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {open && <Box sx={{ pl: 3, py: 2 }}>{content}</Box>}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const ManageColumns = ({ columns, setShowColumns, showColumns }) => {
  const theme = useTheme();
  const anchorRef = useRef(null);

  const matchesXs = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  return (
    <Box
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Tooltip title="manageColumns">
        <IconButton
          variant="outlined"
          aria-label="open profile"
          ref={anchorRef}
          aria-controls={open ? "profile-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <BarsOutlined />
        </IconButton>
      </Tooltip>
      <Popper
        placement={matchesXs ? "bottom" : "bottom-end"}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        popperOptions={{
          modifiers: [
            { name: "offset", options: { offset: [matchesXs ? -5 : 0, 9] } },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions
            type="grow"
            position={matchesXs ? "top" : "top-right"}
            in={open}
            {...TransitionProps}
          >
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: "100%",
                maxHeight: 250,
                overflowY: "auto",
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <List>
                  {columns.map((column, index) => (
                    <ListItem key={column?.id + index}>
                      <Checkbox
                        checked={showColumns[column.id] || false}
                        onChange={(e) =>
                          setShowColumns(column.id, e.target.checked)
                        }
                        inputProps={{
                          id: `${index}-${column?.id}`,
                        }}
                      />
                      <label htmlFor={`${index}-${column?.id}`}>
                        {column.label}
                      </label>
                    </ListItem>
                  ))}
                </List>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

const DraggableColumns = ({
  children,
  column,
  reorderColumn,
  active,
  ...props
}) => {
  const [{ isOverCurrent }, dropRef] = useDrop({
    accept: "column",
    drop: (draggedColumn) => reorderColumn(draggedColumn.id, column.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => column,
    type: "column",
  });
  return (
    <TableCell {...(active ? { ref: dropRef } : {})} {...props}>
      <Box component="span" {...(active ? { ref: previewRef } : {})}>
        <Box
          {...(active ? { ref: dragRef } : {})}
          sx={{
            color: isOverCurrent ? "primary.main" : "text.primary",
            opacity: isDragging ? 0.9 : 1,
          }}
        >
          {children}
        </Box>
      </Box>
    </TableCell>
  );
};
