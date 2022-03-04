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