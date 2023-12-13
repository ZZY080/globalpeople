import { useEffect, useRef, useState } from 'react';
import axios from "axios";
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(0);
  const [a, setA] = useState({
    age: 18,
    sex: "南",
  })
  const inputRef = useRef();


  const getListData = () => {
    axios.get("https://api.oioweb.cn/api/common/history")
  }
  const handle = (e) => {
    console.log(e)
    setCount(count + 1);
  }
  useEffect(() => {
    console.log(1);
    const interval = setInterval(() => {
      setTime((time) => {
        return time + 1
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  }, []);
  const changeA = () => {
    setA((old) => {
      old.age = 19;
      let newold = { ...old };
      return newold;
    })
  }
  useEffect(() => {
    changeA();
  }, []);

  const handleInput = () => {
    console.log(inputRef.current.value);
  }


  return (
    <>
      <div className="card">
        <button onClick={(e) => handle(e)}>
          count is {count} time {time} a: {a["age"]}
        </button>
      </div>
      <div>
        <input type="text" ref={inputRef} onChange={handleInput} />
      </div>

    </>
  )
}

export default App
