// 유효한 정답인지 확인하는 함수
export const validAnswer = (answer) => {
  for (let i = 0; i < answer.length; i++) {
    // 중복된 숫자가 있는 경우 false를 반환
    if (answer.indexOf(answer[i]) !== i) return false;
  }
  return true;
}

// 정답 생성 함수
export const createAnswer = () => {
  // 정답 범위
  const max = Math.pow(10, 4) - 1;
  const min = Math.pow(10, 3);

  // 유효한 정답이 나올 때까지 반복하여 난수 생성
  while (true) {
    // 난수 생성
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min).toString().split('');
    // 유효한 정답인 경우
    if (validAnswer(randomNumber)) {
      return randomNumber;
    }
  }
}

// 결과 확인 함수
export const checkAnswer = (answer, userAnswer) => {
  const result = {'strike': 0, 'ball': 0, 'out': 0};

  // 유저 정답을 순회하며 정답과 비교
  for (let i = 0; i < userAnswer.length; i++) {
    // 스트라이크 (숫자와 위치를 맞춘 경우)
    if (userAnswer[i] === answer[i]) result.strike++;
    // 볼 (숫자를 맞춘 경우)
    else if (answer.includes(userAnswer[i])) result.ball++;
    // 아웃 (아무것도 못 맞춘 경우)
    else result.out++;
  }

  return result;
}

// 사용자 정답 가져오는 함수
export const getUserAnswer = () => {
  // input 값 가져오기
  const input0 = document.getElementById('user-input-0').value;
  const input1 = document.getElementById('user-input-1').value;
  const input2 = document.getElementById('user-input-2').value;
  const input3 = document.getElementById('user-input-3').value;

  // 사용자 정답
  const userAnswer = [input0, input1, input2, input3];

  // 빈 문자열인 경우
  if (userAnswer.includes('')) {
    alert('4자리 수를 입력해주세요.');
    return [];
  }

  // 유효한 정답이 아닌 경우
  if (!validAnswer(userAnswer)) {
    alert('유효한 숫자가 아닙니다. (각 자리 수 중복 불가)');
    return [];
  }

  // 숫자가 아닌 경우
  if (isNaN(input0) || isNaN(input1) || isNaN(input2) || isNaN(input3)) {
    alert('숫자만 입력해주세요.');
    return [];
  }

  return userAnswer;
}

// div 생성 함수
export const getDiv = (text, className) => {
  // div 생성
  const div = document.createElement('div');
  // textNode 생성
  const textNode = document.createTextNode(`${text}`);
  // 클래스 추가
  div.classList.add(className);
  // textNode 추가
  div.appendChild(textNode);

  return div;
}

// button 생성 함수
export const getButton = (text, className) => {
  // button 생성
  const button = document.createElement('button');
  // textNode 생성
  const textNode = document.createTextNode(`${text}`);
  // 클래스 추가
  button.classList.add(className);
  // textNode 추가
  button.appendChild(textNode);

  return button;
}