const formCep = document.getElementsByClassName("main_content_form_address");
const homeTitle = document.getElementsByClassName("main_content_form_welcome");
const mensagem = document.getElementById("alertMessage");

function limpa_formulário_cep() {
  //Limpa valores do formulário de cep.
  document.getElementById("rua").value = "";
  document.getElementById("bairro").value = "";
  document.getElementById("cidade").value = "";
  document.getElementById("uf").value = "";
  document.getElementById("num").value = "";
}

function meu_callback(conteudo) {
  if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById("rua").value = conteudo.logradouro;
    document.getElementById("bairro").value = conteudo.bairro;
    document.getElementById("cidade").value = conteudo.localidade;
    document.getElementById("uf").value = conteudo.uf;
    document.getElementById("num").value = "";
  } //end if.
  else {
    //CEP não Encontrado.
    mensagem.style.opacity = 1;
    mensagem.innerHTML = `
          
        <div class="alert alert-danger" role="alert" id="alertMessagejs">
            CEP não encontrado!
        </div>
      
          `;

    setTimeout(function () {
      mensagem.style.opacity = 0;
    }, 1500);
    limpa_formulário_cep();
    
  }
}

function pesquisacep(valor) {
  //Nova variável "cep" somente com dígitos.
  var cep = valor.replace(/\D/g, "");

  //Verifica se campo cep possui valor informado.
  if (cep != "") {
    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if (validacep.test(cep)) {
      formCep[0].style.display = "flex";
      homeTitle[0].style.display = "none";

      //Preenche os campos com "..." enquanto consulta webservice.
      document.getElementById("rua").value = "...";
      document.getElementById("bairro").value = "...";
      document.getElementById("cidade").value = "...";
      document.getElementById("uf").value = "...";

      //Cria um elemento javascript.
      var script = document.createElement("script");

      //Sincroniza com o callback.
      script.src =
        "https://viacep.com.br/ws/" + cep + "/json/?callback=meu_callback";

      //Insere script no documento e carrega o conteúdo.
      document.body.appendChild(script);
    } //end if.
    else {
      //cep é inválido.
      limpa_formulário_cep();
      mensagem.style.opacity = 1;
      mensagem.innerHTML = `
          
        <div class="alert alert-danger" role="alert" id="alertMessagejs">
            Formato de CEP inválido!
        </div>
      
          `;

    setTimeout(function () {
      mensagem.style.opacity = 0;
    }, 1500);
    }
  } //end if.
  else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep();
  }
}
