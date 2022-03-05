import { storageService } from '../../../services/async-storage.service.js';
import { utilService } from '../../../services/util.service.js';

const NOTES_KEY = 'notes';
const PINNED_NOTES_KEY = 'pinnedNotes';
_creatNotes()

export const noteService = {
    query,
    deleteNote,
    updateNote,
    getEmptyNote,
    save,
    getEmptyTodo,
    duplicate,

}

function duplicate(note) {
    return storageService.post(NOTES_KEY, note);
}

function getEmptyTodo() {
    return {
        txt: null,
        doneAt: null,
        id: utilService.makeId()
    }
}

function getEmptyNote(type, style) {
    const note = {
        id: utilService.makeId(),
        type: 'note-' + type,
        isPinned: false,
        info: {
            title: null,
            txt: null,
        },
        style
    }

    if (type === 'img' || type === 'video') {
        note.info.url = null
        return note
    }
    else if (type === 'todos') {
        note.info.todos = []
        return note
    }
    return note
}

function save(newNote) {
    return storageService.post(NOTES_KEY, newNote);
}

function updateNote(note) {
    return storageService.put(NOTES_KEY, note)
}

function deleteNote(noteId) {
    return storageService.remove(NOTES_KEY, noteId);
}

function query() {
    return storageService.query(NOTES_KEY);
}

function _creatNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY);
    if (!notes || notes.length < 1) {
        notes =
            [
                {
                    id: 'n101',
                    type: 'note-txt',
                    isPinned: false,
                    info: {
                        title: 'text',
                        txt: 'Fullstack me baby!'
                    },
                    style: 'green'
                },
                {
                    id: 'n102',
                    type: 'note-txt',
                    isPinned: false,
                    info: {
                        title: 'text',
                        txt: 'Fullstack me baby!'
                    },
                    style: 'purple'
                },

                {
                    id: 'n103',
                    type: 'note-img',
                    isPinned: false,
                    info: {
                        url: './img/some-img.jpg',
                        title: 'Some image',
                        txt: 'img txt'
                    },
                    style: 'blue'
                },
                {
                    id: 'n104',
                    type: 'note-img',
                    isPinned: false,
                    info: {
                        url: 'https://upload.wikimedia.org/wikipedia/commons/9/99/SOME_LIKE_IT_HOT_TITLE.jpg',
                        title: 'Some image',
                        txt: 'img txt'
                    },
                    style: 'brown'
                },
                {
                    id: 'n105',
                    type: 'note-todos',
                    isPinned: false,
                    info: {
                        title: 'Get my stuff together!',
                        todos: [
                            { txt: 'Drink coffee with Yaron', doneAt: null, id: utilService.makeId() },
                            { txt: 'To buy more ice cream!', doneAt: null, id: utilService.makeId() },
                        ]
                    },
                    style: 'red'
                },
                {
                    id: 'n106',
                    type: 'note-todos',
                    isPinned: false,
                    info: {
                        title: 'Get my stuff together!',
                        todos: [
                            { txt: 'To build many applications', doneAt: null, id: utilService.makeId() },
                            { txt: 'To sleep', doneAt: null, id: utilService.makeId() },
                        ]
                    },
                    style: 'turquoise'
                },
                {
                    id: 'n107',
                    type: 'note-video',
                    isPinned: false,
                    info: {
                        title: 'Some video',
                        url: 'https://www.youtube.com/embed?v=ShPPkZEeLPo',
                        txt: 'video txt'
                    },
                    style: 'dark-blue'
                },
            ]
        utilService.saveToStorage(NOTES_KEY, notes);
        return notes;
    }
}


