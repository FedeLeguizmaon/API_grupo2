import React, { useContext, useState } from 'react';
import axios from 'axios';
import './estilos/CarritoStyles.css';
import { CarritoContext, CarritoProvider } from './CarritoContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Cant = () => {
    const { Contador } = useContext(CarritoContext);
    return(Contador)

}