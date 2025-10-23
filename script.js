// ===== CÓDIGO DEL CONTADOR =====
const partyDate = new Date(2025, 9, 31, 21, 0, 0).getTime();
const x = setInterval(function() {
    const now = new Date().getTime();
    const distance = partyDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (document.getElementById("days")) {
        document.getElementById("days").innerHTML = days.toString().padStart(2, '0');
        document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');
    }
    if (distance < 0) {
        clearInterval(x);
        if (document.getElementById("countdown")) {
            document.getElementById("countdown").innerHTML = "¡La fiesta ha comenzado!";
        }
    }
}, 1000);

// ===== CÓDIGO DE LA MÚSICA =====
const music = document.getElementById('bg-music');
const icon = document.getElementById('music-icon');
if (music && icon) {
    music.volume = 0.5;

    document.addEventListener('DOMContentLoaded', () => {
        const playPromise = music.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                icon.classList.add('playing');
            }).catch(() => {
                icon.classList.remove('playing');
            });
        }
    });

    icon.addEventListener('click', () => {
        if (music.paused) {
            music.play();
            icon.classList.add('playing');
        } else {
            music.pause();
            icon.classList.remove('playing');
        }
    });
}

// ===== CÓDIGO DEL FORMULARIO =====
const rsvpForm = document.getElementById('rsvp-form');
const submitButton = document.getElementById('submit-btn');
const formResponse = document.getElementById('form-response');

// Esta es la URL del backend 
const scriptURL = 'https://https://invitacion-backend-fwsa.onrender.com/api/confirmar';

if (rsvpForm) {
    rsvpForm.addEventListener('submit', e => {
        e.preventDefault();
        submitButton.disabled = true;
        submitButton.value = 'Enviando...';
        formResponse.innerHTML = '';
        
        const formData = new FormData(rsvpForm);
        const data = Object.fromEntries(formData);

        fetch(scriptURL, { 
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data) // Enviamos el objeto como JSON
        })
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error('Falló la respuesta del servidor.');
        })
        .then(data => {
            formResponse.innerHTML = '¡Gracias! Hemos recibido tu respuesta.';
            formResponse.style.color = '#ffac09';
            rsvpForm.reset();
        })
        .catch(error => {
            console.error('Error!', error.message);
            // Este mensaje aparecerá si el backend está apagado
            formResponse.innerHTML = 'Oops! No se pudo contactar al servidor. ¿Está encendido?';
            formResponse.style.color = '#ff4d4d';
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.value = 'Enviar respuesta';
        });
    });
}