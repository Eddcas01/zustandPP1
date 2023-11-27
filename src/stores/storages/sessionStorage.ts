import { StateStorage, createJSONStorage } from "zustand/middleware";

 const storageAPI : StateStorage = {

    //estos 3 metodos son los que pertenecen a las acciones de un state storage, que se ve en el sessionStorage
    
            getItem: function (name: string): string | Promise<string | null> | null {
             
    
                const data = sessionStorage.getItem(name);
    
              //una promesa es lo que retorna la funcion en este caso retorna un null
              return data
            },
            setItem: function (name: string, value: string): void {
    
            //digmos que lo que quiere es regresar name y value de tipo string los 2 como tipado
              sessionStorage.setItem(name,value)
            },
            removeItem: function (name: string): void | Promise<void> {
               console.log('removeItem', name);
            }
        }

    export const CustomsessionStorage = createJSONStorage(() => storageAPI)