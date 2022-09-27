const users=[];
function addUser(id,username){
  const user={id,username};
  users.push(user);
  return users;
}

function userLeave(id) {
    const index = users.findIndex(user => user.id === id);
  
    if (index !== -1) {
      return users.splice(index, 1)[0];
    }
  }


module.exports={addUser,userLeave};