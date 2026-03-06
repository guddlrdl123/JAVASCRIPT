// 객체 구조분해, 배열 구조분해, 전개 연산자

// 1. 객체 구조분해(함수에 매개변수 값 전달)
// - 객체 내에 있는 속성(멤버)을 짧은 코드로 추출해서 변수화

// 객체 생성 방법 : 
// 1. 객체 생성자, 클래스 이용 - 동일한 구조로 객체를 생성하기 위해서
// 2. {}에 키:값을 지정하는 방법 - 자유로운 객체 구성

// 객체 생성
const user = {name: '테스터', age:20, job:'학생'};

// user 객체의 값을 각각의 변수를 선언해서 사용
// 구조 분해X
const name = user.name;
const age = user.age;
const job = user.job;
// 구조 분해 사용
const {name:userName, age:userAge, job:userJob} = user;

console.log('user의 내용 : ' + userName +', '+ userAge + ', ' +userJob);

// 배열의 구조분해
// 배열의 구조분해는 배열의 값을 순서대로 변수에 분해 할당.
const color = ['orange', 'black','blue', 'red'];
const [primary,, secondary, other] = color;
console.log(primary);
// console.log(nothing);
console.log(secondary);
console.log(other);

// =============================================================================
// 3. 전개 연산자(spread operator)
//  : 객체 또는 배열의 복사본을 만들고 불변성을 유지하게 한다.
//    기존 데이터를 복사해서 변경 부분에 덮어씌우는 형태로 구동하는 spread operator.

// 배열 전개 : 기존 배열은 유지하면서 새로운 항목이 추가
// ... : 전개 연산자
const oldList = [1, 2];
const newList = [...oldList, 3, 4, 5];
const newList2 = [3, 4, 5, ...oldList];
console.log(newList);
console.log(newList2);

// 객체 전개 : 특정 속성에 대해서 업데이트 처리
const status1 = {id: 1, text: '공부 중', completed: false};
const updateStatus = {...status1, completed: true};
console.log(updateStatus); // { id: 1, text: '공부 중', completed: true }

// rest : spread와 비슷하지만 역할이 다름.
//  -> 배열이나 객체에 특정 대상을 제외한 내용을 만들고 싶은 경우에 사용.(배열도 사용 가능)
const purpleCuteslime = {name: '슬라임', attribute: 'cute', color: 'purple'}
const {color, ...rest} = purpleCuteslime;
console.log(color); // purple
console.log(rest); // { name: '슬라임', attribute: 'cute' }

// ** 함수의 파라미터에서 rest를 사용하는 경우에는 전달된 파라미터를 묶는 새로운 내용으로 처리
// ex) 숫자 파라미터를 입력 받아서 더하는 함수.
function sum1(a, b, c, d, e, f, g) {
    let sum = 0;
    sum += a;
    sum += b;
    sum += c;
    sum += d;
    sum += e;
    sum += f;
    sum += g;
    return sum;
}
// rest 사용시
function sum2(...rest){
    let sum = 0;
    rest.forEach(i => sum+= i);
    return sum;
}
const result = sum2(1,2,3,4,5,6,7,8,9,10);
console.log(result);

// 4. 템플릿 리터럴(Template Literals)
// : 자바에서 printf()와 비슷한 기능을 구현.
// 문자열 ' 또는 "을 사용하는 템플릿 리터럴은 백틱(`)을 사용하여 표현식을 자유롭게 삽입.
// 동적인 내용을 가지는 변수의 값, 클래스명, API 호출을 위해서 사용

const book = '리액트 잘하는 개발자 되기';
const author = '성낙현';
const id = '98898372921';

// const textbook = '책 이름 :' + book +', 저자 : '+author+',책 고유값 : '+id;

// 템플릿 리터럴 형식으로 작성
const textbook = `책 이름 : ${book}, 저자 : ${author}, 책 고유값 : ${id}`;
console.log(textbook);

// url 주소 설정 동적 처리, 동적으로 Component 호출
const books = 'books';
const id2 = 9791194383536;
const apiUrl = `https://goldenrabbit.co.kr/${books}/${id2}`;

console.log(apiUrl);


// 정리 문제
// 1. funtion(a, b) { return (a*a)+(b*b);} 함수를 화살표 함수로 정의하고 실행
const quiz1 = (a,b) => {
    return (a*a)+(b*b);
}
const result2 = quiz1(2, 3);
console.log(result2);

// 2. 구조 분해 할당 : title과 author만 추출해서 변수로 선언해서 출력하기
const bookex = {id: 1, title:"리액트 잘하는 개발자 되기", author: "성낙현", price: 34000};

const {title, author} = bookex;
console.log(title+author);

// 3. 전개 연산자 : users 배열에 새로운 사용자 추가
// ex) {id: 3, name: '아무개'} 식으로 3명 추가 후 전체 출력
const users = [{id:1, name:'홍길동'}, {id:2, name:'이순신'}];
const newUser = [...users,{id:3, name:'아무개'}, {id:4, name:'이성계'}, {id:5, name:'유관순'}];

console.log(newUser);

// 4. score가 80점 이상일 때, "당신의 점수는 80점 이상입니다." 를 출력하는 문장을 템플릿 리터럴 사용해서 구현.
const score = 81;
console.log(score>=80 ? `당신의 점수는 ${score}점 이상입니다.` : `당신의 점수는 ${score}점 이하입니다.`);