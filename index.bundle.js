(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a
        }
        var p = n[i] = {exports: {}};
        e[i][0].call(p.exports, function (r) {
          var n = e[i][1][r];
          return o(n || r)
        }, p, p.exports, r, e, n, t)
      }
      return n[i].exports
    }

    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
    return o
  }

  return r
})()({
  1: [function (require, module, exports) {
    "use strict";

    var _utils = require("./utils");

// 정답 생성
    const answer = (0, _utils.createAnswer)(); // 사용자 정답 가져오는 함수

    const getUserAnswer = () => {
      // input 값 가져오기
      const input0 = document.getElementById('user-input-0').value;
      const input1 = document.getElementById('user-input-1').value;
      const input2 = document.getElementById('user-input-2').value;
      const input3 = document.getElementById('user-input-3').value; // 사용자 정답

      const userAnswer = [input0, input1, input2, input3]; // 빈 문자열인 경우

      if (userAnswer.includes('')) {
        alert('4자리 수를 입력해주세요.');
        return [];
      } // 유효한 정답이 아닌 경우


      if (!(0, _utils.validAnswer)(userAnswer)) {
        alert('유효한 숫자가 아닙니다. (각 자리 수 중복 불가)');
        return [];
      } // 숫자가 아닌 경우


      if (isNaN(input0) || isNaN(input1) || isNaN(input2) || isNaN(input3)) {
        alert('숫자만 입력해주세요.');
        return [];
      }

      return userAnswer;
    }; // div 생성 함수


    const getDiv = (text, className) => {
      // div 생성
      const div = document.createElement('div'); // textNode 생성

      const textNode = document.createTextNode(`${text}`); // 클래스 추가

      div.classList.add(className); // textNode 추가

      div.appendChild(textNode);
      return div;
    }; // form onSubmit 핸들러


    const onSubmit = e => {
      e.preventDefault();
      e.stopPropagation(); // 사용자 정답

      const userAnswer = getUserAnswer(); // 사용자 정답에 오류가 있는 경우

      if (userAnswer.length === 0) {
        return;
      } // 결과


      const result = (0, _utils.checkAnswer)(answer, userAnswer); // 결과 정보를 담는 컨테이너 가져오기

      const resultContainer = document.getElementById('result-container'); // result-container에 결과 정보 추가

      const div = document.createElement('div');
      const userAnswerDiv = getDiv(`${userAnswer.join(' ')}`, 'result-row-user-answer');
      const strikeDiv = getDiv(`Strike ${result.strike}`, 'result-row-strike');
      const ballDiv = getDiv(`Ball ${result.ball}`, 'result-row-ball');
      const outDiv = getDiv(`Out ${result.out}`, 'result-row-out');
      div.classList.add('result-row');
      div.appendChild(userAnswerDiv);
      div.appendChild(strikeDiv);
      div.appendChild(ballDiv);
      div.appendChild(outDiv);
      resultContainer.appendChild(div); // 정답을 맞춘 경우

      if (result.strike === answer.length) {
        const button = document.createElement('button');
        const text = document.createTextNode('다시 하기');
        button.classList.add('replay-button');
        button.appendChild(text);
        button.addEventListener('click', () => location.reload());
        resultContainer.appendChild(button);
      }
    }; // form 객체 가져오기


    const form = document.getElementById('user-input-form'); // form 객체에 onSubmit 핸들러 등록

    form.addEventListener('submit', onSubmit);

  }, {"./utils": 2}], 2: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.validAnswer = exports.createAnswer = exports.checkAnswer = void 0;

// 유효한 정답인지 확인하는 함수
    const validAnswer = answer => {
      for (let i = 0; i < answer.length; i++) {
        // 중복된 숫자가 있는 경우 false를 반환
        if (answer.indexOf(answer[i]) !== i) return false;
      }

      return true;
    }; // 정답 생성 함수


    exports.validAnswer = validAnswer;

    const createAnswer = () => {
      // 정답 범위
      const max = Math.pow(10, 4) - 1;
      const min = Math.pow(10, 3); // 유효한 정답이 나올 때까지 반복하여 난수 생성

      while (true) {
        // 난수 생성
        const randomNumber = Math.floor(Math.random() * (max - min + 1) + min).toString().split(''); // 유효한 정답인 경우

        if (validAnswer(randomNumber)) {
          return randomNumber;
        }
      }
    }; // 결과 확인 함수


    exports.createAnswer = createAnswer;

    const checkAnswer = (answer, userAnswer) => {
      const result = {
        'strike': 0,
        'ball': 0,
        'out': 0
      }; // 유저 정답을 순회하며 정답과 비교

      for (let i = 0; i < userAnswer.length; i++) {
        // 스트라이크 (숫자와 위치를 맞춘 경우)
        if (userAnswer[i] === answer[i]) result.strike++; // 볼 (숫자를 맞춘 경우)
        else if (answer.includes(userAnswer[i])) result.ball++; // 아웃 (아무것도 못 맞춘 경우)
        else result.out++;
      }

      return result;
    };

    exports.checkAnswer = checkAnswer;

  }, {}]
}, {}, [1]);
