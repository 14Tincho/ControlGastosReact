import { useState, useEffect } from 'react'
import CerrarBtn from '../img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = ({setModal, animarModal, setAnimarModal, gurdarGasto, gastoEditar,setGastoEditar}) => {

    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')

    const [mensaje, setMensaje] = useState(false)


    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setFecha(gastoEditar.fecha)
            setId(gastoEditar.id)
        }
    }, [gastoEditar])

    const ocultarModal = () => {
        setAnimarModal(false)
        setModal(false)
        setGastoEditar({})

        // Esto es lo que el wachin, a mi no me gusto
        // setTimeout(() => {
        //         setModal(false)
        //     }, 500 );
    }

    const handleSubmit = e =>{
        e.preventDefault()

        if ([nombre, cantidad, categoria].includes('')) {
            setMensaje(true)
            return;
        }
        
        // gurdarGasto({nombre, cantidad, categoria, id:generarId()})
        gurdarGasto({nombre, cantidad, categoria, id, fecha})
    }

    return (
    <div className="modal">
        <div className="cerrar-modal">
            <img 
                src={CerrarBtn}
                alt="Cerrar modal"
                onClick={ocultarModal} 
                />
        </div>

        {/* Este de aca arriba comentado, tambien funciona */}
        {/* <form className={`formulario ${animarModal ? 'animar' : ''}`}> */}
        <form 
            className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
            onSubmit = {handleSubmit} 
            >

            {mensaje && <Mensaje tipo='error'>Todos los campos son obligatorios</Mensaje>}

            <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto' }</legend>

            {/* Nombre */}
            <div className="campo">
                <label htmlFor="nombre">Nombre Gasto</label>
                <input
                    id='nombre' 
                    type="text"
                    placeholder='Añade el Nombre del Gasto'
                    value={nombre}
                    onChange={ e => setNombre(e.target.value)}
                    />
            </div>

            {/* Cantidad */}
            <div className="campo">
                <label htmlFor="cantidad">Cantidad</label>
                <input
                    id='cantidad' 
                    type="number"
                    placeholder='Añade el Monto del Gasto: ej. 300'
                    value={cantidad}
                    onChange={(e) => setCantidad(Number(e.target.value))}
                    />
            </div>


            {/* Filtrado */}
            <div className="campo">
                <label htmlFor="Categoria">Categoria</label>
                <select
                    id='categoria'
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="casa">Casa</option>
                    <option value="comida">Comida</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>


            <input 
                type = "submit"
                value = {gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto' }
            />
        </form>

    </div>
  )
}

export default Modal