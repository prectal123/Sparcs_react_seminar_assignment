import React, {useState, useEffect} from 'react';
import './App.css';
import SendHelp from './SendHelp';

const App = () => {

  const default_chart = [
    { index: 1, urgency : "중간", title: "스팍스 과제", content: "리액트 과제", due: "2022-04-17"},
  ];

  const [chart, SetChart] = useState(default_chart);

  const [input_values, Set_inputs] = useState( { index: 2, urgency : "", title : "", content : "", due : "" } )
  const [maxIndex, set_index] = useState(1);
  const [what_to_delete, set_what_to_delete] = useState(0);
  const [urgency_filter, set_filter] = useState("전체");
  const [filter_temp, set_filter_temp] = useState("전체");

  const {index, urgency, title, content, due} = input_values;
  
  const changed = (e) => {
    const {value, name} = e.target;
    Set_inputs({...input_values,[name]: value});
  };

  const changed_del = (e) => {
    set_what_to_delete(e.target.value);
  }

  const filter_change = (e) => {
    set_filter_temp(e.target.value);
  }

  const filter_on = () => {
    if(!["전체", "높음", "중간", "낮음"].includes(filter_temp)){alert("필터링 형식을 지켜주십시오.\n (전체, 높음, 중간, 낮음 중 하나)"); return;}
    set_filter(filter_temp);
  }
  
  const deleter = () => {
    if(what_to_delete < 1 || what_to_delete > chart.length) {alert("존재하지 않는 인덱스 입니다."); return;}
    var temp_chart = chart;
    var i = 0
    for(;i<temp_chart.length;i++)
    {
      if(i === what_to_delete - 1){ temp_chart.splice(i,1); break;}
    }
    for(;i<temp_chart.length;i++)
      {
        temp_chart[i].index = i+1;
      }

      SetChart(temp_chart);
      console.log(maxIndex);
      set_index(maxIndex - 1);
      Set_inputs({...input_values, index: maxIndex});
  }

  const clickHandler = () => {
    if(urgency == "") {alert("중요도는 반드시 기입해주십시오"); return;}
    if(urgency != "높음" && urgency != "중간" && urgency != "낮음"){alert("중요도의 형식을 지켜주십시오.\n (높음, 중간, 낮음 중 하나)"); return;}
    if(title == "") {alert("제목은 반드시 기입해주십시오"); return;}
    if(due == "") {alert("기한은 반드시 기입해주십시오"); return;}
    
    
    SetChart(chart.concat(input_values));
    set_index(maxIndex+1);
    Set_inputs( { index: maxIndex+2, urgency: "", title: "", content: "", due: ""} );
  };
  
  return (
    <div>
      <header>
        <h1>장하준 miru의 Todo list</h1>
        <h2>Sparcs React Assignment</h2>
        <input 
          value={filter_temp}
          placeholder="필터(높음,중간,낮음,전체)"
          name="urgency_filter"
          onChange={filter_change}
        />
        <button onClick={filter_on}>필터 적용</button>
      </header>
      {chart.map((one) => <SendHelp urgency_needed={urgency_filter} index={one.index} urgency={one.urgency} title={one.title} content={one.content} due={one.due} />)}
      <p>새로 만들고 싶으면 아래를 기입하세요</p>
      <br />
      <input 
        value={urgency}
        placeholder="중요도 (높음,낮음,중간)"
        name="urgency"
        onChange={changed}
      />
      <input
        value={title}
        placeholder="제목을 입력하세요"
        name="title"
        onChange={changed}
      />
      <br />
      <input
        value={content}
        placeholder="내용을 입력하세요"
        name="content"
        onChange={changed}
      />
      <br />
      <input
        type="date"
        value={due}
        placeholder="기한을 입력하세요"
        name="due"
        onChange={changed}
      />
      <br />
      <button onClick={clickHandler}>추가하기</button>
      <br />
      <br />
      <p>삭제하고자 하는 인덱스를 입력하고 버튼을 누르세요</p>
      <br />
      <input
        value={what_to_delete}
        name="what_to_delet"
        onChange={changed_del}
        />
        <button onClick={deleter}>삭제하기</button>
    </div>
  );
}

export default App;
