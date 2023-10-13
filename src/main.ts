//import './style.css';
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
let clickCount: number

function Calculate(){
  const p = document.getElementById('p')!
  const div = document.getElementById('spinner-div')!
  const spam = document.getElementById('spinner-spam')!
  if(clickCount == 0){
  div.remove()
  spam.remove()
  clickCount++
  }
  const p1 = document.getElementById('p1')!
  const liPrio = document.getElementById('prio')!
  const liRegister = document.getElementById('checked')!
  let numberOfPc = (document.getElementById('number') as HTMLInputElement).value
  let country = (document.getElementById('countrytext') as HTMLInputElement).value
  if(numberOfPc == ""){
    p.textContent = "Please fill out the number of PCs"
    p.style.color = "red"
  }
  else{
    p.textContent = ""
    p.style.color = "black"
    liPrio.textContent = ""
    liRegister.textContent = ""
    try{
      let vs:Data = new Data(country, parseInt(numberOfPc))
      let weight:number = vs.pcs * 0.028 
      if(checker(vs.name)){
        if(weight < 0.5){
          if(vs.name == "Hungary"){
            p.textContent = `Belföldi árak ${vs.pcs}db Photocard-ra:`
            liPrio.textContent =`Elsőbségi: ${data.find(x => x.name == vs.name)!.prio} ft`
            liRegister.textContent =`Ajánlott: ${data.find(x => x.name == vs.name)!.register} ft`
            p1.textContent ="Ajánlott nyomkövetett!"
          }
          else{
            p.textContent = `${vs.name} prices for ${vs.pcs}:`
            liPrio.textContent =`Priority: ${data.find(x => x.name == vs.name)!.prio} €`
            liRegister.textContent =`Register: ${data.find(x => x.name == vs.name)!.register} €`
            p1.textContent = "Register is TRACKED!"
          }
        }
        else if(weight < 2000){
          if(vs.name == "Hungary"){
            p.textContent = `Belföldi árak ${vs.pcs}db Photocard-ra:`
            liPrio.textContent =`Elsőbségi: ${data.find(x => x.name == vs.name)!.prio500} ft`
            liRegister.textContent =`Ajánlott: ${data.find(x => x.name == vs.name)!.register500} ft`
            p1.textContent ="Ajánlott nyomkövetett!"
          }
          else{
            p.textContent = `${vs.name} prices for ${vs.pcs}:`
            liPrio.textContent =`Priority: ${data.find(x => x.name == vs.name)!.prio500} €`
            liRegister.textContent =`Register: ${data.find(x => x.name == vs.name)!.register500} €`
            p1.textContent = "Register is TRACKED!"
          }
        }
        else{
          throw new Error("The calculator only available until 500g (DM me about it)")
        }
      }
    }catch(e){
      if(e  instanceof Error){
        p.textContent =`${e.message}`
      }
    }
  }
}

function load(){
  clickCount = 0
  console.log("If you see this send me 'star' emoji\n(I guess you also learnt a litte bit of 'how to make a website)\nI know the code is bad even if I study this for like 5 years,\nI'm far better at C# or Java than F JavaScript or TypeScript(btw i worte in this)\nI don't want to work on frontend ever but I'm not willing to make a carrd or website builder site\nIf you see anything wrong with the inner code tell me!\nno comment on spelling, I know I'm terible")
  document.getElementById('calculate')!.addEventListener('click', Calculate)
  try{
    let a:Shipping
    for(const vs of Country){
      a = new Shipping(vs.name, vs.prio, vs.register, vs.prio500, vs.register500)
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