import  "./Card.css"
import imgCard from '../../assets/img/joui.jpg'

import imgPen from '../../assets/img/pen.svg'
import imgTrash from '../../assets/img/trash.svg'


export const Card = ({tituloCard}) =>{
    return(
        <>
        <div className="cardDaImagem">
            <p>{tituloCard}</p>
            <img className="imgDoCard" src={imgCard} alt="Imagem relacionada ao card " />

            <div className="icons">
                <img src={imgPen} alt="imagem relacionada ao card"/>
                <img src={imgTrash} alt="imagem relacionada ao card"/>
            </div>
        </div>
        </>
    )
}