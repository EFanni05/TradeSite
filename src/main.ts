import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import {Shipping} from './Shippingdata';
import Country from './country.json';
let data:Shipping [] = []

function AddItem(vs:Shipping){
  const option = document.createElement('option')
  const select = document.getElementById('country')!
  option.value = `${vs.name}`
  option.textContent = `${vs.name}`
  select.appendChild(option)
}

function Calculate(){

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