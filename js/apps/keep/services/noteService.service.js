


export const noteService = {
    getById
}

function getById() {
    return Promise.resolve(notes);
}

var notes = {
    title: 'Notes',
    cmps: [
        {
            id: 'n101',
            type: 'note-txt',
            isPinned: false,
            info: {
                txt: 'Fullstack me baby!'
            }
        },

        {
            id: 'n102',
            type: 'note-img',
            isPinned: false,
            info: {
                url: '/js/apps/keep/img/some-img.jpg',
                title: 'Some image'
            }
        },
        {
            id: 'n103',
            type: 'note-todos',
            isPinned: false,
            info: {
                label: 'Get my stuff together!',
                todos: [
                    { txt: 'Show the cmp', doneAt: null },
                    { txt: 'Coding power', doneAt: null },
                ]
            }
        },
        {
            id: 'n104',
            type: 'note-video',
            isPinned: false,
            info: {
                url: '/js/apps/keep/img/some-img.jpg',
                title: 'Some video'
            }
        },

    ]
}


