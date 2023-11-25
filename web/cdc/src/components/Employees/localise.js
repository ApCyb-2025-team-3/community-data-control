export function localiseRole(role) {

    switch(role) {
        case "Member":
            return "Участник"
        case "Data Engineer":
            return "Дата инженер"
        case "Team Lead":
            return "Team Lead"
        case "Product Owner":
            return "Product Owner"
        case "Supervisor":
            return "Руководитель"
        case "Developer":
            return "Разработчик"
        default:
            return "Гость"
    }
}

export function localiseGrade(grade) {

    switch (grade) {
        case "Junior":
        case "Middle":
        case "Senior":
        case "Team Lead":
            return grade
        default:
            return "Не указана"
    }
}