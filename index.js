import {checkAnswer, createAnswer} from "./utils";

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
  return [input0, input1, input2, input3];
}

// form onSubmit 핸들러
const onSubmit = (e) => {
  e.preventDefault();
  e.stopPropagation();

  // 사용자 정답
  const userAnswer = getUserAnswer();

  // 정답과 사용자 정답의 길이가 다른 경우
  if (answer.length !== userAnswer.length) {
    return alert('오류가 발생했습니다. 다시 시도해주세요.');
  }

  // 결과
  const result = checkAnswer(answer, userAnswer);

  // 결과 정보를 담는 컨테이너 가져오기
  const resultContainer = document.getElementById('result-container');

  // result-container에 결과 정보 추가
  const div = document.createElement('div');
  const strike = document.createTextNode(`${result.strike}`);
  const ball = document.createTextNode(`${result.ball}`);
  const out = document.createTextNode(`${result.out}`);
  div.classList.add('result-row');
  div.appendChild(strike);
  div.appendChild(ball);
  div.appendChild(out);
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