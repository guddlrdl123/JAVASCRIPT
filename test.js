console.log('test');

async function testDB() {
    return fetch("https://reqres.in/api/users", {
        method: 'GET',
        headers: {
            "x-api-key": "reqres_a5e69fafbe804c9abfe9915cd3372faa"
        }
    });
}
const results = testDB(); // testDB()의 결과를 results에 저장
// Response.json() : 응답 객체의 Data(body 부분)을 json 형식(String형식)으로 변환 
const body = results.then(response => response.json()); // data에는 response body 값이 json
const data = body.then(body => {
    console.log(body);
});
