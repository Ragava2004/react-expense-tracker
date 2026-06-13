import { useEffect, useState } from "react";
function App() {
  const[name, setName] = useState("");
  const[amount, setAmount] = useState("");
  const[category, setCategory] = useState("");
  const[filterCategory, setFilterCategory] = useState("");
  const [expense, setExpense] = useState(() => {
  const savedExpenses = localStorage.getItem("expenses");

  if (savedExpenses) {
    return JSON.parse(savedExpenses);
  }

  return [];
});
  //adding expense
  const addExpense = () => {
    if(name === "" || amount === "" || category === "") {
      alert("Please fill the input");
      return;
    }
    setExpense([...expense, {name, amount, category}])
    setName("");
    setAmount("");
    setCategory("");
  }

  //Deleting expense
  const deleteExpense = (index) => {
    const newExpense = expense.filter((e,i)=>{
      return i !== index;
    })
    setExpense(newExpense)
  }
   //filtering
  const filteredExpenses = expense.filter((e)=>{
    if(filterCategory === "") return true;
    return e.category === filterCategory;
  })
  //
  ///total expense
  const totalExpense = filteredExpenses.reduce((total,item)=>{
    return total+Number(item.amount);
  },0);
  
  

  
  useEffect(()=>{
    localStorage.setItem("expenses", JSON.stringify(expense));
  },[expense]);
 
  useEffect(()=>{
    const savedExpenses = localStorage.getItem("expenses");
    console.log("Saved:", savedExpenses);

    if(savedExpenses) {
    const parsedExpenses = JSON.parse(savedExpenses);
    setExpense(parsedExpenses);
  }
  },[])
  

    return(
      <div className="app">
        <h1>Expense Tracker</h1>
        {/* Form Section */}
        <div className="expense-card">
          <h3>Expense Name</h3>
          <input type="text" placeholder="Movies" value={name} onChange={(e)=>setName(e.target.value)}></input>
          <h3>Amount</h3>
          <input type="number" placeholder="60" value={amount} onChange={(e)=>setAmount(e.target.value)}></input>
          
          <select value={category} onChange={(e)=>setCategory(e.target.value)}>
            <option value="">Select the category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Entertaiment">Entertaiment</option>
          </select>
          
          <button className="add-btn" onClick={addExpense}>
          Add Expense
          </button>  
        </div>

      {/*Filter setion*/}
      <div className="filter-section">
        <select value={filterCategory} onChange={(e)=>setFilterCategory(e.target.value)}>
          <option value="">Show all the category (filter) </option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Entertaiment">Entertaiment</option>
        </select>
      </div>

      {/* Expense List */}
      <div className="expense-list">
        {filteredExpenses.length === 0 ? (
          <div className="empty-state">
            No expenses found.
          </div>
          ) : (
            filteredExpenses.map((e, index)=>{
            return(
              <div className="expense-item" key={index}>
                <div>
                  <strong>{e.name}</strong>
                  <p>₹{e.amount}</p>
                  <span className="category-badge">
                    {e.category}
                  </span>
                </div>
                <button onClick={()=>deleteExpense(index)} className="delete-btn">Delete</button>
              </div>
            );
          })
        )}
      </div>
        <div className="total-expense">
          Total Expense: ₹{totalExpense}
        </div>
      </div>
    );
}

export default App;