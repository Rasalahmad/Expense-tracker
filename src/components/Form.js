import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransaction,
  editTransaction,
} from "../features/transaction/transactionSlice";

export default function Form() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state.transaction);
  const { editing } = useSelector((state) => state.transaction) || {};

  const reset = () => {
    setName("");
    setType("");
    setAmount("");
  };

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(
      addTransaction({
        name,
        type,
        amount: Number(amount),
      })
    );
    reset();
  };

  useEffect(() => {
    const { id, name, amount, type } = editing || {};
    if (id) {
      setEditMode(true);
      setName(name);
      setAmount(amount);
      setType(type);
    } else {
      setEditMode(false);
      reset();
    }
  }, [editing]);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      editTransaction({
        id: editing?.id,
        data: {
          name,
          amount,
          type,
        },
      })
    );
    setEditMode(false);
    reset();
  };

  const cancelEditMode = () => {
    reset();
    setEditMode(false);
  };

  return (
    <div className="form">
      <h3>Add new transaction</h3>

      <form onSubmit={editMode ? handleUpdate : handleCreate}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            required
            name="name"
            value={name}
            placeholder="Enter Title"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group radio">
          <label>Type</label>
          <div className="radio_group">
            <input
              type="radio"
              required
              value="income"
              name="type"
              checked={type === "income"}
              onChange={(e) => setType("income")}
            />
            <label>Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              value="expense"
              name="type"
              placeholder="Enter amount"
              checked={type === "expense"}
              onChange={(e) => setType("expense")}
            />
            <label>Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            required
            placeholder="Enter amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button className="btn" disabled={isLoading} type="submit">
          {editMode ? "Update Transaction" : "Add Transaction"}
        </button>
        {!isLoading && isError && <p>There is was error</p>}
      </form>

      {editMode && (
        <button className="btn cancel_edit" onClick={cancelEditMode}>
          Cancel Edit
        </button>
      )}
    </div>
  );
}
