module.exports = {
  GenePage: (req, res) => {
  res.render('geneform.ejs', {
      title: "Find Your Dream Smartphone"
      ,message: ''
  });
},
GeneSmart: (req, res) => {
  let myId=0;
  let myBrand= req.body.myBrand;
  let myPrice = req.body.myPrice;
  let myColour = req.body.myColour;
  let myMaterial = req.body.myMaterial;
  let myInches= req.body.myInches;
  let myYear = req.body.myYear;
  let mySctype = req.body.mySctype;
  let myCamnum= req.body.myCamnum;
  let myRcam = req.body.myRcam;
  let myFcam = req.body.myFcam;
  let myWeight = req.body.myWeight;
  let myScratio =req.body.myScratio;
  let myRAM = req.body.myRAM;
  let myChip = req.body.myChip;
  let myGPU = req.body.myGPU;
  let myStorage = req.body.myStorage;
  let mybattCap = req.body.mybattCap;
  let myBattery = req.body.myBattery;
 
  var demand =[];
 
  var item=[];
  
    db.query("SELECT * FROM smartphone", function(error,results, fields){
    if (error) {
        res.redirect('/');
    }
    else{
        for (var i in results) {
          var product_id=  results[i].product_id;
          var product_price=  results[i].product_price;
          var product_brand=  results[i].product_brand;
          var product_ryear=  results[i].product_ryear;
          var product_weight=  results[i].product_weight;
          var product_colour=  results[i].product_colour;
          var product_material=  results[i].product_material;
          var product_size=  results[i].product_size;
          var product_sctype=  results[i].product_sctype;
          var product_reso=  results[i].product_reso;
          var product_camnum=  results[i].product_camnum;
          var product_camR=  results[i].product_camR;
          var product_camF=  results[i].product_camF;
          var product_chipset=  results[i].product_chipset;
          var product_gpu=  results[i].product_gpu;
          var product_ram=  results[i].product_ram;
          var product_storage=  results[i].product_storage;
          var product_battype=  results[i].product_battype;
          var product_batcap=  results[i].product_batcap;
          
            item[i]= new Item(product_id,product_brand,product_price, product_colour,product_material,product_size,product_ryear, product_sctype, product_camnum, product_camR, product_camF,product_weight,product_reso,product_chipset,product_gpu,product_ram, product_storage, product_batcap,product_battype);
          
          }
        
    
    
    demand = new Item(myId,myBrand,myPrice,myColour,myMaterial,myInches,myYear,mySctype,myCamnum,myRcam,myFcam,myWeight,myScratio,myChip,myGPU,myRAM,myStorage,mybattCap,myBattery);
    let maxcross=0;
    var j;
    var g;
    var o;
    var x;
    let gene3;
    let max = 0;
    var temp1;
    var population=150;
    let chrome=[];
    var generation=100;
  for (g=0;g< generation;g++){
   if(g==0){
    for(x=0;x<population;x++){
      var arr = [];
      var smart= Array(3);
      var count =0;
      var temp;
    while(arr.length<3){
        temp = item[Math.floor(Math.random() * item.length)];
        if(arr.includes(temp.product_id)==false)
        {
          arr.push(temp.product_id);
          smart[count]=temp;
          count++;
        }}

          temp1= new Gene(smart,0);
          temp1.calcFitness();
          chrome[x]=temp1;
          chrome.sort(compare_fit);
       } 
   }
   else{
     
    for(var x=population/2;x<population;x++){
      var arr = [];
      var smart= Array(3);
      var count =0;
      while(arr.length<3){
       var temp = item[Math.floor(Math.random() * item.length)];
        if(arr.includes(temp.product_id)==false)
        {
         arr.push(temp.product_id);
          smart[count]=temp;
          count++;
        }
        }     
          temp1= new Gene(smart,0);
          //chrome.push(temp1);
          chrome[x]=temp1;
          temp1.calcFitness();
          chrome.sort(compare_fit);
   } 
  }
  chrome.sort(compare_fit);
  //crossover
 for(var i =0;i<chrome.length;i++){
   let maxcross=0;
  for(var j =1;j<chrome.length;j++){
  var child = cross(chrome[i],chrome[j]);
  child.calcFitness();
  if(child.fitness>chrome[i].fitness){
    if(maxcross<child.fitness){
    maxcross=child.fitness;
    chrome[i]=child;
  }}
 }}

chrome.sort(compare_fit);
console.log(chrome);

chrome.forEach(chrome => {
  
  if (chrome.fitness > max) {
    max =chrome.fitness;
    gene3=chrome;
  }
});
}
console.log(gene3);
var r1=gene3.genotype[0].product_id;
var r2=gene3.genotype[1].product_id;
var r3=gene3.genotype[2].product_id;
} 

let query = 'SELECT * FROM `smartphone` where product_id IN ( "' + r1 + '","'+r2 +'","'+ r3+'")';
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                console.log(result);
                res.render('result.ejs', {
                  title:"Admin Home"
                  ,product: result
              });
            });
});
class Item { constructor(product_id,product_brand,product_price, product_colour,product_material,product_size,product_ryear, product_sctype, product_camnum, product_camR, product_camF,product_weight,product_reso,product_chipset,product_gpu,product_ram, product_storage, product_batcap,product_battype) {
  this.product_id=product_id;
  this.product_brand=product_brand;
  this.product_price=parseInt(product_price);
  this.product_colour=product_colour;
  this.product_material=product_material;
  this.product_size=parseInt(product_size);
  this.product_ryear=parseInt(product_ryear);
  this.product_sctype=product_sctype;
  this.product_camnum=product_camnum;
  this.product_camR=parseInt(product_camR);
  this.product_camF=parseInt(product_camF);
  this.product_weight=parseInt(product_weight);
  this.product_reso=product_reso;
  this.product_chipset=product_chipset;
  this.product_gpu=product_gpu;
  this.product_ram=product_ram;
  this.product_storage=product_storage;
  this.product_batcap=parseInt(product_batcap);
  this.product_battype=product_battype;
  
  }
}

var Gene = function(chrome,fitness) {
    var i;
    this.genotype=[];
    for(i=0;i<chrome.length;i++){
      this.genotype[i]=new Item(chrome[i].product_id,chrome[i].product_brand,
        chrome[i].product_price,chrome[i].product_colour,chrome[i].product_material,
        chrome[i].product_size,chrome[i].product_ryear,chrome[i].product_sctype,
        chrome[i].product_camnum, chrome[i].product_camR, chrome[i].product_camF,
        chrome[i].product_weight,chrome[i].product_reso,chrome[i].product_chipset,
        chrome[i].product_gpu,chrome[i].product_ram, chrome[i].product_storage,
        chrome[i].product_batcap,chrome[i].product_battype);
    }
    
    this.fitness=parseInt(fitness);
    this.conflict=[];
}

Gene.prototype.calcFitness = function() {
 
  var fitness_chrome=0;
 
  for(i=0;i<this.genotype.length;i++){
    var fitness=0;
    var conflict=0;
     if(this.genotype[i].product_brand==demand.product_brand)
      { 
         fitness+=5;
      }
      else{
        conflict+=1;
        fitness+=1;
      }
        
         if(this.genotype[i].product_price <= demand.product_price)
         { //console.log("price");
         fitness+=20;
          }
          else{
            conflict+=1;
            fitness+=1;
          }
           if(this.genotype[i].product_colour.match(demand.product_colour))
           {/// console.log("color");
           fitness+=5;
             }
             else{
              conflict+=1;
              fitness+=1;
            }
              if(this.genotype[i].product_material.match(demand.product_material))
            { //console.log("material");
                fitness+=5;
              }
              else{
                conflict+=1;
                fitness+=1;
              }
                if(this.genotype[i].product_size>=demand.product_size)
                {//console.log("size");
                  fitness+=5;
                  }
                  else{
                    conflict+=1;
                    fitness+=1;
                  }
                    if(this.genotype[i].product_ryear>=demand.product_ryear)
                    {//console.log("ryear");
                     fitness+=5;
                      }
                      else{
                        conflict+=1;
                        fitness+=1;
                      }
                      if(this.genotype[i].product_sctype.match(demand.product_sctype))
                      { //console.log("sctype");
                        fitness+=5;
                      }
                      else{
                        conflict+=1;
                        fitness+=1;
                      }
                        if(this.genotype[i].product_camnum.match(demand.myCamnum))
                        { //console.log("camnum");
                         fitness+=5;
                        }
                        else{
                          conflict+=1;
                          fitness+=1;
                        }
                          if(this.genotype[i].product_camR>=demand.product_camR)
                          {// console.log("camR");
                           fitness+=5;
                          }
                          else{
                            conflict+=1;
                            fitness+=1;
                          }
                            if(this.genotype[i].product_camF>=demand.product_camF)
                            {//console.log("camF");
                             fitness+=5;
                              }
                              else{
                                conflict+=1;
                                fitness+=1;
                              }
                              if(this.genotype[i].product_weight <= demand.product_weight)
                              {//console.log("weight");
                               fitness+=5;
                            }
                            else{
                              conflict+=1;
                              fitness+=1;
                            }
                                if(this.genotype[i].product_reso.match(demand.product_reso))
                                {//console.log("reso");
                                 fitness+=5;
                                 }
                                 else{
                                  conflict+=1;
                                  fitness+=1;
                                }
                                  if(this.genotype[i].product_chipset.match(demand.product_brand))
                                  {// console.log("brand");
                                      fitness+=5;
                                  }
                                  else{
                                    conflict+=1;
                                    fitness+=1;
                                  }
                                  if(this.genotype[i].product_gpu.match(demand.product_gpu))
                                  {// console.log("brand");
                                      fitness+=5;
                                  }
                                  else{
                                    conflict+=1;
                                    fitness+=1;
                                  }
                                  if(this.genotype[i].product_ram.match(demand.product_ram))
                                  {// console.log("ram");
                                    fitness+=5;
                                  }
                                  else{
                                    conflict+=1;
                                    fitness+=1;
                                  }
                                    if(this.genotype[i].product_storage.match(demand.product_storage))
                                    {// console.log("storage");
                                      fitness+=5;
                                      }
                                      else{
                                        conflict+=1;
                                        fitness+=1;
                                      }
                                      if(this.genotype[i].product_batcap <= demand.product_batcap)
                                      {//console.log("batcap");
                                        fitness+=5;
                                        }
                                        else{
                                          conflict+=1;
                                          fitness+=1;
                                        }
                                        if(this.genotype[i].product_battype.match(demand.product_battype))
                                        { //console.log("battype");
                                          fitness+=5;
                                        }    else{
                                          conflict+=1;
                                          fitness+=1;
                                        }
                                        fitness_chrome=fitness_chrome+(fitness/100)*(100/3);
                                      
                                        this.conflict[i]=conflict;
                                    }  
                                    this.fitness=fitness_chrome.toFixed(2);
                                    //return fitness;
                                    
    
  }
  function compare_fit(a, b){
    // a should come before b in the sorted order
    if(a.fitness < b.fitness){
            return -1;
    // a should come after b in the sorted order
    }else if(a.fitness > b.fitness){
            return 1;
    // a and b are the same
    }else{
            return 0;
    }
}

var cross = function(gene1, gene2){
  var prodlist=[];
  var prodlist2=[];
  var prodid2=[];
  var prodid=[];
   prodlist[0]=gene1.genotype[0];
   prodid.push(prodlist[0].product_id);
   if(prodid.includes(gene1.genotype[1].product_id)){
     prodlist[1]=mutation(prodid);
   }
   else
     prodlist[1]=gene1.genotype[1];
     prodid.push(gene1.genotype[1].product_id);

   if(prodid.includes(gene2.genotype[2].product_id)){
       prodlist[2]=mutation(prodid);
     }
   else{
       prodlist[2]=gene2.genotype[2];
       prodid.push(gene2.genotype[2].product_id);
     }
   prodlist2[0]=gene2.genotype[0];
   prodid2.push(prodlist2[0].product_id);
   if(prodid2.includes(gene2.genotype[1].product_id)){
     prodlist2[1]=mutation(prodid2);
   }
   else{
     prodlist2[1]=gene2.genotype[1];
     prodid2.push(gene2.genotype[1].product_id);
   }
   if(prodid2.includes(gene1.genotype[2].product_id)){
       prodlist2[2]=mutation(prodid2);
     }
   else{
       prodlist2[2]=gene1.genotype[2];
       prodid2.push(gene1.genotype[2].product_id);
     }
 var child1 = new Gene (prodlist,0);
 var child2 = new Gene (prodlist,0);
 child1.calcFitness();
 child2.calcFitness();
 if (child1.fitness>child2.fitness)
 return child1;
 return child2;
 }

 var mutation = function(prodid)
{
  var temp2=item[Math.floor(Math.random() * item.length)];
  var id= temp2.product_id;
  if(prodid.includes(temp2)){
    mutation(id);
  }
  return temp2;
}
var getFittest = function (){
  var fittest =0;
  var ind=0;
  for(var j=0;j<chrome.length;j++){
    if(fittest<=chrome[j].fitness){
      fittest=chrome[j].fitness;
      ind=j;
    }
  }
  console.log(fittest);
}
},GeneResult: (req, res) => {
  
  console.log(gene3);
},};
