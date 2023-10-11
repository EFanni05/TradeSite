export class Data{
    constructor(public name:string, public pcs:number){
        if(name.trim() == ""){
            throw new Error("ERROR: no country")
        }
        else if(pcs < 0 && isNaN(pcs)){
            throw new Error("ERROR: incorrect datat(Photocard number)")
        }
    }
}