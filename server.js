// server.js
const express = require("express");
const cors = require("cors");
let data = {message: "여러분 메롱!"}; // 초기 데이터
const app = express();
app.use(
    cors({
        origin: "http://127.0.0.1:5500",
        methods: ["OPTIONS", "POST", "GET", "PUT", "DELETE"],
    })
);
app.use(express.json());
app.use(express.text());

// OPTIONS 요청은 사전 요청(preflight request) 역할
app.options("/", (req, res) => {
    return res.send("요청 보내세요");
});
// get 요청
app.get("/", (req, res) => {
    return res.json(data);
});
// put 요청
// 업데이트할 데이터를 전달하면, 서버는 해당 데이터를 받아서 업데이트 작업을 수행
app.put("/", (req, res) => {
    console.log("받은 메시지:", req.body); // 요청(객체형태)
    const body = req.body.message; // 클라이언트가 보낸 메시지
    console.log("새로운 메시지:", body);

    // 데이터 업데이트
    data.message = body;
    console.log("업데이트된 데이터:", data.message);

    // 응답
    return res.send("새로운 메세지가 업데이트 되었습니다");
});
// delete
app.delete("/", (req, res) => {
    data.message = "";
    console.log(data.message);
    return res.send("메세지가 삭제되었습니다");
});

// 서버열기
app.listen(3000, () => {
    console.log("서버가 http://localhost:3000/ 에서 실행 중입니다.");
});
