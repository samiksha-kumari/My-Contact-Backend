// write a program to find 2nd number of an array 

const Promise =  new Promise((resolve, reject)  = {
    // new promise creates new promise object
})
return Promise

// a promise to simulate fetching data from a server:

const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = {message: "data fetehed successfully"}
            resolve(data)
        }, 2000)
    })

};
fetchData() 
    .then((data) => {
        console(data)
    })
    .catch((err) => {
        console.log(err)
    })

    //closeure
function createCounter() {
    let count = 0;
    return function() {
        count++;
        return count;
    }
}

const counter =  createCounter()
console.log(counter());
console.log(counter());