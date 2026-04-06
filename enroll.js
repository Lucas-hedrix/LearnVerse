document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // NAVBAR SCROLL + HAMBURGER (shared behaviour)
    // ============================================
    const navbar    = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

    function closeMobileMenu() {
        hamburger?.classList.remove('active');
        mobileMenu?.classList.remove('open');
    }

    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) closeMobileMenu();
    });


    // ============================================
    // PROGRAMME CHECKBOX — require at least one
    // ============================================
    const checkboxCards = document.querySelectorAll('.checkbox-card input[type="checkbox"]');
    const enrollForm    = document.getElementById('enrollForm');

    function atLeastOneProgram() {
        return [...checkboxCards].some(cb => cb.checked);
    }


    // ============================================
    // ENROLMENT FORM SUBMISSION (Web3Forms)
    // ============================================
    const enrollBtn     = document.getElementById('enrollSubmitBtn');
    const enrollSuccess = document.getElementById('enrollSuccess');
    const enrollError   = document.getElementById('enrollError');

    enrollForm?.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Custom validation: at least one programme
        if (!atLeastOneProgram()) {
            // Highlight the checkbox grid
            document.querySelector('.checkbox-grid').style.outline = '2px solid #e05050';
            document.querySelector('.checkbox-grid').style.borderRadius = '8px';
            document.querySelector('.checkbox-grid').scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => {
                document.querySelector('.checkbox-grid').style.outline = '';
            }, 3000);
            return;
        }

        document.querySelector('.checkbox-grid').style.outline = '';

        // Collect checked programmes into a single string for the email
        const programs = [...checkboxCards]
            .filter(cb => cb.checked)
            .map(cb => cb.value)
            .join(', ');

        // Add it as a hidden field so Web3Forms includes it
        let progField = document.getElementById('_programs_field');
        if (!progField) {
            progField = document.createElement('input');
            progField.type = 'hidden';
            progField.id = '_programs_field';
            progField.name = 'programs_selected';
            enrollForm.appendChild(progField);
        }
        progField.value = programs;

        // Button loading state
        enrollBtn.querySelector('.btn-label').style.display = 'none';
        enrollBtn.querySelector('.btn-spinner').style.display = 'inline-flex';
        enrollBtn.disabled = true;
        enrollSuccess.style.display = 'none';
        enrollError.style.display = 'none';

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: new FormData(enrollForm)
            });
            const data = await res.json();

            if (data.success) {
                enrollSuccess.style.display = 'flex';
                enrollSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                enrollForm.reset();
                // Deselect all checkbox cards
                checkboxCards.forEach(cb => cb.checked = false);
            } else {
                enrollError.style.display = 'flex';
            }
        } catch {
            enrollError.style.display = 'flex';
        } finally {
            enrollBtn.querySelector('.btn-label').style.display = 'inline-flex';
            enrollBtn.querySelector('.btn-spinner').style.display = 'none';
            enrollBtn.disabled = false;
        }
    });

});
