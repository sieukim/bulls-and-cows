import {checkAnswer, createAnswer, validAnswer} from "./utils";

// 정답 생성
const answer = createAnswer();

// 사용자 정답 가져오는 함수
const getUserAnswer = () => {
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
const getDiv = (text, className) => {
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

// form onSubmit 핸들러
const onSubmit = (e) => {
  e.preventDefault();
  e.stopPropagation();

  // 사용자 정답
  const userAnswer = getUserAnswer();

  // 사용자 정답에 오류가 있는 경우
  if (userAnswer.length === 0) {
    return;
  }

  // 결과
  const result = checkAnswer(answer, userAnswer);

  // 결과 정보를 담는 컨테이너 가져오기
  const resultContainer = document.getElementById('result-container');

  // result-container에 결과 정보 추가
  const div = document.createElement('div');

  const userAnswerDiv = getDiv(`${userAnswer.join(' ')}`, 'result-row-user-answer');
  const strikeDiv = getDiv(`Strike ${result.strike}`, 'result-row-strike')
  const ballDiv = getDiv(`Ball ${result.ball}`, 'result-row-ball');
  const outDiv = getDiv(`Out ${result.out}`, 'result-row-out');

  div.classList.add('result-row');

  div.appendChild(userAnswerDiv);
  div.appendChild(strikeDiv);
  div.appendChild(ballDiv);
  div.appendChild(outDiv);

  resultContainer.appendChild(div);

  // 정답을 맞춘 경우
  if (result.strike === answer.length) {
    const button = document.createElement('button');
    const text = document.createTextNode('다시 하기');
    button.classList.add('replay-button');
    button.appendChild(text);
    button.addEventListener('click', () => location.reload());
    resultContainer.appendChild(button);
  }
}
// form 객체 가져오기
const form = document.getElementById('user-input-form');
// form 객체에 onSubmit 핸들러 등록
form.addEventListener('submit', onSubmit);