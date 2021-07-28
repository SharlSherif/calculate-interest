import { useState } from "react";
import "./App.css";

function App() {
  const [amount, setAmount] = useState(0);
  const [years, setYears] = useState(30);
  const [salary, setSalary] = useState(0);
  const [result, setResult] = useState(null);

  function calc(e, amount, years) {
    e.preventDefault();
    console.log(amount,years)
    if (amount <= 0 || years > 30 || years <= 0 || salary <= 0) return;
    let cash
    if(salary<=4500) {
      cash = (amount * 10) / 100;
    }else if(salary >=4500) {
      cash = (amount * 15) / 100;
    }
    amount -= cash

    let x = amount * (1.8 / 100);
    let y = x * years;
    const monthly = ((y + amount) / years) / 12;
    setResult({
      yearly: (y + amount) / years,
      years,
      monthly,
      cash,
      isPossible: salary * 0.4 >= monthly,
    });
  }
  const selectableYears = () => {
    let arr = [];
    for (let i = 1; i <= 30; i++) {
      arr.push(i);
    }
    return arr;
  };

  return (
    <div className="container">
      <div className="row wrapper">
        <h1 className="col-12 mb-3" dir="rtl">
          حساب قيمة القسط الشهري لمبادره التمويل العقاري 3% لسنه 2021
        </h1>
        <hr />
        <div class="col-12">
          <form className=" justify-content-center mt-3">
            <div class="form-group">
              <label>مرتبك الشهري</label>
              <input
                type="number"
                class="form-control"
                placeholder="مثال:350000"
                onInput={(e) => setSalary(e.target.value)}
              />
            </div>
            <div class="form-group ">
              <label>ثمن الشقة</label>
              <input
                type="number"
                class="form-control"
                placeholder="مثال:350000"
                onInput={(e) => setAmount(e.target.value)}
              />
            </div>
            <div class="form-group mt-2">
              <label>عدد سنين القسط (حد اقصى 30 سنه)</label>
              <select
                class="form-control my-1 mr-sm-2"
                onInput={(e) => setYears(e.target.value)}
              >
                {selectableYears().map((n) => (
                  <option>{n}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              class="btn mt-2 btn-primary"
              onClick={(e) => calc(e, amount, years)}
            >
              احسب القسط
            </button>
          </form>
          {result?.isPossible && (
            <div class="col-12">
              <table class="table  table-bordered  mt-3">
                <thead>
                  <tr>
                    <th scope="col">هتدفع مقدم</th>
                    <th scope="col">هتدفع شهريا</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">{Math.trunc(result.cash)} ج</th>
                    <th scope="row">{Math.trunc(result.monthly)} ج</th>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {!result?.isPossible && result !== null && (
            <div
              class="alert alert-warning alert-dismissible fade show mt-3"
              role="alert"
            >
              مينفعش تقسط الشقة دي لان القسط الشهري اكثر من 40% من مرتبك الحالي
              ({salary} ج) لازم يكون القسط الشهري لا يتعدي ({salary * 0.4} ج)
              <br/>
              جرب تزود عدد السنين 
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
