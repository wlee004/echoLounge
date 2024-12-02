const generateGuestUsername = (length = 10) => { 
    const guest_username = "GUEST-" + Math.random().toString(36).toUpperCase().slice(2, 2 + length)
    return guest_username
}

module.exports = { generateGuestUsername } 