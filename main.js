const fs = require("fs");


const arquivo = fs.readFileSync('cartas.txt');
const arquivo2 = fs.readFileSync('enderecos.txt');

//quebrando em mensagens
let quebraMensagens = arquivo.toString().split("---");

//quebrando endereços
let quebraEnderecos = arquivo2.toString().split("---");

//comparação
let destinatario = "";
let endereco = "";

//guardar resultado
let resultado = "";

//quebrando mensagens em linhas
const mensagens = (quebraMensagens) => {

    //quebrando em linhas
    for(let i=0; i<quebraMensagens.length; i++){
        quebraMensagens[i] = quebraMensagens[i].split("\n");
    }
        
    formatandoMensagem(quebraMensagens);

};


const formatandoEndereco = (quebraEnderecos, destinatario) => {

    //acessando as linhas
    for(let i=0; i<quebraEnderecos.length; i++){
            quebraEnderecos[i] = quebraEnderecos[i].trim();

            if(quebraEnderecos[i].includes(destinatario)){

                //separando apenas o endereco

                let endereco = quebraEnderecos[i].slice(destinatario.length+1,quebraEnderecos[i].length);
                return endereco;

            }
    }
    
}


const formatandoMensagem = (quebraMensagens) => {

  //acessando as linhas
    for(let i=0; i<quebraMensagens.length; i++){
     resultado+="[INICIO DA MENSAGEM]\n";
     for (let j=0; j<quebraMensagens[i].length; j++){
         quebraMensagens[i][j] = quebraMensagens[i][j].trim();

         //Resolvendo o problema das posições vazias 

         if(i===0){

            // imprimindo a mensagem

            if(j===0){
                resultado+=`Remetente: ${quebraMensagens[i][j]}\n`;
            }else if(j===1){
                resultado+=`Destinatário: ${quebraMensagens[i][j]} \n`;

               //buscando o endereço do destinatário e imprimindo
                destinatario = quebraMensagens[i][j];
                endereco = formatandoEndereco(quebraEnderecos,destinatario);

                //tratando a possibilidade de o endereço não estar na lista

                if (endereco === undefined){
                    resultado+=`Endereço: desconhecido\n`;
                }else{
                    resultado+=`Endereço: ${endereco}\n`;
                } 

            }else if(j===2){
                resultado+=`Mensagem: ${quebraMensagens[i][j]}\n`;
            } 
         }else{

           // imprimindo a mensagem
            if(j===1){
                resultado+=`Remetente: ${quebraMensagens[i][j]}\n`;
            }else if(j===2){
                resultado+=`Destinatário: ${quebraMensagens[i][j]}\n`;
               
               //buscando o endereço do destinatário e imprimindo

               destinatario = quebraMensagens[i][j];
               endereco = formatandoEndereco(quebraEnderecos,destinatario);

               
              //tratando a possibilidade de o endereço não estar na lista

               if (endereco === undefined){
                resultado+=`Endereço: desconhecido\n`;
               }else{
                resultado+=`Endereço: ${endereco}\n`;
               }               

            }else if(j===3){
                resultado+=`Mensagem: ${quebraMensagens[i][j]}\n`;
            }
         }

     }
     resultado+="[FIM DA MENSAGEM]\n";
    }
};


mensagens(quebraMensagens);

fs.writeFileSync("resultado.txt", resultado);


