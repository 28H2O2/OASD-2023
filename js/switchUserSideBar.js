document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".sidebar a");

  for (const link of links) {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const page = event.target.getAttribute("data-page");

      document.querySelector(".page.active").classList.remove("active");
      document.getElementById(page).classList.add("active");
    });
  }
});
