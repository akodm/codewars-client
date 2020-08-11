import React, { useState, useEffect } from 'react';
import './App.css';
import { getProblemList } from './api/problems';
import ProblemDetail from './ProblemDetail';
import { BrowserRouter as Rotuer, Route, Link } from 'react-router-dom';

function App() {
    const [ problems, setProblems ] = useState([]);

    useEffect(() => {
        async function getProblems() {
            const data = await getProblemList();
            setProblems(data);
        }

        getProblems();
    }, []);

    return (
        <Rotuer>
            <div className="App">
                <Route exact path="/">
                    <>
                        <nav>
                            CodeWars
                        </nav>
                        <ul>
                            {
                                problems.map((problem) => {
                                    return (
                                        <li key={problem.id}>
                                            <h3>{problem.title}</h3>
                                            <Link to={`/problems/${problem._id}`}>
                                                <button>문제풀기</button>
                                            </Link>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </>
                </Route>
                <Route 
                    path="/problems/:problem_id"
                    render={routeProps => {
                        const problemId = routeProps.match.params.problem_id;
                        const [ selectedProblem ] = problems.filter(data => data._id === problemId);
                        
                        return (
                            <ProblemDetail problem={selectedProblem} />
                        );
                    }}
                >
                </Route>
            </div>
        </Rotuer>
    );
}

export default App;