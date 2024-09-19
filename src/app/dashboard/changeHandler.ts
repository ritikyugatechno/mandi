import { updataNewData } from "./filterDataSlice";
import { store } from "./store";

interface Column {
  id: string;
}

interface Row {
  index: number;
  getValue: (id: string) => string;
}
export const weightChange = (row: Row, column: Column, value: string) => {
  const datas = store.getState().filterDataReducer.datas;
  const dispatch = (data: any) => store.dispatch(data);
  if (
    column.id === "weight" ||
    column.id === "sNug" ||
    column.id === "cNug" ||
    column.id === "typeItem"
  ) {
    if (column.id === "typeItem") {
      cutChange(row, column, value);
    }
    const weightArray = datas[row.index]["weight"].split("+").map(Number);
    const grossWeight = weightArray.reduce(
      (accumulator: number, currentValue: string) =>
        accumulator + parseFloat(currentValue),
      0,
    );
    const netWeight =
      grossWeight -
      parseFloat(datas[row.index]["cNug"]) * datas[row.index]["cut"];
    const avgWeight =
      (netWeight / parseFloat(datas[row.index]["cNug"])) *
      parseFloat(datas[row.index]["sNug"]);
    dispatch(
      updataNewData({
        row: row.index,
        column: "netWeight",
        value: netWeight,
      }),
    );
    dispatch(
      updataNewData({
        row: row.index,
        column: "avgWeight",
        value: avgWeight,
      }),
    );
  }
};
export const netWeightChange = (row: Row, column: Column, value: number) => {
  const datas = store.getState().filterDataReducer.datas;
  const dispatch = (data: any) => store.dispatch(data);
  if (column.id === "netWeight") {
    const netWeight = value;
    const avgWeight =
      (netWeight / parseFloat(datas[row.index]["cNug"])) *
      parseFloat(datas[row.index]["sNug"]);
    dispatch(
      updataNewData({
        row: row.index,
        column: "avgWeight",
        value: avgWeight,
      }),
    );
  }
};
const cutChange = (row: Row, column: Column, value: string) => {
  const dispatch = (data: any) => store.dispatch(data);
  if (column.id === "typeItem") {
    let cut = 0;
    if (value == "box") {
      cut = 1.25;
    } else if (value == "daba") {
      cut = 0.5;
    } else if (value == "peti") {
      cut = 3;
    } else if (value == "plate") {
      cut = 0.25;
    } else if (value == "charat1") {
      cut = 1;
    } else if (value == "charat2") {
      cut = 2;
    } else if (value == "charat3") {
      cut = 1.5;
    } else if (value == "charat4") {
      cut = 0.75;
    }
    dispatch(
      updataNewData({
        row: row.index,
        column: "cut",
        value: cut,
      }),
    );
  }
};
