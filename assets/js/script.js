// =======================
// Mobile Menu Toggle com animação suave
// =======================
const menuBtn = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    if (mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.remove('hidden');
      setTimeout(() => mobileMenu.classList.remove('opacity-0', 'scale-y-0'), 10);
      menuBtn.innerHTML = '<i class="fas fa-times text-2xl"></i>';
    } else {
      mobileMenu.classList.add('opacity-0', 'scale-y-0');
      setTimeout(() => mobileMenu.classList.add('hidden'), 300);
      menuBtn.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
    }
  });

  // Fecha o menu ao clicar em um link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('opacity-0', 'scale-y-0');
      setTimeout(() => mobileMenu.classList.add('hidden'), 300);
      menuBtn.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
    });
  });
}

// =======================
// Scroll suave para links internos
// =======================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// =======================
// Schedule Day Tabs
// =======================
const scheduleDays = document.querySelectorAll('.schedule-day');
const scheduleContents = document.querySelectorAll('.schedule-day-content');

scheduleDays.forEach(day => {
  day.addEventListener('click', function () {
    scheduleDays.forEach(d => d.classList.remove('active'));
    this.classList.add('active');
    scheduleContents.forEach(content => content.classList.add('hidden'));
    const dayId = this.getAttribute('data-day');
    document.getElementById(dayId).classList.remove('hidden');
  });
});

// =======================
// Countdown Timer
// =======================
function updateCountdown() {
  const eventDate = new Date('2025-10-21T09:00:00').getTime();
  const now = new Date().getTime();
  const timeLeft = eventDate - now;

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  if (timeLeft <= 0) {
    daysEl.textContent = hoursEl.textContent = minutesEl.textContent = secondsEl.textContent = '00';
    return;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  daysEl.textContent = days.toString().padStart(2, '0');
  hoursEl.textContent = hours.toString().padStart(2, '0');
  minutesEl.textContent = minutes.toString().padStart(2, '0');
  secondsEl.textContent = seconds.toString().padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// =======================
// Fade-in animation on scroll
// =======================
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = () => {
  fadeElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('visible');
    }
  });
};

window.addEventListener('load', fadeInOnScroll);
window.addEventListener('scroll', fadeInOnScroll);

// =======================
// Header scroll effect
// =======================
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.classList.add('shadow-lg');
  } else {
    header.classList.remove('shadow-lg');
  }
});

// =======================
// Carregar e renderizar a programação
// =======================
async function loadSchedule() {
  try {
    const response = await fetch('assets/data/schedule.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const schedule = await response.json();

    const contentDiv = document.getElementById('programacao-content');
    if (!contentDiv) throw new Error('Elemento programacao-content não encontrado');

    if (!schedule.length) {
      contentDiv.innerHTML = '<p class="text-gray-600 text-center">Programação em breve</p>';
      return;
    }

    const tabs = document.querySelectorAll('.schedule-day');
    const tabPanels = new Map();

    schedule.forEach(day => {
      const panel = document.createElement('div');
      panel.id = day.id;
      panel.className = 'schedule-day-content fade-in';
      panel.setAttribute('role', 'tabpanel');
      panel.style.display = day.id === 'day1' ? 'block' : 'none';

      day.events.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'bg-white rounded-lg p-6 mb-4 shadow-md hover:shadow-lg transition-shadow border-l-4 border-transparent';

        // Paleta oficial aplicada
        let typeClass = '';
        switch (event.type.toLowerCase()) {
          case 'palestra':
            typeClass = 'bg-[#00AFEF] text-white'; // Azul
            break;
          case 'workshop':
            typeClass = 'bg-[#00FF7F] text-gray-900'; // Verde neon
            break;
          case 'hackathon':
            typeClass = 'bg-[#FFA800] text-white'; // Laranja
            break;
          case 'cerimônia':
            typeClass = 'bg-[#A900FF] text-white'; // Roxo
            break;
          default:
            typeClass = 'bg-gray-300 text-gray-800';
        }

        eventDiv.innerHTML = `
          <div class="flex flex-col md:flex-row md:items-center justify-between mb-3">
            <div class="flex items-center">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeClass} mr-3">
                ${event.type}
              </span>
              <h3 class="text-xl font-semibold text-gray-800">${event.title}</h3>
            </div>
            <span class="text-[#00AFEF] font-medium mt-2 md:mt-0">${event.time}</span>
          </div>
          <p class="text-gray-600 mb-2"><i class="fas fa-map-marker-alt mr-2 text-gray-500"></i> ${event.location}</p>
          <p class="text-gray-700 mb-2">Palestrante: ${event.speaker || 'Não informado'}</p>
        `;
        panel.appendChild(eventDiv);
      });

      tabPanels.set(day.id, panel);
      contentDiv.appendChild(panel);
    });

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
        tab.setAttribute('aria-selected', 'true');

        tabPanels.forEach((panel, id) => {
          panel.style.display = id === tab.dataset.day ? 'block' : 'none';
        });
      });
    });
  } catch (error) {
    console.error('Erro ao carregar a programação:', error.message);
    document.getElementById('programacao-content').innerHTML =
      '<p class="text-red-600 text-center">Erro ao carregar a programação. Tente novamente mais tarde.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadSchedule);