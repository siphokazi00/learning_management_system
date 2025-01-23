document.addEventListener('DOMContentLoaded', async () => {
    const gradeTableBody = document.querySelector('#gradeTable tbody');
    try {
      const response = await fetch('/api/grades', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const grades = await response.json();
      gradeTableBody.innerHTML = grades
        .map(grade => `
          <tr>
            <td>${grade.student_name}</td>
            <td>${grade.subject}</td>
            <td>${grade.grade}</td>
          </tr>
        `)
        .join('');
    } catch (err) {
      console.error('Error fetching grades:', err);
    }
  });  