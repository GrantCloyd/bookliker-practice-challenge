async function getData(stringURL, obj = {}) {
   let resp = await fetch(`http://localhost:3000/${stringURL}`, obj)
   let data = await resp.json()
   return data
}

function addBooksToNavBar(book) {
   let listPanel = document.querySelector("#list")
   let li = document.createElement("li")
   let { id, title, subtitle, description, author, img_url, users } = book
   li.textContent = title
   li.title = title
   li.id = id
   li.subtitle = subtitle
   li.description = description
   li.author = author
   li.img_url = img_url
   li.users = users
   li.addEventListener("click", addBooksFromNavBar)
   listPanel.append(li)
}

function addBooksFromNavBar() {
   const showPanel = document.querySelector("#show-panel")
   //clear current area
   showPanel.innerHTML = ""
   //create elements
   let div = document.createElement("div")

   let img = document.createElement("img")
   img.src = this.img_url

   let pTitle = document.createElement("p")
   pTitle.innerHTML = `<strong>${this.title}</strong>`

   let pAuthor = document.createElement("p")
   pAuthor.innerHTML = `<strong>${this.author}</strong>`

   let pDescr = document.createElement("p")
   pDescr.textContent = this.description

   let ul = document.createElement("ul")
   ul.id = "userList"
   //different creation process to iterate through users and append to the ul
   this.users.forEach(user => {
      let li = document.createElement("li")
      li.textContent = user.username
      ul.appendChild(li)
   })

   let button = document.createElement("button")
   button.textContent = "Like ♥"
   button.addEventListener("click", () => updateLikes(this.users, this.id))
   //fetch call to server to update likes/users
   function updateLikes(users, id) {
      let userArr = [...users, { id: 1, username: "pouros" }]

      let configObj = {
         method: "PATCH",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ users: userArr }),
      }

      getData(`books/${id}`, configObj).then(data => {
         let uList = document.querySelector("#userList")
         let li = document.createElement("li")
         li.textContent = data.users[data.users.length - 1].username

         uList.appendChild(li)

         uList.parentElement.querySelector("button").textContent = "Unlike"
      })
   }
   div.append(img, pTitle, pAuthor, pDescr, ul, button)
   showPanel.appendChild(div)
}

getData("books").then(data => data.forEach(addBooksToNavBar))
