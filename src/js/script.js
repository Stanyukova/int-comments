let userName = document.querySelector(".user-name");
let userComments = document.querySelector(".user-comments");
let dateComments = document.querySelector(".dateComments");
let addButton = document.querySelector(".add");
let userComment = document.querySelector(".user-comment");
let activeFavorite = document.querySelectorAll(".favorite");

let comments = [];

let stored = localStorage.getItem("allcomments");
if (stored) {
    comments = JSON.parse(stored);
    displayComment();
}

function handler() {
    let a = new Date().toLocaleDateString(); //форматированная
    let now = new Date().toLocaleTimeString().slice(0, -3); //только время
    let dateInterval = Math.floor(
        (new Date() - new Date(`${dateComments.value}`)) / (60 * 60 * 24) / 1000
    );

    let dateCalendar = new Date(`${dateComments.value}`).toLocaleDateString(); //форматированная по календарю
    let fullDate;

    if ((userName.value && userComments.value !== "") || undefined) {
        if (dateCalendar === a) {
            fullDate = `Сегодня, ${now}`;
        } else if (dateInterval == "1") {
            fullDate = `Вчера, ${now}`;
        } else if (dateComments.value == "" || undefined) {
            fullDate = `Сегодня, ${now}`;
        } else {
            fullDate = dateCalendar;
        }

        let newComment = {
            name: userName.value,
            comment: userComments.value,
            date: fullDate,
            realdate: now,
            like: false,
            id: null,
        };
        comments.push(newComment);
        displayComment();
        localStorage.setItem("allcomments", JSON.stringify(comments));
    }
}

function displayComment() {
    // let likeStyle = '';
    comments.forEach(function (item, i) {
        item.id = `item_${i}`;
        let displayComment = `
        <div class="commentaries"  >
        <div class="name-block2">
            <div class="name-block_img">
                <img src="/img/min_xh.jpeg" alt="">
            </div>
            <div class="block-name">
                <p>${item.name}</p>
            </div>
            <div class="date__comments">
                ${item.date}
            </div>

        </div>
        <div class="user__comment" >
            ${item.comment}
        </div>

         <div class="icons">
                    <div class="favorite">
                        <svg  height="28px" style="enable-background:new 0 0 512 512;" version="1.1"
                            viewBox="0 0 512 512" width="28px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink">
                            <g id="_x31_66_x2C__Heart_x2C__Love_x2C__Like_x2C__Twitter">
                                <g>
                                    <path id= 'like_${i}' class=${
      item.like ? "active" : "favorite1"
    }
                                        d="M365.4,59.628c60.56,0,109.6,49.03,109.6,109.47c0,109.47-109.6,171.8-219.06,281.271    C146.47,340.898,37,278.568,37,169.099c0-60.44,49.04-109.47,109.47-109.47c54.73,0,82.1,27.37,109.47,82.1    C283.3,86.999,310.67,59.628,365.4,59.628z"
                                        />
                                </g>
                            </g>
                            <g id="Layer_1" />
                        </svg>
    
                    </div>
                    <div class="deleteComment" >
               
                    <svg id ='${
                      item.id
                    }' xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="30px" height="30px"><path  d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"/></svg>
                       
                    </div>
                </div>
           
</div>
        `;
        let div1 = document.createElement("div");

        div1.innerHTML = displayComment;
        userComment.appendChild(div1);
    });
}

addButton.addEventListener("click", handler);

userComment.addEventListener("click", activeHeart);

function activeHeart(event) {
    let idLike = event.target.getAttribute("id");
    let likeElem = document.getElementById(`${idLike}`);
    if (likeElem.classList.value == 'favorite1') {
        likeElem.classList.value = 'active'
    } else {
        likeElem.classList.value = 'favorite1'
    }
    let x = parseInt(idLike.replace(/[^\d]/g, ""));
    
    let like = `item_${x}`;
    
    for (let key of comments) {
        if (like == key.id) {
            if (key.like == false) {
                key.like = true;
            } else {
                key.like = false;
            }

        }   
        localStorage.setItem("allcomments", JSON.stringify(comments));
    }

}

userComment.addEventListener("click", deleteComment);

function deleteComment(event) {
    let idDelete = event.target.getAttribute("id");
    console.log(idDelete);

    for (let key of comments) {
        if (idDelete == key.id) {
            console.log(key.id)
            let y = parseInt(key.id.replace(/[^\d]/g, ""));
            comments.splice(y, 1);
            console.log("delete");
            location.reload()
        }
      
        localStorage.setItem("allcomments", JSON.stringify(comments));
        
    }
}