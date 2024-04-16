function makeFriendsList(friends) {
  let ul = document.createElement("ul");

  let listItems = friends.map((friend) => {
    let li = document.createElement("li");
    li.innerHTML = `${friend.firstName} ${friend.lastName}`;
    return li;
  });

  ul.append(...listItems);

  return ul;
}
