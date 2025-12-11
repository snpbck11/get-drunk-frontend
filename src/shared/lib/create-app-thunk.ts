import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export function createAppThunk<Returned, ThunkArg = void>(
  typePrefix: string,
  asyncFunction: (arg: ThunkArg) => Promise<Returned>
) {
  return createAsyncThunk(typePrefix, async (arg: ThunkArg, { rejectWithValue }) => {
    try {
      return await asyncFunction(arg);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data?.message || "Ошибка запроса");
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  });
}
