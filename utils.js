/*
* Input 관련 함수
*/

// input 객체를 가져오는 함수
export const getInputs = () => {
  // input 객체 가져오기
  const input0 = document.getElementById('user-input-0');
  const input1 = document.getElementById('user-input-1');
  const input2 = document.getElementById('user-input-2');
  const input3 = document.getElementById('user-input-3');

  return [input0, input1, input2, input3];
}

// input 초기화 함수
export const initInputs = (inputs) => {
  inputs.forEach(input => input.value = '');
}

// 빈 문자를 포함하는지 확인하는 함수
export const hasEmptyInput = (answer) => {
  return !!answer.includes('');
}

// 중복된 숫자가 있는지 확인하는 함수
export const hasDuplicatedInput = (answer) => {
  for (let i = 0; i < answer.length; i++) {
    // 중복된 숫자가 있는 경우 false를 반환
    if (answer.indexOf(answer[i]) !== i) return true;
  }
  return false;
}

// 숫자가 아닌 문자를 포함한 경우
export const hasNaNInput = (answer) => {
  return answer.some((value) => isNaN(value));
}


// input 조건 확인하는 함수
export const validInputs = (inputs) => {
  // 빈 문자를 포함하는 경우
  if (hasEmptyInput(inputs)) {
    alert('4자리 수를 입력해주세요.');
    return false;
  }

  // 중복된 숫자를 포함하는 경우
  if (hasDuplicatedInput(inputs)) {
    alert('중복된 숫자는 사용불가합니다.');
    return false;
  }

  // 숫자가 아닌 문자를 입력한 경우
  if (hasNaNInput(inputs)) {
    alert('숫자만 입력해주세요.');
    return false;
  }

  return true;
}

// input onInput 핸들러
export const onInput = (target) => {
  return (e) => {
    if (!isNaN(e.target.value) && e.target.value !== '') {
      target.focus();
    }
  };
};


/*
* form 관련 함수
*/

// form onSubmit 핸들러
export const onSubmit = (answer) => {
  return (e) => {
    e.preventDefault();
    e.stopPropagation();

    // input 객체
    const inputs = getInputs();
    // 사용자 정답
    const userAnswer = inputs.map(value => value.value);

    // 입력 조건에 맞지 않는 경우
    if (!validInputs(userAnswer)) return;

    // 결과 정보
    const result = checkAnswer(answer, userAnswer);

    // 결과 정보를 담는 컨테이너 가져오기
    const resultContainer = document.getElementById('result-container');

    // result-container에 결과 정보 추가
    const div = document.createElement('div');

    const userAnswerDiv = createDiv(`${userAnswer.join(' ')}`, 'result-row-user-answer');
    const strikeDiv = createDiv(`${result.strike} Strike`, 'result-row-strike')
    const ballDiv = createDiv(`${result.ball} Ball`, 'result-row-ball');
    const outDiv = createDiv(`${result.out} Out`, 'result-row-out');

    div.classList.add('result-row');

    div.appendChild(userAnswerDiv);
    div.appendChild(strikeDiv);
    div.appendChild(ballDiv);
    div.appendChild(outDiv);

    resultContainer.appendChild(div);

    // 정답을 맞춘 경우 다시 하기 버튼 생성
    if (result.strike === answer.length) {
      const replayButton = createButton('다시 하기', 'replay-button');
      replayButton.addEventListener('click', () => location.reload());
      resultContainer.appendChild(replayButton);
    }

    // input 값 초기화
    initInputs(inputs);
  }
}


/*
* 게임 관련 함수
*/

// 정답 생성 함수
export const createAnswer = () => {
  // 정답 범위
  const max = Math.pow(10, 4) - 1;
  const min = Math.pow(10, 3);

  // 유효한 정답이 나올 때까지 반복하여 난수 생성
  while (true) {
    // 난수 생성
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min).toString().split('');
    // 중복된 숫자가 없는 경우
    if (!hasDuplicatedInput(randomNumber)) {
      return randomNumber;
    }
  }
}

// 정답 확인 함수
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

// 규칙 설명 보여주기 button onClick 핸들러
export const onClickShowRuleButton = () => {
  // modal 객체 가져오기
  const ruleModal = document.getElementById('rule-modal');
  // display 변경
  ruleModal.style.display = 'flex';
}

// 규칙 설명 닫기 button onClick 핸들러
export const onClickCloseRuleButton = () => {
  // modal 객체 가져오기
  const ruleModal = document.getElementById('rule-modal');
  // display 변경
  ruleModal.style.display = 'none';
}


/*
* tag 생성 함수
*/

// div 생성 함수
export const createDiv = (text, className) => {
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
export const createButton = (text, className) => {
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