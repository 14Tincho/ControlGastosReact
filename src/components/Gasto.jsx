import React from 'react';
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'
import "react-swipeable-list/dist/styles.css"
import { formatearFecha } from "../helpers";

import IconoAhorro from '../img/icono_ahorro.svg';
import IconoCasa from '../img/icono_casa.svg';
import IconoComida from '../img/icono_comida.svg';
import IconoGastos from '../img/icono_gastos.svg';
import IconoOcio from '../img/icono_ocio.svg';
import IconoSalud from '../img/icono_salud.svg';
import IconoSuscripciones from '../img/icono_suscripciones.svg';


const diccionarioIconos = {
  "ahorro"  : IconoAhorro,
  "casa" : IconoCasa,
  "comida" : IconoComida,
  "gastos" : IconoGastos,
  "ocio" : IconoOcio,
  "salud" : IconoSalud,
  "suscripciones" : IconoSuscripciones
}

const Gasto = ({gasto, setGastoEditar, eliminarGasto}) => {
  
  // const gasto = [nombre, cantidad, categoria]
  const {nombre, cantidad, categoria, fecha, id} = gasto;

  // Hace que el swipe se mueva de la izquierda para la derecha  
  const leadingActions = () => (
      <LeadingActions>
          <SwipeAction onClick={() => setGastoEditar(gasto)}>
                Editar
          </SwipeAction>
      </LeadingActions>
  )


// Hace que el swipe se mueva de la derecha para la izquierda
  const trailingActions = () => (
    <TrailingActions>
        <SwipeAction 
            onClick={() => eliminarGasto(id)}
            destructive = {true}
            >
            Eliminar
        </SwipeAction>
    </TrailingActions>
  )
  
  return (
        <SwipeableList>
            <SwipeableListItem
                // Hace que se mueva de la izquierda para la derecha
                leadingActions={leadingActions()}
                // Hace que se mueva de la derecha para la izquierda
                trailingActions={trailingActions()}
            >
                <div className="gasto sombra">
                    <div className="contenido-gasto">
                        <img 
                            src={diccionarioIconos[categoria]}
                            alt={`Icono de ${categoria}`}
                        />
                        <div className="descripcion-gasto">
                            <p className="categoria">{categoria}</p>
                            <p className="nombre-gasto">{nombre}</p>
                            <p className="fecha-gasto">
                                Agregado el: {''}
                                <span>{formatearFecha(fecha)}</span>
                            </p>
                        </div>
                    </div>
                    <p className="cantidad-gasto">${cantidad}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
  )
}

export default Gasto