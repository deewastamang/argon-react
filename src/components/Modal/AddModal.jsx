import React from 'react'
import { nanoid } from 'nanoid';

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
    position: 'fixed',
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



export default function AddModal({toggle, addDataFun}) {
    
    const onAdd = () => {
        const title= document.getElementById('title').value;
        const price= document.getElementById('price').value;
        const category= document.getElementById('category').value;
        if(title && price && category) {
            const newData = {id: nanoid(), title, price, category}
            return addDataFun(newData)
        }
        return alert('Fill in credentails')
    }
  return (
    <div style={myStyle}>
        <section style={boxStyle}>
            <h2 style={{color: 'white'}}>Add new data</h2>
            <input style={inpStyle} id='title' name='title' type='text' placeholder='enter title' /><br />
            <input style={inpStyle} id='price' type='number' name='price'placeholder='enter price' /><br />
            <input style={inpStyle} name='category' id='category' type='text' placeholder='enter category' /><br />
            <button style={btnStyle} onClick={onAdd}>Add</button>
            <button style={btnStyle} onClick={toggle}>Close</button>

        </section>
    </div>
  )
}
