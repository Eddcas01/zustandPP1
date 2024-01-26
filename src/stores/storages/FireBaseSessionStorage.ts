import { StateStorage, createJSONStorage } from "zustand/middleware";

const FreBaseURL  = 'https://zustandstoragealm-default-rtdb.firebaseio.com/Zustand'

 const storageAPI : StateStorage = {

   //este metodo nos hace un fetch get a firebase para consultar los datos que estan en la base de datos
            getItem: async function  (name: string): Promise<string | null>  {
             //try y catch para manejo de error
              try {

                //se realiza un fetch await a la base de datos, con la url / name que es el nombre del storage que esta en person.store
                const data = await fetch(`${FreBaseURL}/${name}.json`)
                .then(response => response.json());
                //podemos guardarlo como string o leerlo con json.srtingify
                return JSON.stringify(data)
              } catch (error) {
                throw error
              }
  
    
              //una promesa es lo que retorna la funcion en este caso retorna un null
             
            },
            setItem: async function (name: string, value: string): Promise <void> {
    
              //aqui estamos haciendo fetch pero para un metodo put, pasando como body el value que viene del store

              //set item es una condicion de carrera cuando esta peticion se solicita muchas veces
              //axiosabort permite cancelar la peticion anterior
              const data = await fetch(`${FreBaseURL}/${name}.json`, {

                method: 'PUT',
                body: value,


              })
              .then(response => response.json());
              console.log(data);

            //digmos que lo que quiere es regresar name y value de tipo string los 2 como tipado
            return 
            },
            removeItem: function (name: string): void | Promise<void> {
               console.log('removeItem', name);
            }
        }

    export const FirebaseStorage = createJSONStorage(() => storageAPI)