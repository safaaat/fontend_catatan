const classValidasiForm = (attributeHTML, judulValidasi, message) => {
    if (judulValidasi === "name") {
        if (attributeHTML === "input") {
            if (message.name !== undefined) return "input-form_active"
            return "input-form"
        }
        if (attributeHTML === "paragraph") {
            if (message.name !== undefined) return "text-input_active text-red-400"
        }
    }
    if (judulValidasi === "email") {
        if (attributeHTML === "input") {
            if (message.email !== undefined) return "input-form_active"
            return "input-form"
        }
        if (attributeHTML === "paragraph") {
            if (message.email !== undefined) return "text-input_active text-red-400"
        }
    }
    if (judulValidasi === "password") {
        if (attributeHTML === "input") {
            if (message.password !== undefined) return "input-form_active"
            return "input-form"
        }
        if (attributeHTML === "paragraph") {
            if (message.password !== undefined) return "text-input_active text-red-400"
        }
    }
    if (judulValidasi === "confPassword") {
        if (attributeHTML === "input") {
            if (message.confPassword !== undefined) return "input-form_active"
            return "input-form"
        }
        if (attributeHTML === "paragraph") {
            if (message.confPassword !== undefined) return "text-input_active text-red-400"
        }
    }
}

export default classValidasiForm