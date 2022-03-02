import { storageService } from '../../../services/async-storage.service.js';
import { utilService } from '../../../services/util.service.js';

const NOTES_KEY = 'notes';
_creatNotes()

export const noteService = {
    query,
    deleteNote,

}

function deleteNote(noteId){
    return storageService.remove(NOTES_KEY, noteId); 
}

function query() {
    return storageService.query(NOTES_KEY);
}

function _creatNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY);
    if (!notes || notes.cmps.length < 1) {
        notes = {
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
                        title: 'Some video',
                        url: '/js/apps/keep/img/some-img.jpg',
                    }
                },

            ]
        };
        utilService.saveToStorage(NOTES_KEY, notes);
    }
    return notes;
}


