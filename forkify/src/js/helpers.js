import {TIME_OUT_SEC} from './config.js';

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};


export const getJSON = async function(url){
    try{
        const res = await Promise.race([fetch(url), timeout(TIME_OUT_SEC)]);
        const data = await res.json();
        if(!res.ok) throw new Error(`${data.message} (${res.status})`);
        return data;
    }
    catch(err){
        throw err;
    }
};

export const sendJSON = async function(url, data){
    try{
        const res = await Promise.race([fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }), timeout(TIME_OUT_SEC)]);

        if(!res.ok) throw new Error(`${data.message} (${res.status})`);
    }
    catch(err){
        throw err;
    }
};