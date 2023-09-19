//Require Mongoose
const mongoose = require('mongoose');
//Purpose: Shorthand for the Schema constructor
const {Schema} = mongoose;
//Purpose: Define our collection and create validation rules
const breadSchema = new Schema(
  {
      name      : {type : String, required: true},
      hasGluten : {type : Boolean},
      image     : {type : String, default: 'http://placehold.it/500x500.png'},
      baker: {type: Schema.Types.ObjectID, ref: 'Baker'}  
  }
);

// helper methods 
breadSchema.methods.getBakedBy = function(){
  return `${this.name} was baked with love by ${this.baker.name}, who has been with us since ${this.baker.startDate.getFullYear()}`
}



//Purpose: Use said schema to creat a model 
const Bread = mongoose.model('Bread', breadSchema);



module.exports = Bread;



