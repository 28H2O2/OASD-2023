let thisId = 0;

document.getElementById('addToCartButton').addEventListener('click', async function () {
  // const id = document.getElementById('artworkId').textContent.split(' ')[1];
  const id = thisId;
  console.log(`Add artwork ${id} to cart`)
  // const response = await fetch(`http://localhost:3000/PHP/addToCart.php?id=${id}`, { method: 'POST' });
  const response = await fetch('http://localhost:3000/PHP/addToCart.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `id=${id}`
  });
  const result = await response.json();

  if (result.success) {
    alert('Successfully added to cart!');
  } else {
    console.error(result.error);
    alert('Failed to add to cart!');
  }
});


const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

async function getArtworkDetail() {
  const response = await fetch(`http://localhost:3000/PHP/getArtworkDetail.php?id=${id}`);
  const result = await response.json();

  if (result.success) {
    const artwork = result.artwork;
    document.getElementById('artworkImage').src = 'http://localhost:3000/PHP/' + artwork.image;
    // document.getElementByTd('artworkId').textContent = 'ID: ' + artwork.id; //这个不展示在页面上
    thisId = artwork.id;

    const formData = new FormData();
    formData.append('artworkId', thisId);

    fetch('http://localhost:3000/PHP/increaseVisited.php', {
      method: 'POST',
      body: formData
    });
    document.getElementById('artworkName').textContent = artwork.name;
    document.getElementById('artworkAuthor').textContent = 'Author: ' + artwork.author;
    document.getElementById('artworkPrice').textContent = 'Price: $' + artwork.price;
    document.getElementById('artworkStatus').textContent = 'Status: ' + (artwork.status === '0' ? 'Available' : 'Sold Out');
    document.getElementById('artworkDate').textContent = 'Release Time: ' + new Date(artwork.releaseTime).toLocaleDateString();
    document.getElementById('artworkUsername').textContent = 'Publisher: ' + artwork.username;
    document.getElementById('artworkYear').textContent = 'Year: ' + artwork.year;
    document.getElementById('artworkSize').textContent = 'Size: ' + artwork.size;
    document.getElementById('artworkGenre').textContent = 'Genre: ' + artwork.genre;
    document.getElementById('artworkDescription').textContent = 'Description: ' + artwork.description;
  } else {
    console.error(result.error);
  }

  // Fetch and render the comments
  // fetch(`http://localhost:3000/PHP/getComment.php?artworkId=${thisId}`)
  //   .then(response => response.json())
  //   .then(data => {
  //     data.forEach(comment => {
  //       let commentElem = document.createElement('div');
  //       commentElem.className = 'comment' + (comment.deleted ? ' deletedComment' : '');
  //       commentElem.innerText = comment.username + ': ' + (comment.deleted ? 'this comment has been deleted' : comment.text) + ' (' + comment.likes + ' likes)';
  //       // // Find the parent comment's "replies" div and append the new comment to it
  //       // let repliesElem = commentElem.querySelector('.replies');
  //       // repliesElem.appendChild(newCommentElem);
  //       // Add a like button
  //       let likeButton = document.createElement('button');
  //       likeButton.innerText = comment.hasLiked ? 'Unlike' : 'Like';

  //       likeButton.addEventListener('click', function () {
  //         // Send a request to the server to toggle the like
  //         fetch('http://localhost:3000/PHP/toggleLike.php', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/x-www-form-urlencoded'
  //           },
  //           body: 'commentId=' + comment.id
  //         })
  //           .then(response => response.json())
  //           .then(data => {
  //             if (data.status === 'success') {
  //               // Update the like count
  //               comment.likes = data.newLikeCount;
  //               commentElem.innerText = comment.username + ': ' + comment.text + ' (' + comment.likes + ' likes)';
  //               likeButton.innerText = data.hasLiked ? 'Unlike' : 'Like';
  //             }
  //           });
  //       });
  //       commentElem.appendChild(likeButton);

  //       document.querySelector('#comments').appendChild(commentElem);

  //       // If the comment is by the logged-in user, add a delete button

  //       var thisUsername = document.getElementById('username').textContent;

  //       if (comment.username == thisUsername) {
  //         let deleteButton = document.createElement('button');
  //         deleteButton.innerText = 'Delete';
  //         deleteButton.addEventListener('click', function () {
  //           // Send a request to the server to delete the comment
  //           fetch('http://localhost:3000/PHP/deleteComment.php', {
  //             method: 'POST',
  //             headers: {
  //               'Content-Type': 'application/x-www-form-urlencoded'
  //             },
  //             body: 'commentId=' + comment.id
  //           })
  //             .then(response => response.json())
  //             .then(data => {
  //               if (data.status === 'success') {
  //                 // Mark the comment as deleted
  //                 comment.deleted = true;
  //                 commentElem.className = 'comment deletedComment';
  //                 commentElem.innerText = comment.username + ': this comment has been deleted (' + comment.likes + ' likes)';
  //               }
  //             });
  //         });
  //         commentElem.appendChild(deleteButton);
  //       }

  //       // Add a form for replying to the comment
  //       let replyForm = document.createElement('form');
  //       replyForm.innerHTML = '<input type="text" name="comment" placeholder="Reply..."> <button>Post Reply</button>';
  //       replyForm.addEventListener('submit', function (e) {
  //         e.preventDefault();

  //         // Send a request to the server to post the reply
  //         let commentText = this.querySelector('input[name="comment"]').value;
  //         fetch('http://localhost:3000/PHP/postComment.php', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/x-www-form-urlencoded'
  //           },
  //           body: 'artworkId=' + thisId + '&parentId=' + comment.id + '&text=' + encodeURIComponent(commentText)
  //         })
  //           .then(response => response.json())
  //           .then(data => {
  //             if (data.status === 'success') {
  //               // Clear the input field
  //               this.querySelector('input[name="comment"]').value = '';

  //               // Render the new comment
  //               let newCommentElem = document.createElement('div');
  //               newCommentElem.className = 'comment';
  //               newCommentElem.innerText = thisUsername + ': ' + commentText + ' (0 likes)';
  //               document.querySelector('#comments').appendChild(newCommentElem);
  //             }
  //           });
  //       });
  //       commentElem.appendChild(replyForm);
  //     });
  //   });
  fetch('http://localhost:3000/PHP/getComment.php?artworkId=' + thisId)
    .then(response => response.json())
    .then(comments => {
      let commentTree = buildCommentTree(comments);

      // 渲染评论树
      renderCommentTree(commentTree, document.querySelector('#comments'));
    });


}

getArtworkDetail();

// Post a comment
document.querySelector('#commentForm').addEventListener('submit', function (e) {
  e.preventDefault();
  let comment = document.querySelector('input[name="comment"]').value;

  // Send the comment to the server
  fetch('http://localhost:3000/PHP/postComment.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `artworkId=${thisId}&text=` + comment
  })
    .then(response => response.json())
    .then(data => {
      // Render the new comment
      let commentElem = document.createElement('div');
      commentElem.className = 'comment';
      commentElem.innerText = comment;
      document.querySelector('#comments').prepend(commentElem);
      getArtworkDetail();
    });
});


function buildCommentTree(comments) {
  let commentMap = {};

  // 首先，我们将所有评论添加到一个映射中，以它们的ID为键
  comments.forEach(comment => {
    commentMap[comment.id] = comment;
    comment.replies = [];  // 添加一个新的字段用于存储子评论
  });

  let rootComments = [];

  // 然后，我们为每个评论找到它的父评论，将它添加到父评论的replies字段中
  comments.forEach(comment => {
    if (comment.parentId) {
      let parentComment = commentMap[comment.parentId];
      parentComment.replies.push(comment);
    } else {
      // 如果评论没有父评论，那么它就是一个根评论
      rootComments.push(comment);
    }
  });

  return rootComments;
}


function renderCommentTree(comments, containerElem) {
  comments.forEach(comment => {
    // 渲染评论
    let commentElem = document.createElement('div');
    commentElem.className = 'comment';
    commentElem.innerText = comment.username + ': ' + comment.text + ' (' + comment.likes + ' likes)';
    containerElem.appendChild(commentElem);

    // 渲染子评论
    let repliesContainer = document.createElement('div');
    repliesContainer.className = 'replies';
    commentElem.appendChild(repliesContainer);
    renderCommentTree(comment.replies, repliesContainer);

    // Add a like button
    let likeButton = document.createElement('button');
    likeButton.innerText = comment.hasLiked ? 'Unlike' : 'Like';

    likeButton.addEventListener('click', function () {
      // Send a request to the server to toggle the like
      fetch('http://localhost:3000/PHP/toggleLike.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'commentId=' + comment.id
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === 'success') {
            // Update the like count
            comment.likes = data.newLikeCount;
            commentElem.innerText = comment.username + ': ' + comment.text + ' (' + comment.likes + ' likes)';
            likeButton.innerText = data.hasLiked ? 'Unlike' : 'Like';
          }
        });
    });
    commentElem.appendChild(likeButton);

    document.querySelector('#comments').appendChild(commentElem);

    // If the comment is by the logged-in user, add a delete button

    var thisUsername = document.getElementById('username').textContent;

    if (comment.username == thisUsername) {
      let deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';
      deleteButton.addEventListener('click', function () {
        // Send a request to the server to delete the comment
        fetch('http://localhost:3000/PHP/deleteComment.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: 'commentId=' + comment.id
        })
          .then(response => response.json())
          .then(data => {
            if (data.status === 'success') {
              // Mark the comment as deleted
              comment.deleted = true;
              commentElem.className = 'comment deletedComment';
              commentElem.innerText = comment.username + ': this comment has been deleted (' + comment.likes + ' likes)';
            }
          });
      });
      commentElem.appendChild(deleteButton);
    }

    // Add a form for replying to the comment
    let replyForm = document.createElement('form');
    replyForm.innerHTML = '<input type="text" name="comment" placeholder="Reply..."> <button>Post Reply</button>';
    replyForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Send a request to the server to post the reply
      let commentText = this.querySelector('input[name="comment"]').value;
      fetch('http://localhost:3000/PHP/postComment.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'artworkId=' + thisId + '&parentId=' + comment.id + '&text=' + encodeURIComponent(commentText)
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === 'success') {
            // Clear the input field
            this.querySelector('input[name="comment"]').value = '';

            // Render the new comment
            let newCommentElem = document.createElement('div');
            newCommentElem.className = 'comment';
            newCommentElem.innerText = thisUsername + ': ' + commentText + ' (0 likes)';
            document.querySelector('#comments').appendChild(newCommentElem);
          }
        });
    });
    commentElem.appendChild(replyForm);
  });
}

