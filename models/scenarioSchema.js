let mongoose = require('mongoose')

const scenarioSchema = new mongoose.Schema({
_id:{
type: String,
required: [true, 'needs scenario name']
},
story_name:{
type: String,
},
story_page:{
type: Number
},
scenario:{
type: String
},
choices:{
type: [Number]
}
},
{collections: 'scenarios'}
);