

//definicion de la interfaz

import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { FirebaseStorage } from "../storages/FireBaseSessionStorage";
import { logger } from "../middlewares/logger.middleware";

interface PersonState {

    firstname: string;
    lastname: string;

    //metodos del objeto, estos metodos no deben estar en el state

}
//interfaz de acciones
interface Actions {
    setFirstname: (value: string) => void;
    setLastname: (value: string) => void;



}

// type PersonStore = PersonState & Actions;

//la store segun el type debe tener 2 strings y 2 metodos segun el typo

const storeAPI: StateCreator<PersonState & Actions, [["zustand/devtools", never]]> = (set) => ({

    firstname: '',
    lastname: '',
    //el state se deja debido a 
    setFirstname: (value: string) => set(({ firstname: value }), false, 'SetFirstName'),
    setLastname: (value: string) => set(({ lastname: value }), false, 'setLastName')


})


//store 
//tipos
export const UsePersonStore = create<PersonState & Actions>()(
logger(
    devtools(
        //persiste genera un storage de las accines en el, esto es un middleware
        persist(
            storeAPI
            , {
                name: 'PersonStorage',
                // storage: FirebaseStorage
            })))
);

