const API_URL = process.env.NODE_ENV === 'production'
? "http://daelimcodewars-env.eba-tqivexwz.us-east-1.elasticbeanstalk.com"
: "http://localhost:8000";

export const getProblemList = () => {
    return fetch(`${API_URL}/problems`)
    .then(res => res.json());
};

export const postUserSolution = async (problemId, code) => {
    return fetch(`${API_URL}/problems/${problemId}`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({ code })
    }).then(res => res.json(res));
};