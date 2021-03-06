import { storageService } from '../../../services/async-storage.service.js';

export const mailService = {
    query,
    get,
    updateEmail,
    newEmail,
    remove,
    filter,
    getUser
}

const MAIL_KEY = 'emailsDB'
const USER_KEY = 'usersDB'
_createEmails()
_createUser()

function query() {
    return storageService.query(MAIL_KEY);
}
function getUser() {
    return storageService.query(USER_KEY);
}

function get(id) {
    return storageService.get(MAIL_KEY, id);
}

function updateEmail(email) {
    return storageService.put(MAIL_KEY, email)
}

function remove(id) {
    return storageService.remove(MAIL_KEY, id)
}

// function newEmail(email) {
//     var id = email.id
//     if (!id) id = _makeId()
//     return storageService.query(USER_KEY)
//         .then(user => {
//             // console.log(user[0])
//             const newEmail = {
//                 id,
//                 subject: email.subject,
//                 body: email.body,
//                 isRead: false,
//                 isStarred: false,
//                 isDraft: email.isDraft,
//                 sentAt: Date.now(),
//                 to: email.to,
//                 from: {
//                     name: user[0].name,
//                     address: user[0].email
//                 }
//             }
//             )
//             else return storageService.post(MAIL_KEY, newEmail)
//         })
// }

function newEmail(email) {
    var id = email.id
    if (!id) id = _makeId()
    return storageService.query(USER_KEY)
        .then(user => {
            console.log('user test',user);
            const newEmail = {
                id: id,
                subject: email.subject,
                body: email.body,
                isRead: false,
                isStarred: false,
                isDraft: email.isDraft,
                sentAt: Date.now(),
                to: email.to,
                from: {
                    name: user[0].name,
                    address: user[0].email
                }
            }
            _isMailExist(email)
            .then(isExist => {
                console.log(isExist)
                if(isExist) return storageService.put(MAIL_KEY, newEmail)
            })
            return storageService.post(MAIL_KEY, newEmail)
        })
}

function filter(emails, userEmail, filterBy) {
    var filteredEmails = emails
    if (filterBy.mailBox === 'sent') filteredEmails = emails.filter(email => email.from.address === userEmail && !email.isDraft)
    else if (filterBy.mailBox === 'star') filteredEmails = emails.filter(email => email.isStarred)
    else if (filterBy.mailBox === 'drafts') filteredEmails = emails.filter(email => email.isDraft)
    else filteredEmails = emails.filter(email => email.to === userEmail)
    var displayEmails = filteredEmails

    if (filterBy.read === 'unread') displayEmails = filteredEmails.filter(email => !email.isRead)
    if (filterBy.read === 'read') displayEmails = filteredEmails.filter(email => email.isRead)
    if (filterBy.searchBy) return displayEmails.filter(email => email.body.match(filterBy.searchBy) ||
        email.subject.match(filterBy.searchBy) || email.from.name.match(filterBy.searchBy))

    if (filterBy.sortBy === 'date') return displayEmails.sort(function (a, b) { return (a.sentAt > b.sentAt ? -1 : (a.sentAt === b.sentAt ? 0 : 1)) })
    if (filterBy.sortBy === 'subject') return displayEmails.sort((a, b) => a.subject.localeCompare(b.subject))

    return displayEmails
}

function _createEmails() {
    storageService.query(MAIL_KEY)
        .then(emails => {
            if (!emails || !emails.length) {
                emails = [{
                    id: _makeId(),
                    subject: 'Us',
                    body: `They made a statue of us
                And then put it on a mountain top
                Now tourists come and stare at us
                Blow bubbles with their gum
                Take photographs of fun, have fun
                They'll name a city after us
                And later say it's all our fault
                Then they'll give us a talking to
                Then they'll give us a talking to
                'Cause they've got years of experience
                We're living in a den of thieves
                Rummaging for answers in the pages
                We're living in a den of thieves
                And it's contagious
                And it's contagious
                And it's contagious
                And it's contagious
                We wear our scarves just like a noose
                But not 'cause we want eternal sleep
                And though our parts are slightly used
                New ones are slave labor you can keep
                We're living in a den of thieves
                Rummaging for answers in the pages
                We're living in a den of thieves
                And it's contagious
                And it's contagious
                And it's contagious
                And it's contagious
                They made a statue of us
                They made a statue of us
                The tourists come and stare at us
                The sculptor's mama sends regards
                They made a statue of us
                They made a statue of us
                Our noses have begun to rust
                We're living in a den of thieves
                Rummaging for answers in the pages
                We're living in a den of thieves
                And it's contagious
                And it's contagious
                And it's contagious
                And it's contagious
                And it's contagious
                And it's contagious
                And it's contagious
                And it's contagious`,
                    isRead: false,
                    isStarred: false,
                    sentAt: 1632169060000,
                    to: 'momo@momo.com',
                    from: {
                        name: 'Regina Spektor',
                        address: 'regina@spektor.com'
                    }
                }, {
                    id: _makeId(),
                    subject: 'Suspicious Minds',
                    body: `We're caught in a trap
                I can't walk out
                Because I love you too much, baby
                Why can't you see
                What you're doing to me
                When you don't believe a word I say?
                We can't go on together
                With suspicious minds (suspicious minds)
                And we can't build our dreams
                On suspicious minds
                So if an old friend I know
                Stops by to say hello
                Would I still see suspicion in your eyes?
                Here we go again
                Asking where I've been
                You can't see the tears are real, I'm crying
                (Yes I'm crying)
                We can't go on together
                With suspicious minds (suspicious minds)
                And we can't build our dreams
                On suspicious minds
                Oh, let our love survive
                I'll dry the tears from your eyes
                Let's don't let a good thing die
                When honey, you know I've never lied to you
                Mmm, yeah, yeah
                We're caught in a trap
                I can't walk out
                Because I love you too much, baby
                Why can't you see
                What you're doing to me
                When you don't believe a word I say?
                Well, don't you know I'm caught in a trap?
                I can't walk out
                Because I love you too much, baby
                Well, don't you know I'm caught in a trap?
                I can't walk out
                Because I love you too much, baby
                Well, don't you know I'm caught in a trap?
                I can't walk out
                Because I love you too much, baby
                Well, don't you know I'm caught in a trap?
                I can't walk out
                Because I love you too much, baby
                Well, don't you know I'm caught in a trap?
                I can't walk out
                Because I love you too much, baby
                Well, don't you know I'm caught in a trap?
                I can't walk out
                Because I love you too much, baby
                Well, don't you know I'm caught in a trap?`,
                    isRead: false,
                    isStarred: false,
                    sentAt: 1645388260000,
                    to: 'momo@momo.com',
                    from: {
                        name: 'Elvis Presley',
                        address: 'elvis@presley.com'
                    }
                },
                {
                    id: _makeId(),
                    subject: 'The Whole Of The Moon',
                    body: `I pictured a rainbow
                You held it in your hands
                I had flashes
                But you saw the plan
                I wandered out in the world for years
                While you just stayed in your room
                I saw the crescent
                You saw the whole of the moon
                The whole of the moon
                
                You were there at the turnstiles
                With the wind at your heels
                You stretched for the stars
                And you know how it feels
                To reach too high
                Too far
                Too soon
                You saw the whole of the moon
                
                I was grounded
                While you filled the skies
                I was dumbfounded by truths
                You cut through lies
                I saw the rain-dirty valley
                You saw Brigadoon
                I saw the crescent
                You saw the whole of the moon
                
                I spoke about wings
                You just flew
                I wondered, I guessed and I tried
                You just knew
                I sighed
                But you swooned
                I saw the crescent
                You saw the whole of the moon
                The whole of the moon
                
                With a torch in your pocket
                And the wind at your heels
                You climbed on the ladder
                And you know how it feels
                To get too high
                Too far
                Too soon
                You saw the whole of the moon
                The whole of the moon
                
                Unicorns and cannonballs
                Palaces and piers
                Trumpets, towers, and tenements
                Wide oceans full of tears
                Flags, rags, ferry boats
                Scimitars and scarves
                Every precious dream and vision
                Underneath the stars
                
                Yes, you climbed on the ladder
                With the wind in your sails
                You came like a comet
                Blazing your trail
                Too high
                Too far
                Too soon
                You saw the whole of the moon`,
                    isRead: false,
                    isStarred: false,
                    sentAt: 1642709860000,
                    to: 'momo@momo.com',
                    from: {
                        name: 'The Waterboys',
                        address: 'TheWater@Boys.com'
                    }
                },
                {
                    id: _makeId(),
                    subject: 'Welcome to the Black Parade',
                    body: `When I was a young boy
                My father took me into the city
                To see a marching band
                He said, "Son, when you grow up
                Would you be the savior of the broken
                The beaten and the damned?"
                He said, "Will you defeat them?
                Your demons, and all the non-believers
                The plans that they have made?"
                "Because one day, I'll leave you a phantom
                To lead you in the summer
                To join the black parade"
                When I was a young boy
                My father took me into the city
                To see a marching band
                He said, "Son, when you grow up
                Would you be the savior of the broken
                The beaten and the damned?"
                Sometimes I get the feelin'
                She's watchin' over me
                And other times I feel like I should go
                And through it all, the rise and fall
                The bodies in the streets
                And when you're gone, we want you all to know
                We'll carry on, we'll carry on
                And though you're dead and gone, believe me
                Your memory will carry on
                We'll carry on
                And in my heart, I can't contain it
                The anthem won't explain it
                A world that sends you reelin'
                From decimated dreams
                Your misery and hate will kill us all
                So paint it black and take it back
                Let's shout it loud and clear
                Defiant to the end, we hear the call
                To carry on, we'll carry on
                And though you're dead and gone, believe me
                Your memory will carry on
                We'll carry on
                And though you're broken and defeated
                Your weary widow marches
                On and on, we carry through the fears
                Oh, ah, ha
                Disappointed faces of your peers
                Oh, ah, ha
                Take a look at me, 'cause I could not care at all
                Do or die, you'll never make me
                Because the world will never take my heart
                Go and try, you'll never break me
                We want it all, we wanna play this part
                I won't explain or say I'm sorry
                I'm unashamed, I'm gonna show my scars
                Give a cheer for all the broken
                Listen here, because it's who we are
                Just a man, I'm not a hero
                Just a boy, who had to sing this song
                Just a man, I'm not a hero
                I don't care
                We'll carry on, we'll carry on
                And though you're dead and gone, believe me
                Your memory will carry on
                You'll carry on
                And though you're broken and defeated
                Your weary widow marches, oh
                Do or die, you'll never make me
                Because the world will never take my heart
                Go and try, you'll never break me
                We want it all, we wanna play this part (we'll carry on)
                Do or die, you'll never make me (we'll carry on)
                Because the world will never take my heart (we'll carry on)
                Go and try, you'll never break me (we'll carry on)
                We want it all, we wanna play this part (we'll carry on!)`,
                    isRead: false,
                    isStarred: false,
                    sentAt: 1634761060000,
                    to: 'momo@momo.com',
                    from: {
                        name: 'My Chemical Romance',
                        address: 'mychemical@romance.com'
                    }
                },
                {
                    id: _makeId(),
                    subject: 'To Love Somebody',
                    body: `There's a light
                A certain kind of light
                That never shone on me
                I want my life to be lived with you
                Lived with you
                There's a way everybody say
                To do each and every little thing
                But what does it bring
                If I ain't got you, ain't got?
                You don't know what it's like, baby
                You don't know what it's like
                To love somebody
                To love somebody
                The way I love you
                In my brain
                I see your face again
                I know my frame of mind
                You ain't got to be so blind
                And I'm blind, so, so, so blind
                I'm a man
                Can't you see what I am?
                I live and I breathe for you
                But what good does it do
                If I ain't got you, ain't got?
                You don't know what it's like, baby
                You don't know what it's like
                To love somebody
                To love somebody
                The way I love you
                You don't know what it's like, baby
                You don't know what it's like
                To love somebody
                To love somebody
                The way I love you
                You don't know what it's like, baby
                You don't know what it's like
                To love somebody`,
                    isRead: false,
                    isStarred: false,
                    sentAt: 1551133930594,
                    to: 'momo@momo.com',
                    from: {
                        name: 'Bee Gees',
                        address: 'bee@gees.com'
                    }
                }]
                storageService.postMany(MAIL_KEY, emails);
            }
        })

}
function _createUser() {
    storageService.query(USER_KEY)
        .then(user => {
            if (!user || !user.length) {
                user = {
                    email: 'momo@momo.com',
                    name: 'momo'
                }
                storageService.post(USER_KEY, user);
            }
        })
}


function _makeId(length = 8) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function _isMailExist(email) {
   return storageService.query(MAIL_KEY)
        .then(emails => {
            return emails.some(mail => mail.id === email.id)
        })
}


