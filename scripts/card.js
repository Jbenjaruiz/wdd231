// scripts/card.js

document.addEventListener('DOMContentLoaded', () => {
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
            completed: true // Ejemplo: Janio completó este
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
            completed: true // Ejemplo: Janio completó este
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
            completed: true // Ejemplo: Janio completó este
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
            completed: false // Janio aún no ha completado este
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
            completed: false // Janio aún no ha completado este
        },
        {
            subject: 'WDD',
            number: 231,
            title: 'Frontend Web Development I', // Este es el curso actual WDD 231
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
            technology: [
                'HTML',
                'CSS',
                'JavaScript'
            ],
            completed: false // Asumiendo que está en progreso
        }
    ];

    const courseCardsContainer = document.getElementById('course-cards-container');
    const filterButtons = document.querySelectorAll('#course-filters button');
    const totalCreditsSpan = document.getElementById('total-credits'); // Aunque el contenedor esté oculto

    function displayCourses(filteredCourses) {
        if (!courseCardsContainer) return;
        courseCardsContainer.innerHTML = ''; // Limpiar tarjetas existentes

        if (filteredCourses.length === 0) {
            courseCardsContainer.innerHTML = '<p class="no-courses-message">No courses match the current filter.</p>';
        } else {
            filteredCourses.forEach(course => {
                const card = document.createElement('div');
                card.classList.add('course-card');
                if (course.completed) {
                    card.classList.add('completed');
                }
                // Mostrar solo el código del curso según el nuevo diseño
                card.textContent = `${course.subject} ${course.number}`;
                courseCardsContainer.appendChild(card);
            });
        }

        // Calcular créditos totales (aunque el span esté en un div oculto)
        if (totalCreditsSpan) {
            const currentTotalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
            totalCreditsSpan.textContent = currentTotalCredits;
        }
    }

    function setActiveFilterButton(activeButton) {
        filterButtons.forEach(button => button.classList.remove('active-filter'));
        if (activeButton) {
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
                // 'all' usa el array completo por defecto
                
                displayCourses(filteredCourses);
                setActiveFilterButton(button);
            });
        });

        // Mostrar todos los cursos inicialmente y activar el botón "All"
        const initialActiveButton = document.querySelector('#course-filters button[data-filter="all"]');
        if (initialActiveButton) {
             setActiveFilterButton(initialActiveButton);
        }
        displayCourses(courses); // Mostrar todos los cursos al cargar

    } else if (courseCardsContainer) {
        // Si no hay botones de filtro (deberían estar según el HTML), mostrar todos los cursos
        displayCourses(courses);
    }
});
