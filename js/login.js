function getToken() {
  return localStorage.getItem('token');
}

async function login(event) {
  event.preventDefault(); //제가 작성하는거 이외에 막아주고
  event.stopPropagation(); // 상위로 이벤트가 이동하지않게

  const emailElement = document.querySelector('#email');
  const passwordElement = document.querySelector('#password');

  const email = emailElement.value;
  const password = passwordElement.value;

  try {
    const res = await axios.post('https://api.marktube.tv/v1/me', {
      email,
      password
    });

    const {token} = res.data;  // const token = res.data.token;
    if (token == undefined) {
      return;
    }
    localStorage.setItem('token', token);
    location.assign('/');
  } catch(error) {
    const data = error.response.data;
    if (data) {
      const state = data.error;
      if (state == 'USER_NOT_EXIST') {
        alert('사용자가 존재하지 않습니다.');
      } else if (state == 'PASSWORD_NOT_MATCH') {
        alert('비밀번호가 틀렸습니다.');
      }
    }
  }
}

function bindLoginButton() {
  const form = document.querySelector('#form-login');
  form.addEventListener('submit', login);
}

function main() {
  // 버튼에 이벤트 연결
  bindLoginButton();

  //토큰 체크
  const token = getToken();
  if (token != null) {
    location.assign('/'); //인덱스 페이지로 이동
    return;
  }
}

document.addEventListener('DOMContentLoaded', main);
