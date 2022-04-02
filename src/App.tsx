import { useState } from 'react';
import style from './App.module.css';
import powwered from './assets/powered.png';
import { GrindItem } from './componets/GridItem';
import leftArrowImage from './assets/leftarrow.png';

import { levels, calcularImc, Level } from './helpers/imc';

const App = ()=>{

    const [heightField, setHeightField] = useState(0);
    const [weightField, setWeightField] = useState(0);

    const [toShow, setToShow] = useState<Level | null>(null)
    const handleCalcImc = ()=>{
        if(heightField && weightField){
            setToShow(calcularImc(heightField, weightField));
        }else{
            alert("Digite todos os campos");
        }
    } 

    const hendalBackButton = ()=>{
        setToShow(null)
        setHeightField(0);
        setWeightField(0);
    }


    return(
        <div className={style.main}>
            <header>
                <div className={style.headerContainer}>
                    <img src={powwered} alt='' width={150} />
                </div>
            </header>
            <div className={style.container}>
                <div className={style.leftside}>
                    <h1>Calcule seu IMC</h1>
                    <p>IMC é a sigla para indice de massa corpórea, parâmetro
                        adotado pela Organização mundial da saúde para calcular
                        peso ideal da pessoa.
                    </p>
                    <input 
                        type="number"
                        placeholder='Digite sua altura Ex: 1.5 (em metros) '
                        value={heightField > 0 ? heightField :''}
                        onChange={e=> setHeightField(parseFloat(e.target.value))}
                        disabled={toShow ? true : false}
                    />
                     <input 
                        type="number"
                        placeholder='Digite o seu peso Ex: 75.5 (em KG) '
                        value={weightField > 0 ? weightField :''}
                        onChange={e=> setWeightField(parseFloat(e.target.value))}
                        disabled={toShow ? true : false}
                    />
                    <button onClick={handleCalcImc}  disabled={toShow ? true : false} >Calcular</button>
                </div>
                <div className={style.rightside}>
                    {!toShow &&
                        <div className={style.grid}>
                            {levels.map((item, index)=>(
                            <GrindItem key={index} item={item} />
                            ))}
                        </div>
                    }
                    {toShow &&
                    
                        <div className={style.bigGrid}>
                            <div className={style.rightArrow} onClick={hendalBackButton}>
                                <img src={leftArrowImage} alt='' width={25}/>
                            </div>
                            
                            <GrindItem item={toShow} />

                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default App;