import {checkAnswer, createAnswer, getButton, getDiv, getUserAnswer} from "./utils";

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
  const strikeDiv = getDiv(`${result.strike} Strike`, 'result-row-strike')
  const ballDiv = getDiv(`${result.ball} Ball`, 'result-row-ball');
  const outDiv = getDiv(`${result.out} Out`, 'result-row-out');

  div.classList.add('result-row');

  div.appendChild(userAnswerDiv);
  div.appendChild(strikeDiv);
  div.appendChild(ballDiv);
  div.appendChild(outDiv);

  resultContainer.appendChild(div);

  // 정답을 맞춘 경우
  if (result.strike === answer.length) {
    const replayButton = getButton('다시 하기', 'replay-button');
    replayButton.addEventListener('click', () => location.reload());
    resultContainer.appendChild(replayButton);
  }
}

// 정답 생성
const answer = createAnswer();

// form 객체 가져오기
const form = document.getElementById('user-input-form');
// form 객체에 onSubmit 핸들러 등록
form.addEventListener('submit', onSubmit);