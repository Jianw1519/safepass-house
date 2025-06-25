const passwordInput = document.getElementById('password');
const copyBtn = document.getElementById('copyBtn');
const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('lengthValue');
const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('symbols');
const generateBtn = document.getElementById('generateBtn');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const NUM = '0123456789';
const SYM = '!@#$%^&*()-_=+[]{};:,.<>?/';

function generatePassword() {
  let chars = '';
  if (uppercase.checked) chars += UPPER;
  if (lowercase.checked) chars += LOWER;
  if (numbers.checked) chars += NUM;
  if (symbols.checked) chars += SYM;
  if (!chars) return '';
  let pwd = '';
  for (let i = 0; i < lengthSlider.value; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pwd;
}

function evaluateStrength(pwd) {
  let score = 0;
  if (pwd.length >= 12) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (pwd.length < 8) score = 0;
  return score;
}

function updateStrength(pwd) {
  const score = evaluateStrength(pwd);
  let color = '#e5e7eb', text = '弱';
  if (score >= 4) { color = '#10b981'; text = '强'; }
  else if (score >= 3) { color = '#f59e42'; text = '中'; }
  else if (score >= 2) { color = '#f87171'; text = '弱'; }
  strengthBar.style.background = color;
  strengthText.textContent = text;
}

function refreshPassword() {
  const pwd = generatePassword();
  passwordInput.value = pwd;
  updateStrength(pwd);
}

lengthSlider.addEventListener('input', () => {
  lengthValue.textContent = lengthSlider.value;
  refreshPassword();
});
[uppercase, lowercase, numbers, symbols].forEach(cb => {
  cb.addEventListener('change', refreshPassword);
});
generateBtn.addEventListener('click', refreshPassword);

copyBtn.addEventListener('click', () => {
  if (!passwordInput.value) return;
  passwordInput.select();
  document.execCommand('copy');
  copyBtn.textContent = '已复制!';
  setTimeout(() => copyBtn.textContent = '复制', 1200);
});

// 初始化
refreshPassword(); 