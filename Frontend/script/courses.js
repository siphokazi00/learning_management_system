async function fetchCourses() {
    try {
        const response = await fetch('http://localhost:1337/api/courses', {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displaySuccessState(data);
    } catch (error) {
        console.error('Error fetching courses:', error);
        displayErrorState(error);
    } finally {
        removeLoadingState();
    }
}

function displaySuccessState(data) {
    const successStateElement = document.createElement('div');
    successStateElement.className = 'success-state';
    successStateElement.innerHTML = `
        <h2>Success</h2>
        <p>Courses fetched successfully</p>
    `;
    document.body.appendChild(successStateElement);
    displayCourses(data);
}

function displayErrorState(error) {
    const errorStateElement = document.createElement('div');
    errorStateElement.className = 'error-state';
    errorStateElement.innerHTML = `
        <h2>Error</h2>
        <p>${error.message}</p>
    `;
    document.body.appendChild(errorStateElement);
}

function displayLoading() {
    const loadingElement = document.createElement('div');
    loadingElement.className = 'loading';
    loadingElement.innerHTML = `
        <h2>Loading...</h2>
    `;
    document.body.appendChild(loadingElement);
}

function removeLoadingState() {
    const loadingElement = document.querySelector('.loading');
    if (loadingElement) {
        loadingElement.remove();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayLoading();
    if (window.location.pathname.endsWith('course.html')) {
        fetchCourseDetails();
    } else {
        fetchCourses();
    }
});