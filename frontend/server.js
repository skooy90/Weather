const express = require('express');
const path = require('path');
const app = express();

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'dist')));

// API 프록시 설정
app.use('/api', (req, res) => {
  const targetUrl = `https://weather-backend-knii.onrender.com/api${req.url}`;
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': req.headers.authorization || ''
    }
  };

  if (req.method === 'GET') {
    fetch(targetUrl, options)
      .then(response => response.json())
      .then(data => res.json(data))
      .catch(error => res.status(500).json({ error: error.message }));
  } else {
    fetch(targetUrl, {
      ...options,
      method: req.method,
      body: JSON.stringify(req.body)
    })
      .then(response => response.json())
      .then(data => res.json(data))
      .catch(error => res.status(500).json({ error: error.message }));
  }
});

// 모든 라우트를 index.html로 리다이렉트 (SPA 지원)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 