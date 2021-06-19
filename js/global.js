//Js Materialize
M.AutoInit();

//Compartilhar pagina no WhatsApp
document.addEventListener("DOMContentLoaded", function () {
  var conteudo = encodeURIComponent(document.title + " " + window.location.href);
  document.getElementById("whatsapp-share-btt").href = "https://api.whatsapp.com/send?text=" + conteudo;
}, false);

//API Geolocation
if ('geolocation' in navigator) {
  const watcher = navigator.geolocation.watchPosition(function (position) {
    console.log(position)
  }, function (error) {
    console.log(error)
  }, { enableHighAccuracy: true, maximumAge: 100000, timeout: 1000000 })
} else {
  alert("Navegador não suporta o geolocation!")
}


//Validação de cadastro


let nome = document.getElementById("nome")
let labelNome = document.getElementById("labelNome")
let validNome = false

let senha = document.getElementById("senha")
let labelSenha = document.getElementById("labelSenha")
let validSenha = false

let confirmarSenha = document.querySelector('#confirmar-senha')
let labelConfirmarsenha = document.querySelector('#labelConfirmar-senha')
let validConfirmarsenha = false

//outros campos cadastrados

let email = document.getElementById("email")

let cpf = document.getElementById("cpf")

let tel = document.getElementById("tel")

let nasc = document.getElementById("nasc")

//Validando campos

nome.addEventListener('keyup', () => {

  if (nome.value.length <= 2) {
    labelNome.setAttribute('style', 'color: red')
    labelNome.innerHTML = 'Nome *Insira no minimo 3 caracteres'
    nome.setAttribute('style', 'border-color: red')
    validNome = false

  } else {
    labelNome.setAttribute('style', 'color: green')
    labelNome.innerHTML = 'Nome'
    nome.setAttribute('Style', 'border-color: green')
    validNome = true
  }
})

senha.addEventListener('keyup', () => {

  if (senha.value.length <= 5) {
    labelSenha.setAttribute('style', 'color: red')
    labelSenha.innerHTML = 'Senha *Insira no minimo 6 caracteres'
    senha.setAttribute('style', 'border-color: red')
    validSenha = false

  } else {
    labelSenha.setAttribute('style', 'color: green')
    labelSenha.innerHTML = 'Senha'
    senha.setAttribute('Style', 'border-color: green')
    validSenha = true
  }
})

confirmarSenha.addEventListener('keyup', () => {

  if (senha.value != confirmarSenha.value) {
    labelConfirmarsenha.setAttribute('style', 'color: red')
    labelConfirmarsenha.innerHTML = 'Confirmar Senha *As senhas não conferem'
    confirmarSenha.setAttribute('style', 'border-color: red')
    validConfirmarsenha = false

  } else {
    labelConfirmarsenha.setAttribute('style', 'color: green')
    labelConfirmarsenha.innerHTML = 'Senha'
    confirmarSenha.setAttribute('Style', 'border-color: green')
    validConfirmarsenha = true
  }
})

//Função cadastrar
function cadastrar() {

  //Validar cadastro
  if (validNome && validSenha && validConfirmarsenha) {
    alert(`Usuário cadastrado com sucesso!`)
    //Criando o JSON após o cadastro para armazenar no localStorage
    let UsuariosCad = JSON.parse(localStorage.getItem('UsuariosCad') || '[]')

    UsuariosCad.push(
      {
        nomeCad: nome.value,
        cpfCad: cpf.value,
        emailCad: email.value,
        senhaCad: senha.value,
        confirmarsenhaCad: confirmarSenha.value,
        telCad: tel.value,
        nascCad: nasc.value

      }
    )
    localStorage.setItem('UsuariosCad', JSON.stringify(UsuariosCad))
  } else {
    alert('Preencha os campos para prosseguir com o cadastro.')
  }

}

//Função para entrar
function entrar() {
  let usuario = document.querySelector('#emaillogin')
  let userLabel = document.querySelector('#emailloginLabel')

  let senha = document.querySelector('#senhalogin')
  let senhaLabel = document.querySelector('#senhaloginLabel')

  let listaUser = []

  let userValid = {
    nome: '',
    email: '',
    senha: ''
  }
  //Chamar o JSON UsuariosCad
  listaUser = JSON.parse(localStorage.getItem('UsuariosCad'))

  listaUser.forEach((item) => {
    if (usuario.value == item.emailCad && senha.value == item.senhaCad) {

      userValid = {
        nome: item.nomeCad,
        email: item.emailCad,
        senha: item.senhaCad
      }

    }
  })
  //Testa se foi inserido algum dado nos campos de email e senha
  if (usuario.value == '' && senha.value == '') {
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = 'Insira o email e senha para entrar'

    //Testa se o usuário está cadastrado no localStorage
  } else if (usuario.value == userValid.email && senha.value == userValid.senha) {
    window.location.href = 'index.html'

    //Criação do token quando o usuário logar
    let mathRandom = Math.random().toString(16).substr(2)
    let token = mathRandom + mathRandom

    //Guardando token no localStorage
    localStorage.setItem('token', token)
    localStorage.setItem('usuarioLogado', JSON.stringify(userValid))
    alert(`Bem vindo ${userValid.nome}`)

  } else {
    userLabel.setAttribute('style', 'color: red')
    usuario.setAttribute('style', 'border-color: red')
    senhaLabel.setAttribute('style', 'color: red')
    senha.setAttribute('style', 'border-color: red')
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = 'Usuário ou senha incorretos'
    usuario.focus()
  }

}

//Adicionar ao carrinho
function addcarrinho(x, y) {


  var valorProduto = x;
  var nomeProduto = y;

  valorProduto = Number.parseFloat(valorProduto)

  //Tam Pizzas
  if (valorProduto == 35 || valorProduto == 40 || valorProduto == 48) {
    nomeProduto = `${y} média`
  } else if (valorProduto == 48 || valorProduto == 58 || valorProduto == 63) {
    nomeProduto = `${y} grande`
  } else if (valorProduto == 55 || valorProduto == 65 || valorProduto == 70) {
    nomeProduto = `${y} giga`
  }

  //Tam Refrigerantes
  if (nomeProduto == 'Coca-Cola' && valorProduto == 14) {
    nomeProduto = `${y} 2L`
  } else if (nomeProduto == 'Coca-Cola' && valorProduto == 10) {
    nomeProduto = `${y} 1L`
  } else if (nomeProduto == 'Coca-Cola' && valorProduto == 8) {
    nomeProduto = `${y} Lata 350ml`
  }

  if (nomeProduto == 'Coca-Cola Zero' && valorProduto == 14) {
    nomeProduto = `${y} 2L`
  } else if (nomeProduto == 'Coca-Cola Zero' && valorProduto == 10) {
    nomeProduto = `${y} 1L`
  } else if (nomeProduto == 'Coca-Cola Zero' && valorProduto == 8) {
    nomeProduto = `${y} Lata 350ml`
  }

  if (nomeProduto == 'Fanta' && valorProduto == 14) {
    nomeProduto = `${y} 2L`
  } else if (nomeProduto == 'Fanta' && valorProduto == 10) {
    nomeProduto = `${y} 1L`
  } else if (nomeProduto == 'Fanta' && valorProduto == 8) {
    nomeProduto = `${y} Lata 350ml`
  }

  if (nomeProduto == 'Sprite' && valorProduto == 14) {
    nomeProduto = `${y} 2L`
  } else if (nomeProduto == 'Sprite' && valorProduto == 10) {
    nomeProduto = `${y} 1L`
  } else if (nomeProduto == 'Sprite' && valorProduto == 8) {
    nomeProduto = `${y} Lata 350ml`
  }

  //Tam Sucos
  if (nomeProduto == 'Del Valle Maracujá' && valorProduto == 10) {
    nomeProduto = `${y} 1L`
  } else if (nomeProduto == 'Del Valle Maracujá' && valorProduto == 6) {
    nomeProduto = `${y} Lata 350ml`
  }
  if (nomeProduto == 'Del Valle Uva' && valorProduto == 10) {
    nomeProduto = `${y} 1L`
  } else if (nomeProduto == 'Del Valle Uva' && valorProduto == 6) {
    nomeProduto = `${y} Lata 350ml`
  }

  //Tam Águas
  if (nomeProduto == 'Água' && valorProduto == 5) {
    nomeProduto = `${y} 1L`
  } else if (nomeProduto == 'Água' && valorProduto == 3) {
    nomeProduto = `${y} 500ml`
  }
  if (nomeProduto == 'Água com gás' && valorProduto == 5) {
    nomeProduto = `${y} 1L`
  } else if (nomeProduto == 'Água com gás' && valorProduto == 3) {
    nomeProduto = `${y} 500ml`
  }

  console.log(nomeProduto)
  console.log(valorProduto.toFixed(2))
  alert(`Adicionado: ${nomeProduto} R$${valorProduto}`)

  //Cria o JSON no sessionStorage
  var carrinho = JSON.parse(sessionStorage.getItem("produtosCarrinho"));

  if (carrinho == null) {
    sessionStorage.setItem("produtosCarrinho", "[]");
    carrinho = [];

  }

  //objeto produtos
  var produtos = {
    nomeProd: nomeProduto,
    valorProd: valorProduto,
  }
  carrinho.push(produtos);
 


  //incrementar o total da compra
  let total = 0;

  for (let i = 0; i < carrinho.length; i++) {

    total += carrinho[i].valorProd;
  }

  console.log("Valor total: " + total.toFixed(2))
  sessionStorage.setItem("produtosCarrinho", JSON.stringify(carrinho));

}
