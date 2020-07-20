import SAMPLE from '../data/problems.json';

export const getProblemList = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(SAMPLE);
        }, 1000);
    });
};