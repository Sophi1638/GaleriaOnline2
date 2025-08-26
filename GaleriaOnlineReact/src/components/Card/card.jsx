import  "./Card.css"

import imgPen from '../../assets/img/pen.svg'
import imgTrash from '../../assets/img/trash.svg'


export const Card = ({tituloCard, imgCard,funcaoEditar,funcaoExcluir}) =>{
    return(
        <>
        <div className="cardDaImagem">
            <p>{tituloCard}</p>
            <img className="imgDoCard" src={imgCard} alt="Imagem relacionada ao card " />

            <div className="icons">
                <img onClick={funcaoEditar} src={imgPen} alt="imagem relacionada ao card"/>
                <img onClick={funcaoExcluir} src={imgTrash} alt="imagem relacionada ao card"/>
            </div>
        </div>
        </>
    )
}