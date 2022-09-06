const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");
const {
  getTransactions,
  postTransaction,
  putTransaction,
  deleteTransaction,
} = require("./transactionAPI");

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  error: "",
};

export const fetchTransactions = createAsyncThunk(
  "transaction/fetchTransactions",
  async () => {
    const transactions = await getTransactions();
    return transactions;
  }
);

export const addTransaction = createAsyncThunk(
  "transaction/addTransaction",
  async (data) => {
    const transaction = await postTransaction(data);
    return transaction;
  }
);

export const editTransaction = createAsyncThunk(
  "transaction/editTransaction",
  async ({ id, data }) => {
    const transaction = await putTransaction(id, data);
    return transaction;
  }
);

export const removeTransaction = createAsyncThunk(
  "transaction/removeTransaction",
  async (id) => {
    const transaction = await deleteTransaction(id);
    return transaction;
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .builder.addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions = action.payload;
      })
      .builder.addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
        state.transactions = [];
      })

      .addCase(addTransaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .builder.addCase(addTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions.push(action.payload);
      })
      .builder.addCase(addTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })

      .addCase(editTransaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .builder.addCase(editTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const index = state.transactions.findIndex(
          (t) => t.id === action.payload.id
        );
        state.transactions[index] = action.payload;
      })
      .builder.addCase(editTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })

      .addCase(removeTransaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .builder.addCase(removeTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions.filter((t) => t.id !== action.payload);
      })
      .builder.addCase(removeTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default transactionSlice.reducer;
