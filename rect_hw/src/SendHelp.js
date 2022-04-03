import React from 'react';

const SendHelp = ( { urgency_needed ,index, urgency, title, content, due } ) => {

    return (
        (urgency_needed == urgency || urgency_needed == "전체") ? (
        <div className="one">
            <h4>[{index}] {title}</h4>
            <p>중요도: {urgency}</p>
            <p>내용: {content}</p>
            <p>기한: {due}</p>
        </div>
        ) : (<></>)
    );
};

export default SendHelp;