const postsArray = [
  {
    src: "https://picsum.photos/seed/2/320/200",
    date: new Date("2023-10-02:00:00.000Z"),
    title: "How to design a usable landing page",
    brief:
      "This article provides valuable insights and tips on creating an engaging and effective landing page that keeps visitors hooked and encourages them to take desired actions.",
    link: "#",
    tags: ["Design", "Coding", "HTML"],
  },
  {
    src: "https://picsum.photos/seed/3/320/200",
    date: new Date("2023-10-05:00:00.000Z"),
    title: "The Art of Color Theory in Web Design",
    brief:
      "Learn how understanding color theory can significantly impact the visual appeal and user experience of your web designs. Discover tips for selecting and combining colors effectively.",
    link: "#",
    tags: ["Design", "Web Development", "Color Theory"],
  },
  {
    src: "https://picsum.photos/seed/4/320/200",
    date: new Date("2023-10-10:00:00.000Z"),
    title: "Optimizing Website Performance for Speed",
    brief:
      "Explore techniques and strategies to enhance your website's performance, ensuring faster loading times and a smoother user experience. Speed matters in today's digital landscape.",
    link: "#",
    tags: ["Web Development", "Performance Optimization"],
  },
  {
    src: "https://picsum.photos/seed/5/320/200",
    date: new Date("2023-10-15:00:00.000Z"),
    title: "Creating Engaging User Interfaces: Best Practices",
    brief:
      "Delve into the principles and best practices of designing captivating user interfaces that keep users engaged and enhance overall usability. Discover key design elements and strategies.",
    link: "#",
    tags: ["Design", "User Interface", "UI/UX"],
  },
  {
    src: "https://picsum.photos/seed/6/320/200",
    date: new Date("2023-10-20:00:00.000Z"),
    title: "Mastering Responsive Web Design",
    brief:
      "Uncover the essential techniques and tools needed to design websites that look great and function seamlessly across various devices and screen sizes. Responsive design is crucial in today's multi-device world.",
    link: "#",
    tags: ["Design", "Web Development", "Responsive Design"],
  },
];

const Post = function (src, date, title, brief, link, tags) {
  this.src = src;
  this.date = date;
  this.title = title;
  this.brief = brief;
  this.link = link;
  this.tags = tags;
};

const posts = [];
postsArray.forEach((post) => {
  post = new Post(
    post.src,
    post.date,
    post.title,
    post.brief,
    post.link,
    post.tags
  );
  posts.push(post);
});

console.log(posts);

const generatePosts = function () {
  const postsContainer = document.getElementById("posts");

  postsContainer.innerHTML = "";

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.className = "post";

    const imageElement = document.createElement("img");
    imageElement.src = post.src;
    postElement.appendChild(imageElement);

    const dateElement = document.createElement("p");
    dateElement.className = "post-date";
    dateElement.innerText = post.date.toDateString();
    postElement.appendChild(dateElement);

    const titleElement = document.createElement("h3");
    titleElement.className = "post-title";
    titleElement.innerText = post.title;
    postElement.appendChild(titleElement);

    const briefElement = document.createElement("p");
    briefElement.className = "post-brief";
    briefElement.innerText = post.brief;
    postElement.appendChild(briefElement);

    const linkElement = document.createElement("a");
    linkElement.href = post.link;
    linkElement.innerText = "Read More";
    postElement.appendChild(linkElement);

    const tagsElement = document.createElement("ul");
    tagsElement.className = "post-tags";
    post.tags.forEach((tag) => {
      const tagElement = document.createElement("li");
      tagElement.innerText = tag;
      tagsElement.appendChild(tagElement);
    });
    postElement.appendChild(tagsElement);

    postsContainer.appendChild(postElement);
  });
};

generatePosts();

document.addEventListener("keydown", function (event) {
  if (event.key === "?") {
    toggleHelpPopup();
  }
});

function toggleHelpPopup() {
  const helpPopup = document.getElementById("help-popup");
  if (helpPopup.classList.contains("show")) {
    helpPopup.classList.remove("show");
  } else {
    helpPopup.classList.add("show");
  }
}
