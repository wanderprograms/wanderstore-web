const menuToggle = document.getElementById("menuToggle");
const menuList = document.getElementById("menuList");
const sections = document.querySelectorAll(".content-section");
const iframeViewer = document.getElementById("iframeViewer");
const iframeSection = document.getElementById("iframeSection");

window.onload = () => {
  showHomeOnly();
};

menuToggle.addEventListener("click", () => {
  menuList.classList.toggle("hidden");
});

function hideAllSections() {
  sections.forEach(section => section.classList.add("hidden"));
}

function showHomeOnly() {
  hideAllSections();
  document.getElementById("home").classList.remove("hidden");
}

function loadSection(id) {
  hideAllSections();
  document.getElementById(id).classList.remove("hidden");
  menuList.classList.add("hidden");
}

function loadURL(url) {
  hideAllSections();
  iframeViewer.src = url;
  iframeSection.classList.remove("hidden");
  menuList.classList.add("hidden");
}

function redirectTo(url) {
  window.location.href = url;
}
const slidesData = [
  {
    image: 'images/airtel.jpg',
    title: 'Explore the world',
    text: 'Use the MENU to explore your sections.'
  },
  {
    image: 'images/zex1.jpg',
    title: 'Discover Malawi',
    text: 'Offline access for everyone.'
  },
  {
    image: 'images/isaac.jpg',
    title: 'Learn and Play',
    text: 'Games and resources in Chichewa.'
  },
   {
    image: 'images/love1.png',
    title: 'Malawi Web',
    text: 'support yanu ndiyomwe ikufunika.'
  }
];

const container = document.getElementById('header-slideshow');

slidesData.forEach((slide, index) => {
  const slideDiv = document.createElement('div');
  slideDiv.className = 'slide-item';
  if (index === 0) slideDiv.classList.add('active');

  slideDiv.innerHTML = `
    <img src="${slide.image}" alt="Slide ${index + 1}">
    <div class="slide-caption">
      <h3>${slide.title}</h3>
      <p>${slide.text}</p>
    </div>
  `;
  container.appendChild(slideDiv);
});

let currentSlide = 0;
const allSlides = document.querySelectorAll('.slide-item');

setInterval(() => {
  allSlides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % allSlides.length;
  allSlides[currentSlide].classList.add('active');
}, 5000);

function showModal() {
  document.getElementById('donationBanner').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('donationBanner').style.display = 'none';
  document.body.style.overflow = 'auto';
}

function openDonate() {
  closeModal();
  loadURL('https://yourdonatepage.com'); // sinthani ndi URL ya donate page yanu
}

// Bwereza modal iliyonse 15 seconds
setInterval(showModal, 15000);

// Function ya iframe loader
function loadURL(url) {
  document.getElementById('iframeViewer').src = url;
  document.querySelectorAll('.content-section').forEach(section => {
    section.classList.add('hidden');
  });
  document.getElementById('iframeSection').classList.remove('hidden');
}