const form = document.getElementById('form');
const username = document.getElementById('id');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


//에러 메세지 보여주는 함수

function showError (input, message){
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//성공 메세지 보여주는 함수

function showSuccess (input, message) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

//이메일 유효성 검사

function checkEmail (input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, '이메일 형식이 아닙니다.');
  }
}


//공백 검사

function checkRequired(inputArr){
  inputArr.forEach(function (input) {
    if(input.value.trim() === '') {
      //trim 공백제거 
        console.log(input.id)
        showError(input, `${getFiledName(input)}을/를 입력해주세요`);
    } else {
      showSuccess(input)
    }
  });
}

//글자수 체크 

function checkLength(input, min ,max ){
  if(input.value.length < min) {
      showError(input , `${getFiledName(input)} 적어도 ${min} 글자가 필요합니다`)
  } else if (input.value.length > max) {
    showError(input , `${getFiledName(input)}  ${max} 글자가 넘습니다`)
  } else {
    showSuccess(input);
  }
}

//첫번째 글자를 대문자로 만들어주는 함수 

function getFiledName (input){
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
  //charAtg 한 글자만 받아오는 함수 
}


//비밀번호 체크 

function checkPasswordMatch(input1, input2){
  if(input1.value !== input2.value){
    showError(input2, '비밀번호가 맞지않습니다.');
  } 
}




//이벤트 리스너 

form.addEventListener('submit' , function (e) {
    e.preventDefault(); //submit 제출 시 reload 막아줌 
    
    checkRequired([id, email ,password, password2]);
    checkLength(id ,3 ,15);
    checkLength(password ,6 ,15);
    checkEmail(email);
    checkPasswordMatch(password,password2);
    
});