import './Galeria.css'
import icon from "../../assets/img/upload.svg"
import { Botao } from '../../components/Botao/botao'
import { Card } from '../../components/Card/card'
import { useEffect, useState } from 'react'
import api from '../../Services/service'

export const Galeria = () => {

    const[cards, setCards] = useState([]);
    const[imagem,setImagem] = useState(null);
    const[nomeImagem,setNomeImagem] = useState("");

    async function listaCards() {
        try {
            const resposta = await api.get("Imagem");
            // console.log(resposta.data);
            setCards(resposta.data);
        } catch (error) {
            console.error("Error ao Listar: ", error);
            alert("erro ao listar")
        }

    }

    async function cadastrarCard(e){
        e.preventDefault();
        if (imagem && nomeImagem) {
            
        try {
            // Formdata é uma interface Java script que permite construir um conjunto de pares chave/valor representando os dados de um formulario HTML
            const formData = new FormData();
            // append: anexar /acrecentar/ adicionar
            formData.append("Nome", nomeImagem);
            formData.append("Arquivo", imagem);

            await api.post("Imagem/upload", formData,{
                    headers:{
                        "Content-Type" : "multipart/form-data"
                    }
                });

                alert("foi pia!!! ")
        } catch (error) {
            alert("nao foi possivel realizar o cadastro");
            console.error(error);}
        }else{
            alert("Preencha os campos necessarios");
        }
    }

    function editarCard(id, nomeAntigo){
            const novoNome = prompt("Digite o novo nome da imagem",nomeAntigo);

            const inputArquivo = document.createElement("input");
            inputArquivo.type = "file";
            inputArquivo.accept = "image/*"
            
            inputArquivo.onchange = async(e)=>{
                const novoArquivo = e.target.files[0];

                const formData = new FormData();

                // adicionar o novo nome no formData:
                formData.append("Nome", novoNome);
                formData.append("Arquivo", novoArquivo);

                if (formData) {
                    try {
                        await api.put(`Imagem/${id}`, formData,{
                            headers:{
                                "Content-Type" : "multipart/form-data"
                            }
                        })

                        alert("Eba foii");
                        listaCards();
                    } catch (error) {
                        alert("Nao foi possivel cadastar");
                        console.error(error)
                    }
                }
            }
            inputArquivo.click();
    }

    async function excluirCard(id){
        try {
            await api.delete(`Imagem/${id}`);
            alert("Excluida")
            listaCards();
        } catch (error) {
            alert("Erro ao excluir o card")
            console.error(error)
        }
    }


useEffect(() => {
    listaCards();
})

return (
    <>
        <h1 className='tituloGaleria'>  Galeria Online</h1>
        <form className="formulario" onSubmit={cadastrarCard}>
            <div className='campoNome'>
                <label>Nome</label>
                <input type="text" className='inputNome' 
                onChange={(e) => setNomeImagem(e.target.value)}
                value={nomeImagem} />
            </div>
            <div className="campoImagem">
                <label className="arquivoLabel">
                    <i><img src={icon} alt='Icone de upload de imagem' /></i>
                    <input type="file" className='arquivoInput'
                    onChange={(e)=> setImagem(e.target.files[0])} />
                </label>
            </div>
            <Botao nomeBotao="Cadastar" />
        </form>
        <div className='campoCards'>
            {cards.length > 0 ? (
                cards.map((e) => (
                    <Card tituloCard={e.nome}
                        imgCard={`https://localhost:7295/${e.caminho.replace("wwwroot/","")}`}
                        funcaoExcluir = {() => excluirCard(e.id)}
                        funcaoEditar = {() => editarCard(e.id, e.nome)}  />
                ))
            ) : <p>Nenhum card cadastrado.</p>}

        </div>
    </>
)
}