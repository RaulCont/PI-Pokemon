import style from './Card.module.css'
import { Link } from "react-router-dom";

export const Card = ({id, name, image, types, attack}) => {
        //    const [one, two] = types;   
    return (
        <div className={style.tarjeta}>
            <div className={style.middle}>
                <Link to={`/detail/${id}`}>            
                    <h4>Nombre: {name}</h4>
                    <h5>id: {id}</h5>
                    <img src={image} alt="" className={style.img_tarjeta}/>
                    {/* <h5>{`Tipos: ${one}, ${two}`}</h5> */}
                    <h5>Attaque: {attack}</h5>
                </Link>

            </div>
        </div>        
    )
}
