import { WhiteCard } from '../../components';
import { useShallow } from 'zustand/react/shallow'
import { useBearStorage } from '../../stores/bears/bears.storage';
// import { useBearStore } from '../../stores';
export const BearPage = () => {

  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">

    <BlackBears/>
    <PolarBears/>
      <PandaBears/>

<BearDisplay/>

      </div>

    </>
  );
};



export const BlackBears = () => {
  
const blacBears = useBearStorage (state=> state.blackBears);
const increaseBlackBears = useBearStorage(state=> state.increaseBlackBears);



  return (
   
    <WhiteCard centered>
    <h2>Osos Negros</h2>

    <div className="flex flex-col md:flex-row">
      <button onClick={ () => increaseBlackBears(+1)} > +1</button>
      <span className="text-3xl mx-2 lg:mx-10"> {blacBears} </span>
      <button onClick={() => increaseBlackBears(-1)}>-1</button>
    </div>

  </WhiteCard>
  )
} 



export const PolarBears = () => {
  const polarBears = useBearStorage(state=> state.polarBears);
const increasePolarBears = useBearStorage(state=> state.increasePolarBears)

  return (
    <WhiteCard centered>
    <h2>Osos Polares</h2>

    <div className="flex flex-col md:flex-row">
      <button onClick={() => increasePolarBears(+1)}> +1</button>
      <span className="text-3xl mx-2 lg:mx-10"> {polarBears} </span>
      <button onClick={() => increasePolarBears(-1)}>-1</button>

    </div>

  </WhiteCard>

  )
}

export const PandaBears = () => {
  const pandaBears = useBearStorage(state=> state.pandaBears);
const increasePandaBears = useBearStorage(state=> state.increasePandaBears)

  return (
    <WhiteCard centered>
    <h2>Osos Pandas</h2>

    <div className="flex flex-col md:flex-row">
    <button onClick={() => increasePandaBears(+1)}> +1</button>
      <span className="text-3xl mx-2 lg:mx-10"> {pandaBears} </span>
      <button onClick={() => increasePandaBears(-1)}>-1</button>
    </div>

  </WhiteCard>



  )

}





export const BearDisplay = () => {

  const bears = useBearStorage(  useShallow(state => state.bears));

const donothing = useBearStorage(state => state.doNothing)
const addbear = useBearStorage(state => state.addBears)
const clearbear = useBearStorage(state => state.clearBears)
  return (
 <WhiteCard>
<h1>Osos</h1>
<button onClick={donothing}>Do Nothing</button>
<button  className='mt-2' onClick={addbear}>Agregar Oso</button>
<button className='mt-2' onClick={clearbear}>Borrar Osos</button>
<pre>
  {JSON.stringify(bears,null, 2)}
</pre>

 </WhiteCard>
  )
}
