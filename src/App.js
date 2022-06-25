import { useEffect, useState, useContext, useRef, useReducer, useMemo, useCallback } from 'react';
import YamaCodeContext from '.';
import './App.css';
import SomeChild from './SomeChild';
import useLocalStrage from './useLocalStrage';

const initalState = 0;

const reducer = (state, action) => {
  switch(action.type) {
    case "increment":
      return state + 1;
    case "dicrement":
      return state - 1;
    case "reset":
      return initalState  
    default:
      return state;
  }
};

function App() {
  const [ count, setCount ] = useState(0);
  const yamacodeInfo = useContext(YamaCodeContext)
  const ref = useRef();
  const [state, dispatch] = useReducer(reducer, initalState);
  
  const CountUp = () => {
    setCount(count + 1);
  }
  
  useEffect(() => {
    //第１引数には実行させたい副作用関数を記述
    console.log("依存データが更新され副作用関数が実行されました");
  }, [count]) //第２引数には副作用関数の実行タイミングを制御する依存データを記述
  
  const handleRef = () => {
    console.log(ref);
  }

  //useMemo 変数のメモ化
  const [count01, setCount01] = useState(0);
  const [count02, setCount02] = useState(0);

  const square = useMemo(() => {
    let i = 0;
    while(i < 1000000000) {
      i++;
    }
    console.log("レンダリングされました");
    return count02 * count02;
  }, [count02]); //第２引数に関数の実行タイミングを制御する依存データを記述


  //useCallBack 関数のメモ化
  const [counter, setCounter ] = useState(0);

  const showCount = useCallback(() => {
    alert("これは重い処理です")
  }, [counter])


  //カスタムフック
  const [age, setAge] = useLocalStrage("age", 26);

  return (
    <div className="App">
      <h1>useState, useEffect</h1>
      <p>{count}</p>
      <button onClick={CountUp}>+</button>
      <br/>
      <br/>
      <hr/>

      <h1>useContext</h1>
      <p>{yamacodeInfo.name}</p>
      <p>{yamacodeInfo.age}</p>
      <br/>
      <hr/>
      
      <h1>useRef</h1>
      <input type="text" ref={ref}/>
      <button onClick={handleRef}>useRef</button>
      <br/>
      <br/>
      <br/>
      <hr/>

      <h1>useReducer</h1>
      <p>{state}</p>
      <button onClick={() => dispatch({ type: "increment" })}>INCREMENT</button>
      <button onClick={() => dispatch({ type: "dicrement" })}>DICREMENT</button>
      <button onClick={() => dispatch({ type: "reset" })}>RESET</button>
      <br/>
      <br/>
      <br/>
      <hr/>

      <h1>useMemo</h1>
      <p>count01: {count01}</p>
      <p>count02: {count02}</p>
      <p>Result: {square}</p>
      <button onClick={() => setCount01(count01 + 1)}>count01 +</button>
      <button onClick={() => setCount02(count02 + 1)}>count02 +</button>
      <br/>
      <br/>
      <br/>
      <hr/>

      <h1>useCallBack</h1>
      <SomeChild showCount={showCount}/>
      <br/>
      <br/>
      <hr/>

      <h1>カスタムフック</h1>
      <p>{age}</p>
      <button onClick={() => setAge(80)}>年齢をセット</button>
      <br/>
      <br/>

    </div>
  );
}

export default App;
