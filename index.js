function FetchFunction() {
    const sapId = document.getElementById('sapId').value;
    
    fetch('data/data.json')
        .then(response => response.json())
        .then(data => {
            if (data[sapId]) {
                const today = new Date().toLocaleString('en-us', { weekday: 'long' });
                const timetable = data[sapId].timeTable[today];

                const scheduleContainer = document.querySelector('.schedule');
                scheduleContainer.innerHTML = `
                    <h1>Class Schedule</h1>
                    <div class="schedule-head">
                        <span>Time</span>
                        <span>Subject</span>
                        <span>Room</span>
                    </div>
                `;

                if (timetable) {
                    timetable.forEach(item => {
                        const scheduleItem = document.createElement('div');
                        scheduleItem.className = 'schedule-item';
                        scheduleItem.innerHTML = `
                            <span>${item.time}</span>
                            <span class="class">${item.class}</span>
                    s        <span>${item.location}</span>
                        `;
                        scheduleContainer.appendChild(scheduleItem);
                    });
                } else {
                    scheduleContainer.innerHTML += `<div class="no-classes">No classes scheduled for today.</div>`;
                }
            } else {
                alert('SAP ID not found');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}