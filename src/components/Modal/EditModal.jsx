import React from 'react'
import { MdOutlineCancel } from "react-icons/md";

const myStyle = {
    height: '100vh',
    width: '80vw',
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(5px)',
    // -webkit-backdrop-filter: blur(5px);
    border: '1px solid rgba(255, 255, 255, 0.3)',
    zIndex: '99',
    position: 'absolute',
}

const boxStyle = {
    backgroundColor: '#5e72e4',
    width: '1000px',
    maxWidth: '400px',
    minHeight: '400px',
    margin: '10% auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    position: 'relative',
}

const inpStyle = {
    padding: '.7rem',
    borderRadius: '5px',
    textAlign: 'center',
}

const btnStyle = {
    padding: '.5rem',
    minWidth: '100px',
    borderRadius: '5px',
    marginTop: '10px',
}



export default function EditModal({toggle, rowData, onUpdate}) {
    const [data, setData] = React.useState(rowData);
    const handleSave = () => {
        const title = document.getElementById('title').value;
        const price = document.getElementById('price').value;
        const category = document.getElementById('category').value;
        if(title && price && category) {
            setData(p => {
                return {...p, title, price, category}
            });
            return onUpdate(data);
        }
        return alert('Fill all inputs')
    }

    const handleChange = (e) => {
      const {name, value} = e.target;
      setData(p => {
        return ({...p, [name] : value});
      })
    }

    const clearInput = (name) => {
        if(name === 'number') {
            setData(p => {
                return ({...p, price: 0})
            })
        }
        setData(p => {
            return ({...p, [name] : ''})
        })
    }
  return (
    <div style={myStyle}>
        <section style={boxStyle}>
            <h2 style={{color: 'white'}}>Update your data</h2>
            <span className='edit-modal-inp-span'>
            <input style={inpStyle} id='title' name='title' value={data.title} onChange={handleChange} type='text' placeholder='enter new title' />
            <MdOutlineCancel
            onClick={() => clearInput('title')}
            className='cross-icon'
             />
            </span>
            <br />
            <span className='edit-modal-inp-span'>
            <input style={inpStyle} id='price' name='price' onChange={handleChange} value={data.price} type='number' placeholder='enter new price' />
            <MdOutlineCancel
            onClick={() => clearInput('price')}
             className='cross-icon' />
            </span>
            <br />
            <span className='edit-modal-inp-span'>
            <input style={inpStyle} onChange={handleChange} name='category' id='category' value={data.category} type='text' placeholder='enter new category' />
            <MdOutlineCancel
            onClick={() => clearInput('category')} className='cross-icon' />
            </span>

            <br />
            <button style={btnStyle} onClick={handleSave}>save</button>
            <button style={btnStyle} onClick={toggle}>Close</button>

        </section>
    </div>
  )
}
