import {createAnswer, getInputs, onInput, onSubmit} from "./utils";

// 정답 생성
const answer = createAnswer();

// form 객체 가져오기
const form = document.getElementById('user-input-form');
// form 객체에 onSubmit 핸들러 등록
form.addEventListener('submit', onSubmit(answer));

// input 객체 가져오기
const inputs = getInputs();
// submit button 객체 가져오기
const submitButton = document.getElementById('submit-button');

// input 객체에 onInput 핸들러 등록
inputs[0].addEventListener('input', onInput(inputs[1]));
inputs[1].addEventListener('input', onInput(inputs[2]));
inputs[2].addEventListener('input', onInput(inputs[3]));
inputs[3].addEventListener('input', onInput(submitButton));
