// scripts/main.js

document.addEventListener('DOMContentLoaded', () => {
    // --- MANEJO DEL MENÚ HAMBURGUESA ---
    const menuButton = document.getElementById('menu-button');
    const navLinks = document.getElementById('nav-links');

    if (menuButton && navLinks) {
        menuButton.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            menuButton.textContent = navLinks.classList.contains('open') ? '✖' : '☰';
        });
    }

    // --- ACTUALIZACIÓN DINÁMICA DEL FOOTER ---
    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const lastModifiedParagraph = document.getElementById('lastModified');
    if (lastModifiedParagraph) {
        // Obtener la fecha actual para la última modificación, ya que document.lastModified
        // puede no ser lo que esperamos en un contexto de desarrollo local o si el contenido es dinámico.
        // Para un sitio estático, document.lastModified es más preciso después de guardar el archivo.
        // Considera usar la fecha actual de generación de la página si es más apropiado.
        const lastModDate = new Date(document.lastModified);
        lastModifiedParagraph.textContent = `Last Modified: ${lastModDate.toLocaleDateString("en-US", {year: 'numeric', month: '2-digit', day: '2-digit'})} ${lastModDate.toLocaleTimeString("en-US", {hour: '2-digit', minute: '2-digit', second: '2-digit'})}`;
        // Si prefieres el formato simple de string:
        // lastModifiedParagraph.textContent = `Last Modified: ${document.lastModified}`;
    }

    // --- DATOS DE CURSOS (Array proporcionado por el usuario) ---
    const courses = [
        {
            subject: 'CSE',
            number: 110,
            title: 'Introduction to Programming',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
            technology: [
                'Python'
            ],
            completed: false // ACTUALIZA ESTO SI HAS COMPLETADO EL CURSO
        },
        {
            subject: 'WDD',
            number: 130,
            title: 'Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
            technology: [
                'HTML',
                'CSS'
            ],
            completed: false // ACTUALIZA ESTO
        },
        {
            subject: 'CSE',
            number: 111,
            title: 'Programming with Functions',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
            technology: [
                'Python'
            ],
            completed: false // ACTUALIZA ESTO
        },
        {
            subject: 'CSE',
            number: 210,
            title: 'Programming with Classes',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
            technology: [
                'C#'
            ],
            completed: false // ACTUALIZA ESTO
        },
        {
            subject: 'WDD',
            number: 131,
            title: 'Dynamic Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
            technology: [
                'HTML',
                'CSS',
                'JavaScript'
            ],
            completed: false // ACTUALIZA ESTO
        },
        {
            subject: 'WDD',
            number: 231,
            title: 'Frontend Web Development I',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
            technology: [
                'HTML',
                'CSS',
                'JavaScript'
            ],
            completed: false // ACTUALIZA ESTO (Este es WDD 231, ¡probablemente lo estás cursando o completando!)
        }
    ];

    // --- LÓGICA DE TARJETAS DE CURSOS ---
    const courseCardsContainer = document.getElementById('course-cards-container');
    const filterButtons = document.querySelectorAll('#course-filters button');
    const totalCreditsSpan = document.getElementById('total-credits');

    function displayCourses(filteredCourses) {
        if (!courseCardsContainer) return;
        courseCardsContainer.innerHTML = ''; // Limpiar tarjetas existentes

        if (filteredCourses.length === 0) {
            courseCardsContainer.innerHTML = '<p>No courses match the current filter.</p>';
        } else {
            filteredCourses.forEach(course => {
                const card = document.createElement('div');
                card.classList.add('course-card');
                if (course.completed) {
                    card.classList.add('completed');
                }
                // Construir el HTML de la tarjeta con los nuevos campos
                card.innerHTML = `
                    <h3>${course.title} (${course.subject} ${course.number})</h3>
                    <p><strong>Credits:</strong> ${course.credits}</p>
                    <p class="course-description"><strong>Description:</strong> ${course.description}</p>
                    <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
                    <p><strong>Status:</strong> ${course.completed ? 'Completed ✔' : 'Not Completed'}</p>
                `;
                courseCardsContainer.appendChild(card);
            });
        }

        // Calcular y mostrar créditos totales
        if (totalCreditsSpan) {
            const currentTotalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
            totalCreditsSpan.textContent = currentTotalCredits;
        }
    }

    function setActiveFilterButton(activeButton) {
        filterButtons.forEach(button => button.classList.remove('active-filter'));
        if (activeButton) { // Asegurarse que el botón existe
            activeButton.classList.add('active-filter');
        }
    }

    if (filterButtons.length > 0 && courseCardsContainer) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterType = button.getAttribute('data-filter');
                let filteredCourses = courses;

                if (filterType === 'wdd') {
                    filteredCourses = courses.filter(course => course.subject.toUpperCase() === 'WDD');
                } else if (filterType === 'cse') {
                    filteredCourses = courses.filter(course => course.subject.toUpperCase() === 'CSE');
                }
                // 'all' ya usa el array completo por defecto
                
                displayCourses(filteredCourses);
                setActiveFilterButton(button);
            });
        });

        // Mostrar todos los cursos inicialmente y activar el botón "All Courses"
        const initialActiveButton = document.querySelector('#course-filters button[data-filter="all"]');
        if (initialActiveButton) {
             setActiveFilterButton(initialActiveButton);
        }
        displayCourses(courses); // Mostrar todos los cursos al cargar

    } else if (courseCardsContainer) {
        // Si no hay botones de filtro (aunque deberían estar según el HTML), mostrar todos los cursos
        displayCourses(courses);
    }
});