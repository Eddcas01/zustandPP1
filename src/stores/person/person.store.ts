

//definicion de la interfaz

import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import { FirebaseStorage } from "../storages/FireBaseSessionStorage";

interface PersonState {

    firstname: string;
    lastname: string;

//metodos del objeto, estos metodos no deben estar en el state
    
}
//interfaz de acciones
interface Actions {
    setFirstname : (value:string) => void;
    setLastname : (value:string) => void;



}

// type PersonStore = PersonState & Actions;

//la store segun el type debe tener 2 strings y 2 metodos segun el typo

const storeAPI : StateCreator <PersonState & Actions>  =  (set) => ({

    firstname: '',
    lastname: '',
    
    setFirstname : (value:string) => set(state => ({firstname:value})),
    setLastname : (value:string) => set(state => ({ lastname:value}))
    
    
    })


//store 
                                //tipos
export const UsePersonStore = create<PersonState & Actions>()(

    //persiste genera un storage de las accines en el, esto es un middleware
    persist(
        storeAPI
  , {name:'PersonStorage',
        storage: FirebaseStorage
} )
);

