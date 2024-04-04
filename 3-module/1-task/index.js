function namify(users) {
  let userNames = [];

  for (let user of users) {
    if (user.hasOwnProperty("name")) {
      userNames.push(user.name);
    }
  }
  return userNames;
}
