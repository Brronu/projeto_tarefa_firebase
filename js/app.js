import { app, db } from "./config-firebase.js"
import { doc, setDoc, collection, addDoc, query, where, getDocs, orderBy,documentId,updateDoc} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js"

let nome = document.querySelector("#tarefa")
let data = document.querySelector("#data")
let status = document.querySelector("#status")
let btnTarefa = document.querySelector("#btnTarefa")
let bloco = document.querySelector("#bloco")
let idAtualizar = ""

async function inserirTarefa(){
    try {
        // Add a new document with a generated id.
const docRef = await addDoc(collection(db, "tarefa"), {
    nome: nome.value,
    data: data.value,
    status: status.value
  }); 
  console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.error("Ocorreu o seguite erro: "+error)
        
    }
    
 
}

async function consultarTarefa(){
    bloco.innerHTML = "" // Limpando o elemento HTML de inserir novos registos, para não acumular dados
    const busca = query(collection(db, "tarefa"), orderBy("nome"));

    const resultado = await getDocs(busca);
    resultado.forEach((item) => {
    // item.data() is never undefined for query item snapshots
    console.log(item.id, " => ", item.data());

    bloco.innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
        <strong>Nome: </strong> ${item.data().nome}<br>
        <strong>Data: </strong> ${item.data().data} <br>
        <strong>Status: </strong> ${item.data().status} <br>
        </div>
                                

        <div class="d-flex gap-2 justify-content-end">
        <button type="button" class="btn btn-danger" id="${item.id}">Excluir</button>
        <button type="button" class="btn btn-info" id="${item.id}">Alterar</button>
        </div>
        </li>
    `
    document.querySelectorAll(".btn-danger").forEach((elemento)=>{
        elemento.addEventListener("click",(evento)=>{
            //alert("Botão excluir acionado")
            console.log(evento.target.id)
            exluirTarefa(evento.target.id)
        })
    })
    });
}

document.querySelector(".btn-info").forEach((elemento)=>{
    elemento.addEventListener("click",(evento)=>{
        if(formAtualizar.classlist.contains("d-nome")){
            formCadastrar.classlist.replace("d-block", "d-none")
            formAtualizar.classlist.replace("d-none", "d-block")
        }

        consultarUnico(evento.target.id)
    })
})

async function exluirTarefa(){
    let resultado = confirm("tem certeza que deseja excluir?")
    if(resultado){
        await deleteDoc(doc(db, "tarefa", id));
        alert("Tarefa exluida com sucesso")

        consultarTarefa()//recarregar os dados apos exluir
    }
}

async function consultarUnico(id){
    idAtualizar = id //estamos passando o id do documento salvo la no banco para a variavel
    const banco = await collection(db, "tarefa")
    const busca = query (banco, where(documentId(), "==", id))

    const consulta = await getDocs(busca)
    
    consulta.log(consulta.log[0].data())
    let resultado = consulta.getDocs

    tarefa_update.value = resultado.nome
    data_update.value = resultado.data
    status_update.value = resultado.status
}

async function atualizarTarefa(id){
    const tarefa = doc(db, "tarefa", idAtualizar);

    // Set the "capital" field of the city 'DC'
    await updateDoc(wtarefa, {
    nome: tarefa_update.value,
    data: data_update.value,
    status: status_update.value
    });
    alert("Dados atualizados com sucesso")
}

btnTarefa.addEventListener("click",(evento)=>{
    evento.preventDefault()
    console.log(nome.value, data.value, status.value)
    inserirTarefa()
    consultarTarefa()
})

consultarTarefa()