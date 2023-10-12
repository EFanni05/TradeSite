import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import {Shipping} from './Shippingdata';
import {Data} from './Data';
import Country from './country.json';
let data:Shipping [] = []

function AddItem(vs:Shipping){
  const option = document.createElement('option')
  const select = document.getElementById('country')!
  option.value = `${vs.name}`
  option.textContent = `${vs.name}`
  select.appendChild(option)
}

function checker(vs:string){
  let include:boolean = false
  for (let index = 0; index < data.length; index++) {
    if(data[index].name == vs){
      include = true
      break
    }
  }
  if(include){
    return data
  }
  else{
    throw new Error("ERROR: This country isn't in my list (DM me about it)")
  }
}

function Calculate(){
  const p = document.getElementById('p')!
  const liPrio = document.getElementById('prio')!
  const liRegister = document.getElementById('checked')!
  let numberOfPc = parseInt((document.getElementById('number') as HTMLInputElement).value)
  let country = (document.getElementById('countrytext') as HTMLInputElement).value
  p.textContent = ""
  liPrio.textContent = ""
  liRegister.textContent = ""
  try{
    let vs:Data = new Data(country, numberOfPc)
    if(checker(vs.name)){
      if(vs.pcs < 5){
        if(vs.name == "Hungary"){
          p.textContent = `Belföldi árak ${vs.pcs}db Photocard-ra:`
          liPrio.textContent =`${data.find(x => x.name == vs.name)!.prio} ft`
          liRegister.textContent =`${data.find(x => x.name == vs.name)!.register} ft`
        }
        else{
          p.textContent = `${data.find(x => x.name == vs.name)} prices for ${vs.pcs}:`
          liPrio.textContent =`${data.find(x => x.name == vs.name)!.prio} €`
          liRegister.textContent =`${data.find(x => x.name == vs.name)!.register} €`
        }
      }
      else{
        throw new Error("The calculator only available until 50g (DM me about it)")
      }
    }
  }catch(e){
    if(e  instanceof Error){
      p.textContent =`${e.message}`
    }
  }
}

function load(){
  document.getElementById('calculate')!.addEventListener('click', Calculate)
  try{
    let a:Shipping
    for(const vs of Country){
      a = new Shipping(vs.name, vs.prio, vs.register)
      data.push(a)
    }
  }catch(e){
    if(e instanceof Error){
      console.log(e.message)
    }
  }
  for (let index = 0; index < data.length; index++) {
    AddItem(data[index])    
  }
}

document.addEventListener('DOMContentLoaded', load)