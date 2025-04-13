// MongoDB가 완전히 시작될 때까지 대기
sleep(5000);

// 관리자 데이터베이스에 연결
db = db.getSiblingDB('admin');

// 이미 사용자가 있는지 확인
const adminExists = db.getUser('admin');
if (!adminExists) {
    // 관리자 사용자 생성
    db.createUser({
        user: 'admin',
        pwd: 'admin123',
        roles: [{ role: 'root', db: 'admin' }]
    });
}

// 테스트 데이터베이스에 연결
db = db.getSiblingDB('weather_test');

// 이미 사용자가 있는지 확인
const testUserExists = db.getUser('test_user');
if (!testUserExists) {
    // 테스트 데이터베이스 사용자 생성
    db.createUser({
        user: 'test_user',
        pwd: 'test123',
        roles: [{ role: 'readWrite', db: 'weather_test' }]
    });
}

// 대기 함수
function sleep(milliseconds) {
    const start = new Date().getTime();
    while (new Date().getTime() - start < milliseconds) {
        // 대기
    }
} 