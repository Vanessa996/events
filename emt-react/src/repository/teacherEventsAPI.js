
export const insertTeacher = (t) => {
    return fetch('http://localhost:8080/teacher/create?name='+t, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });
};

export const insertEvent = (e) => {
    return fetch('http://localhost:8080/events/add', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            eventName: e.name,
            eventDateFrom: e.dateFrom,
            eventDateTo: e.dateto,
            location: e.location,
            eventType: e.type
        })

    });
};

export const updateEvent = (e) => {

    return fetch("http://localhost:8080/events/update", {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            event_id: e.id,
            eventName: e.name,
            eventDateFrom: e.dateFrom,
            eventDateTo: e.dateto,
            location: e.location
        })
    });
};

export const addEventToTeacher = (t, e) => {
    return fetch('http://localhost:8080/teacher/'+t+'/events/add/'+e, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const deleteEvent = (e) => {
    return fetch("http://localhost:8080/events/delete/"+e, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const deleteTeacher = (t) => {
    return fetch("http://localhost:8080/teacher/delete/"+t, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const removeEventFromTeacher = (t, e) => {
    return fetch("http://localhost:8080/teacher/"+t+"/events/remove/"+e, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const listTeachers = () => {
    return fetch("http://localhost:8080/teacher", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const listEvents = () => {
    return fetch("http://localhost:8080/events", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const listEventsOfTeacher = (t) => {
    return fetch("http://localhost:8080/teacher/"+t+"/events", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

