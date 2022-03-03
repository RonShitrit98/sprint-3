import { storageService } from '../../../services/async-storage.service.js';
import { utilService } from '../../../services/util.service.js';

const NOTES_KEY = 'notes';
_creatNotes()

export const noteService = {
    query,
    deleteNote,
    updateNote,
    getEmptyNote,
    save,
    getEmptyTodo

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
                    type: 'note-img',
                    isPinned: false,
                    info: {
                        url: '../../../../img/some-img.jpg',
                        title: 'Some image',
                        txt: 'img txt'
                    },
                    style: 'none'
                },
                {
                    id: 'n103',
                    type: 'note-todos',
                    isPinned: false,
                    info: {
                        title: 'Get my stuff together!',
                        todos: [
                            { txt: 'Show the cmp', doneAt: null, id: utilService.makeId() },
                            { txt: 'Coding power', doneAt: null, id: utilService.makeId() },
                        ]
                    },
                    style: 'none'
                },
                {
                    id: 'n104',
                    type: 'note-video',
                    isPinned: false,
                    info: {
                        title: 'Some video',
                        url: '',
                        txt: 'video txt'
                    },
                    style: 'none'
                },
            ]

        utilService.saveToStorage(NOTES_KEY, notes);
        return notes;
    }
}


