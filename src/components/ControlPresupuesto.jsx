import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({presupuesto, gastos, setPresupuesto, setGastos, setIsValidPresupuesto}) => {

    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
        // El 0 al final, indica que la variable total arranca en 0
        // Total, vendria a ser la variable de la totalidad del gasto, quiere decir que lo q le pasa gasto.cantidad, queda acumulado ahi, y que gasto.cant volveria a 0 esperando el proximo valor, para poder pasarle sumando a la variable total el valor adquirido recientemente y asi en bucle
        const totalGastado = gastos.reduce( (total, gasto) =>  gasto.cantidad + total, 0 )
        const totalDisponible = presupuesto - totalGastado

        const nuevoPorcentaje = (( (presupuesto - totalDisponible) / presupuesto ) * 100).toFixed(2);
        
        setGastado(totalGastado);
        setDisponible(totalDisponible);

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje);  
        }, 500);
        
    }, [gastos])

    const formatearCant = cantidad => {
        return  cantidad.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
        })
    }

    const handleResetApp = () => {
        const resultado = confirm('¿Deseas reiniciar presupuesto y gastos?')

        if (resultado) {
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }


  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar
                styles={buildStyles({
                    pathColor: disponible < 0 ? '#DC2626' : '#3B82F6',
                    trailColor: '#f5f5f5',
                    pathTransitionDuration: 1.5,
                    textColor: disponible < 0 ? '#DC2626' : '#3B82F6',
                })}
                value={porcentaje}
                text={`${porcentaje}% Gastado`}
            />
        </div>
        
        <div className="contenido-presupuesto">
            <button
                className="reset-app"
                type="button"
                onClick={handleResetApp}
            >
                Resetear App
            </button>
            <p>
                <span>Presupuesto: </span>{formatearCant(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span>Disponible: </span>{formatearCant(disponible)}
            </p>
            <p>
                <span>Gastado: </span>{formatearCant(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto