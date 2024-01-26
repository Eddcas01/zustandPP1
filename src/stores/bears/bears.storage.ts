import { StateCreator } from 'zustand';
import { create } from 'zustand'
import { persist } from 'zustand/middleware';


interface Bear {
  id: number,
  name: string

}

interface BearState {

  blackBears: number;
  polarBears: number;
  pandaBears: number;

  bears: Bear[];

  //pasa a ser una funcion porque en el middleware persist no permite funcionar al getter de forma correcta
    totalBears: () => number;
  

  increaseBlackBears: (by: number) => void;
  increasePolarBears: (by: number) => void;
  increasePandaBears: (by: number) => void;


  doNothing: () => void;
  addBears: () => void;
  clearBears: () => void;
}

const storeAPIBears: StateCreator<BearState> = (set, get) => ({
  blackBears: 10,
  polarBears: 10,
  pandaBears: 1,

  bears: [{ id: 1, name: 'oso 1' }],

 
//se cambia a una  funcion que devuelve un numero
    totalBears: () =>  {
    
      return get().blackBears + get().polarBears + get().pandaBears + get().bears.length;

    },

  
  increaseBlackBears: (by: number) => set((state) => ({ blackBears: state.blackBears + by })),
  increasePolarBears: (by: number) => set((state) => ({ polarBears: state.polarBears + by })),
  increasePandaBears: (by: number) => set((state) => ({ pandaBears: state.pandaBears + by })),

  doNothing: () => set(state => ({ bears: [...state.bears] })),
  addBears: () => set(state => ({
    bears: [...state.bears, { id: state.bears.length + 1, name: `oso #${state.bears.length + 1}` }]


  })),
  clearBears: () => set(({ bears: [] }))
})

export const useBearStorage = create<BearState>()(

  persist(
    storeAPIBears,

    { name: 'storageBears' }


  )

)


