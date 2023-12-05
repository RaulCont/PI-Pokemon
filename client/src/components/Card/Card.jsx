import style from './Card.module.css'
import { Link } from "react-router-dom";

export const Card = ({id, name, image, types, attack}) => {
    
    let clase = '';
    
    // const [one, two] = types;
    if(types) {
        clase = types[0] ? types[0]: 'tarjeta';
    } else {        
        clase = "tarjeta";
    }

    return (
        <div className={style[clase]}>

            <div className={style.middle}>
                <Link to={`/detail/${id}`}>            
                    <h4>Nombre: {name}</h4>                    
                    <img src={image} alt="" className={style.img_tarjeta}/>                    
                </Link>

            </div>
        </div>        
    )
}
