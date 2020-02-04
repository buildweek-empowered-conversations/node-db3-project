const db = require("../dbConfig.js");

module.exports = {
  find,
  findById,
  findSteps,
  update,
  add,
  addStep
};

function find() {
  return db("schemes");
}
function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
}

function findSteps(id) {
  return db("steps as s")
    .join("schemes as sc", "sc.id", "s.scheme_id")
    .select("sc.scheme_name", "s.step_number", "s.instructions")
    .where({scheme_id: id})
 }

//  async function add (){
//     const[id]= await db('schemes').insert(scheme);
//     return findById(id)
// }

function add(scheme) {
  db("schemes")
    .insert(scheme)
    .then(ids => {
      return findById(ids[0]);
    });
}

 async function addStep (step, scheme_id){
  await db('steps').insert(step, scheme_id)


}
async function update(changes, id) {
  await db("schemes")
    .where({ id })
    .update(changes);

  return findById(id);
}
