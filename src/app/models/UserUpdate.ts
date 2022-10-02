export interface ClientUpdate{

    name: string,
    surname: string,
    gender: ""
}

export interface EstablishmentUpdate{

    name: string,
    image: string,
    timeToOpen: string,
    timeToClose: string
}

export interface ContactUpdate{

    email: string,
    phone: string
}

export interface PasswordUpdate{

    currentPassword: string,
    newPassword: string
}