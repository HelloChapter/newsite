jQuery(document).ready(function ($) {
    // Function to shuffle the array randomly
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    function createBlogPostElement(post) {
        const postContainer = document.createElement('div');
        postContainer.className = 'col col-blog';
        postContainer.innerHTML = `
    <div class="card aos-init aos-animate" data-aos="fade">
      <a href=${post.blogUrl} class="stretched-link"></a>
      <div class="card-image bg-image" style="background-image: url('${post.imageUrl}');"></div>
      <div class="card-content">
        <div class="blog-writer">
          <div class="profile-image">
            <img src="${post.writerImage}" alt="profile image" height="24" width="24" />
          </div>
          <h4><span class="name">${post.writerName}</span> <span class="date">${post.date}</span></h4>
        </div>
        <h5>${post.title}</h5>
        <div class="intro-text">
          <p>${post.introText}</p>
        </div>
      </div>
    </div>
  `;
        return postContainer;
    }
    fetch('../js/blogData.json')
        .then(response => response.json())
        .then(data => {

            console.log(window.location.pathname)
            const pathname = window.location.pathname

            const filteredData = data.filter(post => post.blogUrl !== pathname);
            debugger;
            shuffleArray(filteredData);
            const selectedPosts = filteredData.slice(0, 4);
            const blogListingContainer = document.getElementById('blog-listing');
            selectedPosts.forEach(post => {
                const postElement = createBlogPostElement(post);
                blogListingContainer.appendChild(postElement);
            });
        })
        .catch(error => {
            console.error('Error fetching blog data:', error);
        });
});
