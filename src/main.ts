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
  const div = document.getElementById('pricing')!
  const p = document.createElement('p')
  const ul = document.createElement('ul')
  const liPrio = document.createElement('li')
  const liRegister = document.createElement('li')
  let numberOfPc = parseInt((document.getElementById('number') as HTMLInputElement).value)
  let country = (document.getElementById('countrytext') as HTMLInputElement).value
  //find why the input doesnt work
  p.remove()
  ul.remove()
  liPrio.remove()
  liRegister.remove()
  try{
    let vs:Data = new Data(country, numberOfPc)
    if(checker(vs.name)){
      if(vs.name == "Hungary"){
        p.textContent = `Belföldi árak:`
        ul.style.listStyleImage = `url(../star.svg)`
        liPrio.textContent =`${data.find(x => x.name == vs.name)!.prio} ft`
        liRegister.textContent =`${data.find(x => x.name == vs.name)!.register} ft`
        ul.appendChild(liPrio)
        ul.appendChild(liRegister)
        div.appendChild(p)
        div.appendChild(ul)
      }
      else{
        p.textContent = `${data.find(x => x.name == vs.name)} prices:`
        ul.style.listStyleImage = `url(../star.svg)`
        liPrio.textContent =`${data.find(x => x.name == vs.name)!.prio} €`
        liRegister.textContent =`${data.find(x => x.name == vs.name)!.register} €`
        ul.appendChild(liPrio)
        ul.appendChild(liRegister)
        div.appendChild(p)
        div.appendChild(ul)
      }
    }
  }catch(e){
    if(e  instanceof Error){
      p.textContent =`${e.message}`
      div.appendChild(p)
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