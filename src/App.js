import { useState } from 'react';
import React from 'react';
import './App.css';

// import api
import api from './service/api';

// import icons
import { IoIosSearch } from "react-icons/io";

function App() {

    const [input, setInput] = useState('')
    const [cep, setCep] = useState({})
    async function handleSearch(){
        if (input === ''){
            alert("Preencha com algum CEP")
            return;
        }

        try{
            const response = await api.get(`${input}/json`);
            setCep(response.data)
            setInput("")
        }catch{
            alert("Ops, erro ao buscar :(")
            setInput("")
        }
    }

    return (
        <div className="container">
            <h1 className="title">Buscador de CEP</h1>

            <div className="container--input">
                <input 
                    type="text"
                    placeholder="Digite seu cep..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className="button--search" onClick={handleSearch}>
                    <IoIosSearch size={25} color="#FFF" />
                </button>
            </div>

            {Object.keys(cep).length > 0 && (
                <main className="main">
                    <h2>CEP: {cep.cep}</h2>
                    <span>Rua: {cep.logradouro}</span>
                    <span>DDD: {cep.ddd}</span>
                    <span>Bairro: {cep.bairro}</span>
                    <span>Cidade: {cep.localidade}</span>
                    <span>Estado: {cep.uf}</span>
                </main>
            )}
            
        </div>
    );
}

export default App;
