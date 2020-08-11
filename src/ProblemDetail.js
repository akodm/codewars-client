import React, { useState } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import { postUserSolution } from './api/problems';

export default function ProblemDetail({ problem }) {
    const [ code, setCode ] = useState("");
    const [ isModalShowing, setIsmodalShowing ] = useState(false);
    const [ codeResult, setCodeResult ] = useState("");

    function validateAnswer() {
        postUserSolution(problem._id, code).then(data => {
            if(data.result !== "에러") {
                setCodeResult(data.result);
            } else {
                setCodeResult(data.detail);
            }
            
            setIsmodalShowing(true);
        });
    }

    return (
        <div className="problem">
            { 
                isModalShowing &&
                <>
                    <div className="modal-overlay" onClick={() => setIsmodalShowing(false)}></div>
                    <div className="modal">
                        { codeResult }
                        <button onClick={() => setIsmodalShowing(false)}>Close</button>
                    </div>
                </>
            }
            <section className="description">
                <h3>{problem.title}</h3>
                <p>{problem.description}</p>
            </section>
            <section className="code-editor">
                <CodeMirror 
                    onChange={(newValue) => setCode(newValue)}
                    value={"function solution() { }"} 
                    options={{
                        mode: 'javascript'
                    }}
                />
                <button onClick={() => validateAnswer()}>제출</button>
            </section>
        </div>
    );
}