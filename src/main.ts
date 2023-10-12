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

function Trade(){
  const div = document.getElementById('TradeSale')!
  const h3 = document.createElement('h3')
  const ul = document.createElement('ul')
  const li = document.createElement('li')
  const a = document.createElement('a')
  const p = document.createElement('p')
  h3.remove()
  ul.remove()
  li.remove()
  a.remove()
  p.remove()
  h3.textContent = "Trade"
  ul.id = "Trade"
  div.appendChild(h3)
  li.textContent = "You need to have atleast 5 clickable proof otherwise you need to send out 1st"
  li.style.fontWeight = "bold"
  ul.appendChild(li)
  li.textContent = "After the address exchange there are no backouts"
  li.style.fontWeight = "bold"
  ul.appendChild(li)
  li.textContent = "I prefer sending out the same day"
  li.style.fontWeight = "normal"
  ul.appendChild(li)
  li.textContent = "For outside of EU, I'll take care of customs"
  li.style.fontWeight = "normal"
  ul.appendChild(li)
  li.innerHTML = "I <b>expect</b> you to pack photocard same way as I do <i>Deco sleevs is not a must</i>"
  li.style.fontWeight = "normal"
  ul.appendChild(li)
  li.textContent = "I send out all of my mail with piority"
  li.style.fontWeight = "normal"
  ul.appendChild(li)
  li.innerHTML = "I only hold them for 24h <i>but for request I can extend that</i>"
  li.style.fontWeight = "normal"
  ul.appendChild(li)
  a.href = "#Top"
  a.textContent = "back"
  p.appendChild(a)
  div.appendChild(ul)
  div.appendChild(p)
}

function Sale(){
  const div = document.getElementById('TradeSale')!
  const h3 = document.createElement('h3')
  const ul = document.createElement('ul')
  const li = document.createElement('li')
  const a = document.createElement('a')
  const p = document.createElement('p')
  h3.remove()
  ul.remove()
  li.remove()
  a.remove()
  p.remove()
  h3.textContent = "Sale"
  ul.id = "Sale"
  div.appendChild(h3)
  li.innerHTML = "<b>I only accept Paypal f&f</b>"
  ul.appendChild(li)
  li.innerHTML = "I only hold them for 24h <i>but for request I can extend that</i>"
  ul.appendChild(li)
  li.textContent = "For outside of EU, I'll take care of customs"
  ul.appendChild(li)
  li.textContent = "If there is a posibilty you will need to pay customs I'll let you know"
  ul.appendChild(li)
  li.textContent = "Mail outside of Europe may take 1 month to arrive keep in mind that!"
  ul.appendChild(li)
  li.innerHTML = "For shipping prices,<i>like bigger oders and items</i> contact me!"
  ul.appendChild(li)
  li.textContent = "I'll send the tracking ID fast as I can, but usually it's take 1 day to appear in the system"
  ul.appendChild(li)
  a.href = "#Top"
  a.textContent = "back"
  p.appendChild(a)
  div.appendChild(ul)
  div.appendChild(p)
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
  document.getElementById('trade')!.addEventListener('click', Trade)
  document.getElementById('sale')!.addEventListener('click', Sale)
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