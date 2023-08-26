// 生成随机数作为答案
const answer = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function checkGuess() {
  const guessInput = document.getElementById('guessInput');
  const guess = parseInt(guessInput.value);
  const result = document.getElementById('result');

  if (isNaN(guess) || guess < 1 || guess > 100) {
    result.textContent = '请输入1到100之间的有效数字。';
  } else {
    attempts++;
    if (guess === answer) {
      result.textContent = `恭喜！你猜对了，答案是${answer}，你用了${attempts}次猜测。`;
      guessInput.disabled = true;
    } else {
      const hint = guess < answer ? '大一点' : '小一点';
      result.textContent = `猜错了，${hint}。你已经猜了${attempts}次。`;
    }
  }
}
