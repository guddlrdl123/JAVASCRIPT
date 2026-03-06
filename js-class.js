/* 프로토타입과 클래스 */
// 객체 생성자 : 함수를 통해서 새로운 객체를 만들어 주는 함수.
function Animal(type, name, sound){
    this.type = type;
    this.name = name;
    this.sound = sound;
    this.say = function() {
        console.log(this.sound)
    };
}

// 객체 생성
const cat = new Animal('고양이', '야옹이', '이야~옹');
const dog = new Animal('개', '똥개', '멍멍멍');
// 생성된 객체의 함수를 호출해서 요소를 출력
cat.say()
dog.say()

// =============================================================================
// 프로토타입 : 특정 함수 또는 값을 재사용할 수 있게 한다.
// 프로토타입은 객체 생성자 함수 아래에 "".prototype.[원하는 key] = 코드" 로 입력해서 설정

// 객체 생성자
function Animal(type, name, sound){
    this.type = type;
    this.name = name;
    this.sound = sound;
}

// 객체 생성자에 포로토타입 지정
Animal.prototype.say = function(){
    console.log(this.sound);
}

Animal.prototype.sharedValue = 1;
// 객체 생성
const catProto = new Animal('고양이', '야옹이', '야옹');
const dogProto = new Animal('개', '똥개', '멍');
// 생성된 객체의 함수를 호출해서 요소를 출력
catProto.say()
dogProto.say()
// Animal 객체 생성자를 사용하고 있는 경우에 공통으로 적용되었습니다.
console.log(dogProto.sharedValue)
console.log(catProto.sharedValue)

// =============================================================================
// 객체 생성자를 상속 받기

// 객체 생성자
function Animal(type, name, sound){
    this.type = type;
    this.name = name;
    this.sound = sound;
}

// 객체 생성자에 포로토타입 지정
Animal.prototype.say = function(){
    console.log(this.sound);
}
Animal.prototype.sharedValue = 1;

// 객체 생성자 상속
// Dog 객체 생성자가 Animal 객체 생성자를 상속 받는 부분
function Dog(name, sound){
    Animal.call(this, "개", name, sound);
}
Dog.prototype = Animal.prototype;

// Cat 객체 생성자가 Animal 객체 생성자를 상속 받는 부분
function Cat(name, sound){
    Animal.call(this, "고양이", name, sound);
}
Cat.prototype = Animal.prototype;

const dogh = new Dog('바둑이', '멍멍');
const cath = new Cat('야옹이', '야옹');

dogh.say();
cath.say();

// =============================================================================
// 클래스 : ES6부터 생성된 문법
// 객체 생성자로 구현했던 부분을 코드로 좀 더 명확하고 깔끔하게 구현할 수 있게 했다.

// 위에 생성한 객체 생성자 Animal을 클래스 문법으로 생성!!
class Animal {

    // 생성자
    constructor(type, name, sound){
        this.type = type;
        this.name = name;
        this.sound = sound;
    }
    // 메서드 선언 (prototype으로 등록)
    say() {
        console.log(this.sound);
    }

}

const dogClass = new Animal('개', '멍멍이', '왈왈');
const catClass = new Animal('고양이', '야옹이', '야옹');
dogClass.say()
catClass.say()

// =============================================================================
// 클래스의 상속
class Dog extends Animal {
    constructor(name, sound) {
        super('개', name, sound);
    }
}
class Cat extends Animal {
    constructor(name, sound) {
        super('고양이', name, sound);
    }
}

const dogSub = new Dog('멍멍이', '왈왈');
const catSub = new Cat('야옹이', '야옹');
dogSub.say()
catSub.say()

// =============================================================================
// 자바스크립트를 이용한 클래스 생성해서 확인
// 클래스 Food
// 멤버 : name(String), brand(Array)
// 메서드 : addBrand(brand) -> 브랜드 추가

class Food {
    // 자바스크립트 클래스에 constructor는 하나만 선언 가능
    constructor(name){
        this.name = name;
        this.brand = [];
    }
    add(brand){
        this.brand.push(brand);
    }
    print(){
        console.log(this.name +'을/를 파는 음식점들');
        console.log(this.brand.join(', '));
    }
}

const pizza = new Food('피자');
pizza.add('피자헛');
pizza.add('도미노');
pizza.add('노모어');
pizza.print();


