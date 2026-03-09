// 자바스크립트에서의 비동기 처리(통신)

const { useCallback } = require("react");

/*
1.동기적 처리(Synchronous) : 순차적 처리. 작업이 들어온 순서대로 하나씩 처리하는 방식
    특징 :
    - 순서대로 처리
    - 앞에 처리할 내용이 끝나야 다음 처리를 진행.(**)
    - 앞에 처리할 내용이 delay가 생기는 경우, 전체 시간이 늘어남.

2. 비동기적 처리 : 작업이 들어온 순서대로 처리하는 것이 아니라 동시에 처리한다는 개념
    특징 :
    - 거의 동시에 작업을 시작함.
    - 작업의 끝은 가장 긴 작업 시간이 된다.
    - 거의 동시에 작업하기 때문에 여러 개 작업을 병행하면서 처리하는 듯한 효과를 가져올 수 있다.
*/

// 예제 - 동기적 작업 흐름. [work() -> console.log('다음 작업')]
function work(){
    // Date 자바스크립트가 가지고 있는 기본 객체
    const start = Date.now();
    for(let i=0; i<10000000000000; i++){}
    const end = Date.now();
    console.log(end-start +'ms');
}
work();
console.log("다음 작업")

// work()가 동작 중에 다른 작업을 처리하고 싶은 경우. (비동기적 작업)
// setTimeout() 함수를 사용하여 처리할 수 있음.

function workAsyn(){
    setTimeout(() => {
        const start = Date.now();
        for(let i=0; i<10000000000; i++){}
        const end = Date.now();
        console.log(end-start +'ms');
    }, 0) // timeout? 옵션은 특정 시간이 지난 후에 호출...
}

// 작업 흐름 : console.log('작업 시작') -> workAsyn() -> console.log('다음 작업')
console.log('작업 시작');
workAsyn(); // setTimeout()을 사용하면, 백그라운드에서 수행.
console.log('다음 작업');

// 지금 비동기적으로 동작하는 workAsyn()가 끝난 다음에 어떤 작업을 진행하고 싶을 때
function workAsyn(callback){
    setTimeout(() => {
        const start = Date.now();
        for(let i=0; i<10000000000; i++){}
        const end = Date.now();
        console.log(end-start +'ms');
        callback(); // 콜백 함수란, 함수 타입의 값을 파라미터로 넘겨 줘서, 파라미터로 받은 함수를 
                        // 특정 작업이 끝나면 호출을 해주는 것을 의미함. 
    }, 0) // timeout? 옵션은 특정 시간이 지난 후에 호출...
}

console.log('작업 시작');
workAsyn(() => {
    console.log('비동기 함수 workAsyn 작업 끝');
}); // () => {} 함수 인자값을 넘기면, 내부에 있는 callback()이 받아서 실행.
console.log('다음 작업');

// 비동기 작업하는 경우,
// - Ajax Web API 요청 처리 : 서버측 데이터를 받아와야 하는 경우, 요청하고 서버에서 응답할 때까지 대기해야 한다.
//                          이런 이유로 보통 비동기 작업 처리.
// - 파일 읽기 : 주로 서버 쪽에서 파일을 읽어야 하는 경우에 비동기 작업 진행.
// - 암호화/복호화 : 암호화/복호화 할 때 바로 처리되지 않고, 시간이 어느정도 정도 걸리는 경우
// - 작업 예약 : 스케줄링을 통해서 특정 시점에서 동작해야 하는 경우, setTimeout(handler, timeout?)
// 등등...

// 1. Promise : ES6에서 도입된 기능
//      ES5 이전에는 callback을 이용한 비동기 작업 처리함
//      비동기 작업이 많아질 경우에 콜백을 사용하는 경우, 코드가 난잡해지게 된다.
//      Promise를 사용하면 이런 현상을 방지할 수 있다.

// 예시) 콜백을 많이 사용하는 경우
function increaseAndPrint(n, callback) {
  setTimeout(() => {
    const increased = n + 1;
    console.log(increased);
    if (callback) { // 콜백이 있다면,
      callback(increased);
    }
  }, 1000);
}

increaseAndPrint(0, n => {
  increaseAndPrint(n, n => {
    increaseAndPrint(n, n => {
      increaseAndPrint(n, n => {
        increaseAndPrint(n, n => {
          console.log('끝!');
        });
      });
    });
  });
});

// 1) Promise 만들기
const myPromise = new Promise((resolve, reject) =>{
    // 구현...
})
// resolve와 reject를 사용하는 이유는 성공시와 실패시 호출할 함수를 결정하게 하기 위해서.
// 실패 여부를 생각하지 않으면, reslove에 대한 내용만 정의하면 됨.

// 실패를 생각하지 않고, 예제 생성
const myPromise1 = new Promise((resolve, reject) =>{
    setTimeout(()=>{
        resolve(1);
    },1000)
});

// then() : 작업이 끝난 이후에 또다른 작업을 진행해야 하는 경우에 사용함
myPromise1.then(n => {
    console.log(n);
})

// 실패를 감안한 경우
const myPromise2 = new Promise((resolve, reject) =>{
    setTimeout(()=>{
        // resolve(1);
        reject(new Error());
    },1000)
});

myPromise2
.then(n =>{ // 성공시
    console.log(n);
})
.catch(error => {
    console.log(error);
})

// 위에 callback으로 만들어진 비동기를 promise로 구현
function increaseAndPrintPromise(n) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const value = n + 1;
            if(value == 5) {
                const error = new Error();
                error.name = 'VauleIsFiveError';
                reject(error);
                return;
            }
            console.log(value);
            resolve(value);
        }, 1000);
    });
  
}

increaseAndPrintPromise(0).then(n => {
    console.log('첫 번째 then');
    return increaseAndPrintPromise(n);
}).then(n => {
    console.log('두 번째 then');
    return increaseAndPrintPromise(n);
}).then(n => {
    console.log('세 번째 then');
    return increaseAndPrintPromise(n);
}).then(n => {
    console.log('네 번째 then');
    return increaseAndPrintPromise(n);
}).then(n => {
    console.log('다섯 번째 then');
    return increaseAndPrintPromise(n);
}).then(n => {
    console.log('여섯 번째 then');
    return increaseAndPrintPromise(n);
})
.catch(e =>{
    console.log(e);
})
// 2. async/await(***)
// ES8에서 만들어진 문법. Promise를 더 쉽게 사용할 수 있게 해줌.

// 기본 사용법
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms)); // rejact시 처리하지 않음.
}

async function process() { // 비동기 작업을 포함하는 함수에 async를 사용함.
  console.log('안녕하세요!');
  await sleep(1000); // 1초쉬고 // 비동기 작업에 await 사용함.
  console.log('반갑습니다!');
}

process();

// **  async/await 문법을 사용할 때는 함수 선언부에 async를 함수 앞에 키워드로 붙여 줍니다. 
//   그리고, Promise로 사용될 부분에 await 키워드를 사용하면, 해당 프로미스가 끝날 때까지 기다렸다가
//   다음 작업을 수행합니다. 
//   그리고, async는 반환 값을 Promise로 넘겨주게 됩니다. 그말은 then을 사용할 수 있다는 말입니다. 


process().then(()=>{
    console.log('작업이 끝났습니다.');
})


// async 함수에 에러 발생시에는 throw를 사용하고, 에러를 제어하는 try/catch 구문을 사용.
// 에러 처리

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms)); // rejact시 처리하지 않음.
}

async function makeError() { // 비동기 작업을 포함하는 함수에 async를 사용함.
  await sleep(1000);
  const error = new Error();
  throw error; // 에러 발생
} 

async function process(){
    try { // 에러는 try/catch 구문으로 제어.
        await makeError(); 
    } catch (error) {
        console.error(e)
    }
}

process();

// 비동기 함수를 여러 개 사용하는 경우, 
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getDog = async () => {
    await sleep(2000);
    return '멍멍이';
}

const getRabbit = async () => {
    await sleep(500);
    return '토끼';
}

const getTurtle = async () => {
    await sleep(1000);
    return '거북이';
}

async function process() { 
    
    const dog = await getDog();
    console.log(dog)
    const rabbit = await getRabbit();
    console.log(rabbit)
    const turtle = await getTurtle();
    console.log(turtle)
}
process();

console.log("Promise.all() 사용")
async function processAll() { // promise.all() 사용 : 비동기 함수들을 동시에 실행
    const result = await Promise.all([getDog(), getRabbit(), getTurtle()]);
    console.log(result) // ['멍멍이', '토끼', '거북이']
    /*
    const [dog, rabbit, turtle] = await Promise.all([getDog(), getRabbit(), getTurtle()]);

    ## Promise.all() : 동시에 시작하느 비동기 중에 하나라도 실패하면, 모두 다 실패 처리.
    */
}
processAll();

// Promise.race() : 여러 개의 비동기적 함수를 등록해서 가장 빨리 끝난 것만 반환
//                  각 Promise가 실패했을 경우, 가장 먼저 끝난 비동기적 함수가 실패하면 실패로 간주.
//                  가장 먼저 끝난 비동기적 함수가 아닌 다른 비동기적 함수가 실패인 경우는 무시
console.log("Promise.race() 사용")
async function processRace() { // promise.all() 사용 : 비동기 함수들을 동시에 실행
    const result = await Promise.race([getDog(), getRabbit(), getTurtle()]);
    console.log(result) // ['멍멍이', '토끼', '거북이']
    /*
    const [dog, rabbit, turtle] = await Promise.all([getDog(), getRabbit(), getTurtle()]);

    ## Promise.all() : 동시에 시작하는 비동기 중에 하나라도 실패하면, 모두 다 실패 처리.
    */
}
processRace();

async function testDB() { // aysnc 함수의 결과는 Promise로 받아서 then() 처리 가능
    // fetch(url, header객체)
    await fetch("https://reqres.in/api/users", {
        method: 'GET',
        headers: {
            "x-api-key": "reqres_a5e69fafbe804c9abfe9915cd3372faa"
        }
    });
}
// testDB() 결과 Respone 객체(data 부분 -> ReadableStream)
// res 결과를 json() 함수는 결과를 json 형식으로 변환.
testDB().then(res => res.json()) 
        .then(results => console.log(results['data'])); // results는 json 처리된 결과
        // result['data']로 data 부분만 추출.

async function testDB() {
    return fetch("https://reqres.in/api/users", {
        method: 'GET',
        headers: {
            "x-api-key": "reqres_a5e69fafbe804c9abfe9915cd3372faa"
        }
    });
}

testDB()
  .then(res => res.json())
  .then(results => console.log(results['data']));